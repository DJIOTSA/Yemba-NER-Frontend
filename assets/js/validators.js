// update login textContent
updateLoginButton();

// **************************  form  validation for login *****###########################
const form = document.querySelector("form#login");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(() => { //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = () => { checkEmail(); } //calling checkEmail function on email input keyup
  pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

  function checkEmail() { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    } else { //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass() { //checkPass function
    if (pInput.value.length < 4) { //if pass is empty then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
    showAlert("Authenticating...", "login", false, 1500);
    // perform the login here
    login();
  }
}



// *** /\/\/\/\/\/\/\/\/ form validation for the registration /\/\/\/\/\/\***

const form2 = document.querySelector("form#register");
uField = form2.querySelector(".username");
uInput = uField.querySelector("input");
eField2 = form2.querySelector(".email2");
eInput2 = eField2.querySelector("input");
pField2 = form2.querySelector(".password2");
pInput2 = pField2.querySelector("input");

form2.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (uInput.value == "") ? uField.classList.add("shake", "error") : checkUsername();
  (eInput2.value == "") ? eField2.classList.add("shake", "error") : checkEmail2();
  (pInput2.value == "") ? pField2.classList.add("shake", "error") : checkPass2();

  setTimeout(() => { //remove shake class after 500ms
    uField.classList.remove("shake");
    eField2.classList.remove("shake");
    pField2.classList.remove("shake");
  }, 500);

  uInput.onkeyup = () => { checkUsername(); } //calling checkUsername function on username input keyup
  eInput2.onkeyup = () => { checkEmail2(); } //calling checkEmail function on email input keyup
  pInput2.onkeyup = () => { checkPass2(); } //calling checkPassword function on pass input keyup

  function checkEmail2() { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput2.value.match(pattern)) { //if pattern not matched then add error and remove valid class
      eField2.classList.add("error");
      eField2.classList.remove("valid");
      let errorTxt = eField2.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (eInput2.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    } else { //if pattern matched then remove error and add valid class
      eField2.classList.remove("error");
      eField2.classList.add("valid");
    }
  }

  function checkPass2() { //checkPass function
    if (pInput2.value.length < 4) { //if pass is empty then add error and remove valid class
      pField2.classList.add("error");
      pField2.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
      pField2.classList.remove("error");
      pField2.classList.add("valid");
    }
  }

  function checkUsername() { //checkPass function
    if (uInput.value.length < 4) { //if pass is empty then add error and remove valid class
      uField.classList.add("error");
      uField.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
      uField.classList.remove("error");
      uField.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eField2.classList.contains("error") && !pField2.classList.contains("error") && !uField.classList.contains("error")) {
    window.location.href = form2.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}


// *** /\/\/\/\/\/\/\/\/ form validation for the registration /\/\/\/\/\/\***

const form3 = document.querySelector("form#profile");
pField3 = form3.querySelector(".password3");
pInput3 = pField3.querySelector("input");

form3.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (pInput3.value == "") ? pField3.classList.add("shake", "error") : checkPass3();

  setTimeout(() => { //remove shake class after 500ms
    pField3.classList.remove("shake");
  }, 500);

  pInput3.onkeyup = () => { checkPass3(); } //calling checkPassword function on pass input keyup


  function checkPass3() { //checkPass function
    if (pInput3.value.length < 4) { //if pass is empty then add error and remove valid class
      pField3.classList.add("error");
      pField3.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
      pField3.classList.remove("error");
      pField3.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!pField3.classList.contains("error")) {
    window.location.href = form3.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}


// contact us validator 

const form4 = document.querySelector("form#contact");
tField = form4.querySelector(".textarea");
tInput = tField.querySelector("#textarea-contanctus");
emailContactField = form4.querySelector('.emailContact');
emailContactInput = emailContactField.querySelector('input')

form4.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (tInput.value == "") ? tField.classList.add("shake", "error") : checkText();
  (emailContactInput.value == "") ? emailContactField.classList.add("shake", "error") : checkEmailContact();

  setTimeout(() => { //remove shake class after 500ms
    tField.classList.remove("shake");
    emailContactField.classList.remove("shake");
  }, 500);

  tInput.onkeyup = () => { checkText(); } //calling checkUsername function on username input keyup
  emailContactInput.onkeyup = () => { checkEmailContact(); } //calling checkEmail function on email input keyup

  function checkEmailContact() { //checkEmail contact function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!emailContactInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
      emailContactField.classList.add("error");
      emailContactField.classList.remove("valid");
      let errorTxt = emailContactField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (emailContactInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    } else { //if pattern matched then remove error and add valid class
      emailContactField.classList.remove("error");
      emailContactField.classList.add("valid");
    }
  }

  function checkText() { //checkPass function
    // Use a regular expression to check if there is at least one word
    const hasWord = /[^\s]/.test(tInput.value.trim());
    if (!hasWord) { //if pass is empty then add error and remove valid class
      tField.classList.add("error");
      tField.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
      tField.classList.remove("error");
      tField.classList.add("valid");
    }
  }


  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!tField.classList.contains("error") && !emailContactField.classList.contains("error")) {
    form4.classList.add('okSent');
    setTimeout(() => {
      element = document.body.classList.toggle("show-popup-contact");
    }), 1500;

  }
}


// login functions
async function login() {
  email = String(document.querySelector("form#login").querySelector(".email").querySelector("input").value);
  password = String(document.querySelector("form#login").querySelector(".password").querySelector("input").value);



  try {
    const response = await fetch('https://yembaner.onrender.com/user/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
  
      // handle login button and change login status to true
      storeLoginState(true);
      updateLoginButton();
      showAlert('Login successful!', "login");
      element = document.body.classList.toggle("show-popup-logreg");
  
    } else {
      showAlert("Something went wrong. Please check your credentials or your network.", "login", true);
    }

  }
  catch {
    showAlert("Something went wrong. Please check your network connetion.", "login", true);
  }

}


async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');

  if (!refresh_token) {
    console.error('token not found!');
    showAlert("Please login to get access to this resource!", "", true);
    return;
  }

  const response = await fetch('https://yembaner.onrender.com/user/api/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refresh_token })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access);
  } else {
    // Handle token refresh failure (e.g., log out the user)
    showAlert("Please login to get access to this resource!", "", true);
    console.error('Failed to refresh token:', response.statusText);
  }
}

// async function apiRequest(endpoint, options = {}) {
//   const access_token = localStorage.getItem('access_token');

//   if (!access_token) {
//     console.error('No access token found');
//     showAlert("Please login to get access to this resource!", "", true);
//     return;
//   }

//   const response = await fetch(endpoint, {
//     ...options,
//     headers: {
//       ...options.headers,
//       'Authorization': `Bearer ${access_token}`
//     }
//   });

//   if (response.status === 401) {
//     // Token might be expired, try to refresh it
//     await refreshToken();

//     // Retry the request with the new access token
//     const newAcce
//     const retryResponse = await fetch(endpoint, {
//       ...options,
//       headers: {
//         ...options.headers,
//         'Authorization': `Bearer ${newAccessToken}`
//       }
//     });

//     return retryResponse;
//   }

//   return response;
// }


// // Example of using apiRequest to fetch some data
// async function fetchData() {
//   const response = await apiRequest('http://localhost:8000/api/some-endpoint/');
//   if (response.ok) {
//     const data = await response.json();
//     console.log('Data fetched successfully:', data);
//   } else {
//     console.log('Failed to fetch data:', response.statusText);
//   }
// }




// registration function





// ner function





// history function




// alert


function showAlert(message, path = "", isError = false, duration = 5000) {
  let element = null;
  switch (path) {
    case "login":
      element = document.querySelector('.alert-container-login');
      displayAlert({ element: element, message: message, duration: duration, isError: isError });
      break;
    case "signup":
      element = document.querySelector('.alert-container-signup');
      displayAlert({ element: element, message: message, duration: duration, isError: isError });
      break;
    case "profile":
      element = document.querySelector('.alert-container-profile');
      displayAlert({ element: element, message: message, duration: duration, isError: isError });
      break;
    default:
      element = document.querySelector('#alert-container');
      displayAlert({ element: element, message: message, duration: duration, isError: isError });
  }
}

function displayAlert({ element, message, duration, isError = false }) {
  const alert = document.createElement('div');
  alert.className = 'alert';
  alert.style.backgroundColor = isError ? '#f44336' : '#4CAF50'; // Red for error, green for success
  alert.innerText = message;

  element.appendChild(alert);

  // Fade out and remove the alert after 3 seconds
  setTimeout(() => {
    alert.style.opacity = '0.5';
    setTimeout(() => {
      alert.remove();
    }, 600); // Match the transition duration
  }, duration);

}

function updateLoginButton() {
  const loginButton = document.querySelector('.login-btn'); // Replace with your button's ID

  if (retrieveLoginState()) { // Replace 'isLoggedIn' with your authentication state check
    loginButton.textContent = 'Logout';
  } else {
    loginButton.textContent = 'Login';
  }
}

function storeLoginState(isLoggedIn) {
  localStorage.setItem('isLoggedIn', isLoggedIn); // Or use sessionStorage if needed
}

function retrieveLoginState() {
  const storedState = localStorage.getItem('isLoggedIn'); // Or sessionStorage
  return storedState === 'true'; // Parse the stored value
}


