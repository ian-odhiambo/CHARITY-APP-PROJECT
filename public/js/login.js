const myForm = document.querySelector("#loginForm");
const password = document.querySelector("#password");
const message = document.querySelector("#message");
const emailInput = document.querySelector("#email");

if (myForm) {
  // Disable native HTML5 constraint validation so our custom submit
  // handler always runs (the browser can block the submit event when
  // an <input type="email"> is invalid).
  myForm.noValidate = true;
  myForm.addEventListener("submit", onSubmit);
}

async function onSubmit(event) {
  event.preventDefault();

  // Defensive checks

  if (!message) return; // nothing to show the message in

  // empty input field form validation
  if (
    !emailInput ||
    !password ||
    emailInput.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    message.textContent = "Please enter both fields";
    message.classList.add("text-red-800");
    setTimeout(() => {
      message.textContent = "";
      // remove the same class we added earlier
      message.classList.remove("text-red-800");
    }, 3000);
    return;
  }

  //if email does not include @ and (.) symbol or its validation , then return the message below its input field styled in red "Please enter a valid email address".And the message being input in the setTimeOut on 3000 milliseconds which is equal to 3 seconds on the submit event
  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    message.textContent = "Please enter a valid Email address";
    message.classList.add("text-red-800");
    setTimeout(() => {
      message.textContent = "";
      message.classList.remove("text-red-800");
    }, 3000);
    return;
  }


//this is the login function
//grabbing the submit button for triggering 
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;//the element becomes active when clicked 
  }

  const apiUrl = "http://192.168.1.90:3005/api/v1/auth/login";
  const payload = {
    email: emailInput.value.trim(),
    password: password.value.trim()
  };

  try {
    message.textContent = "Signing in...";
    message.classList.remove("text-red-800");
    message.classList.add("text-blue-800");

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      // Save whatever the API returns (token/user) for later pages if needed
      try {
        localStorage.setItem("auth", JSON.stringify(data));
      } catch (_) {}

      message.textContent = "Login successful!";
      message.classList.remove("text-blue-800", "text-red-800");
      message.classList.add("text-green-800");

      // Small delay so the user can see the success message
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    } else {
      const apiMsg =
        (data && (data.message || data.error || data.msg)) ||
        "Login failed. Please check your details.";
      message.textContent = apiMsg;
      message.classList.remove("text-blue-800", "text-green-800");
      message.classList.add("text-red-800");

      setTimeout(() => {
        message.textContent = "";
        message.classList.remove("text-red-800");
      }, 3000);
    }
  } catch (err) {
    message.textContent = "Network error. Connect to GMC and try again.";
    message.classList.remove("text-blue-800", "text-green-800");
    message.classList.add("text-red-800");

    setTimeout(() => {
      message.textContent = "";
      message.classList.remove("text-red-800");
    }, 3000);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
}