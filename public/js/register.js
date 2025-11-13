const myForm = document.querySelector("#register-form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const userName = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneNumber = document.querySelector("#phone");
const birthDate = document.querySelector("#dob");
const sex = document.querySelector("#gender");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const message = document.querySelector("#message"); // Add this line to get the message element

myForm.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  // Defensive checks

  if (!message) return; // nothing to show the message in

  // empty input field form validation
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    userName.value === "" ||
    phoneNumber.value === "" ||
    birthDate.value === "" ||
    sex.value === "0" ||
    !emailInput ||
    !password ||
    !confirmPassword ||
    emailInput.value.trim() === "" ||
    password.value.trim() === "" ||
    confirmPassword.value.trim() === ""
  ) {
    message.textContent = "Please enter the empty field";
    message.classList.add("text-red-800");
    setTimeout(() => {
      message.textContent = "";
      // the number of seconds the message will show up in milliseconds 
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
};


//The function responsible for submitting the data to our server
//this is now after inputing our credentials which are only but unique to us 
try{
message.textContent = "Evaluating your credentials...please wait";
message.classList.remove("text-red-600");
messsage.classList.add("text-blue-900");

//preparing my data for the api to receive and take it to the endpoint
//assignment of the keys to a variable to match the format of the way our data is stored in the server 
 const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      username: userName.value,
      email: emailInput.value,
      phone: phoneNumber.value,
      dateOfBirth: birthDate.value,
      gender: sex.value,
      password: password.value
};
const response = await fetch('http://local/3005/api/v1/auth/register'{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    //check if response is there 

     if (!response.ok) {
      throw new Error(`Registration failed with status: ${response.status}`);
    }

    //
    const result = await response.json();

     // Success handling
    message.textContent = "Registration successful!";
    message.classList.remove("text-red-800", "text-blue-800");
    message.classList.add("text-green-800");
    
    // Clear form
    myForm.reset();

  } catch (error) {
    // Handle any errors from the API call
    message.textContent = `Registration failed: ${error.message}`;
    message.classList.remove("text-blue-800", "text-green-800");
    message.classList.add("text-red-800");
  }


