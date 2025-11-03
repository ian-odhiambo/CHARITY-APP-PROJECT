// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     let username = document.getElementById("username").value;
//     let password = document.getElementById("password").value;
//     if (username == "" || password == "") {
//       alert("Username and password are required");
//       return false;
//     }
//     if(username === 'admin' && password === '1234'){
//       alert('you have successfully logged in');
//       return true
//     } else{

//     }
//   });

// const myForm = document.querySelector("#loginForm");
// const password = document.querySelector("#password");
// const message = document.querySelector("#message");
// const emailInput = document.querySelector("#email");

// myForm.addEventListener("submit", onSubmit);
// function onSubmit(event) {
//   event.preventDefault();
//   if (emailInput.value === "" || password.value === "") {
//     message.textContent = "Please enter both fields";
//     message.className = "text-red-600";

//     setTimeout(() => message.remove(), 2000);
//     return
//   }
//   if(!emailInput.value.includes("@") && (!emailInput.value.includes("."))){
//     message.textContent = "Please enter a valid email address"
//     message.className = 'text-red-500'
//     return
//   }
// }




const myForm = document.querySelector("#loginForm");
const password = document.querySelector("#password");
const message = document.querySelector("#message");
const emailInput = document.querySelector("#email");

if (myForm) {
  myForm.addEventListener("submit", onSubmit);
}

function onSubmit(event) {
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
      message.classList.remove("text-red-600");
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

  // If you reach here, inputs look valid — continue with submit logic
  // e.g., send a request, redirect, etc.
}
