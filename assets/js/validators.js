// update login button textContent
updateLoginButton();

const loginLoader = document.querySelector("#loader-login");
const resetPassLoader = document.querySelector("#loader-resetPass");
const signupLoader = document.querySelector("#loader-signup");
const profileLoader = document.querySelector("#loader-profile");


/*  utility functions */

function checkEmail(emailField, emailInput) { //checkEmail function
  /* check if the email meet the required format */
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
  if (!emailInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
    emailField.classList.add("error");
    emailField.classList.remove("valid");
    let errorTxt = emailField.querySelector(".error-txt");
    //if email value is not empty then show please enter valid email else show Email can't be blank
    (emailInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
  } else { //if pattern matched then remove error and add valid class
    emailField.classList.remove("error");
    emailField.classList.add("valid");
  }
}

function checkPass(passwordField, passwordInput) { //checkPass function
  /* Make sure the password has at least 4 character */
  if (passwordInput.value.length < 4) { // if pass is empty then add error and remove valid class
    passwordField.classList.add("error");
    passwordField.classList.remove("valid");
  } else { // if pass is empty then remove error and add valid class
    passwordField.classList.remove("error");
    passwordField.classList.add("valid");
  }
}



const history = document.querySelector('#history');

// **************************  form  validation for login *****###########################
const form = document.querySelector("form#login");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail(eField, eInput);
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass(pField, pInput);

  setTimeout(() => { //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = () => { checkEmail(eField, eInput); } //calling checkEmail function on email input keyup
  pInput.onkeyup = () => { checkPass(eField, eInput); } //calling checkPassword function on pass input keyup


  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
    // perform the login here
    login();
  }
}

/* **************************  form  validation for reset password *****########################### */
const formR = document.querySelector("form#resetPass");
eFieldR = formR.querySelector(".emailR");
eInputR = eFieldR.querySelector("input");
pFieldR = formR.querySelector(".passwordR");
pInputR = pFieldR.querySelector("input");

formR.onsubmit = (e) => {
  e.preventDefault();
  (eInputR.value == "") ? eFieldR.classList.add("shake", "error") : checkEmail(eFieldR, eInputR);
  (pInputR.value == "") ? pFieldR.classList.add("shake", "error") : checkPass(pFieldR, pInputR);

  setTimeout(() => { //remove shake class after 500ms
    eFieldR.classList.remove("shake");
    pFieldR.classList.remove("shake");
  }, 500);

  eInputR.onkeyup = () => { checkEmail(eFieldR, eInputR); } //calling checkEmail function on email input keyup
  pInputR.onkeyup = () => { checkPass(pFieldR, pInputR); } //calling checkPassword function on pass input keyup

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eFieldR.classList.contains("error") && !pFieldR.classList.contains("error")) {
    // perform the password reset here
    resetPassword();
  }
}


// *** /\/\/\/\/\/\/\/\/ form validation for the registration /\/\/\/\/\/\***

const form2 = document.querySelector("form#register");
uField = form2.querySelector(".username");
uInput = uField.querySelector("input");
eField2 = form2.querySelector(".email2");
eInput2 = eField2.querySelector("input");
fField = form2.querySelector(".first_name");
fInput = fField.querySelector("input");
lField = form2.querySelector(".last_name");
lInput = lField.querySelector("input");
pField2 = form2.querySelector(".password2");
pInput2 = pField2.querySelector("input");

form2.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (uInput.value == "") ? uField.classList.add("shake", "error") : checkUsername();
  (eInput2.value == "") ? eField2.classList.add("shake", "error") : checkEmail(eField2, eInput2);
  (pInput2.value == "") ? pField2.classList.add("shake", "error") : checkPass(pField2, pInput2);
  (fInput.value == "") ? fField.classList.add("shake", "error") : checkFirstname();
  (lInput.value == "") ? lField.classList.add("shake", "error") : checkLastname();

  setTimeout(() => { //remove shake class after 500ms
    uField.classList.remove("shake");
    eField2.classList.remove("shake");
    pField2.classList.remove("shake");
    fField.classList.remove("shake");
    lField.classList.remove("shake");
  }, 500);

  uInput.onkeyup = () => { checkUsername(); }
  eInput2.onkeyup = () => { checkEmail(eField2, eInput2); }
  pInput2.onkeyup = () => { checkPass(pField2, pInput2); }
  fInput.onkeyup = () => { checkFirstname(); }
  lInput.onkeyup = () => { checkLastname(); }


  function checkUsername() {
    if (uInput.value.length < 4) {
      uField.classList.add("error");
      uField.classList.remove("valid");
    } else {
      uField.classList.remove("error");
      uField.classList.add("valid");
    }
  }

  function checkFirstname() {
    if (fInput.value.length == '') {
      fField.classList.add("error");
      fField.classList.remove("valid");
    } else {
      fField.classList.remove("error");
      fField.classList.add("valid");
    }
  }

  function checkLastname() {
    if (lInput.value.length == '') {
      lField.classList.add("error");
      lField.classList.remove("valid");
    } else {
      lField.classList.remove("error");
      lField.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eField2.classList.contains("error") && !pField2.classList.contains("error") && !uField.classList.contains("error") && !fField.classList.contains("error") && !lField.classList.contains("error")) {
    // perform the registration
    registration();
  }
}


// *** /\/\/\/\/\/\/\/\/  profile popup and data load /\/\/\/\/\/\***

//  /\/\\/\/\/\/\/\/\/ profile and password change \/\\/\/\/\/\/\\/\/\/\
const showProfileBtn = document.querySelector("#profile-link");
const profilePopup = document.querySelector("#profile.popup");
const hideProfileBtn = profilePopup.querySelector(".close-btn");

//  Show profile popup
showProfileBtn.addEventListener("click", () => {
  element = document.body.classList.toggle("show-popup-profile");
  fetchUserProfile();
});
// Hide login popup
hideProfileBtn.addEventListener("click", () => showProfileBtn.click());

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
  (emailContactInput.value == "") ? emailContactField.classList.add("shake", "error") : checkEmail(emailContactField, emailContactInput);

  setTimeout(() => { //remove shake class after 500ms
    tField.classList.remove("shake");
    emailContactField.classList.remove("shake");
  }, 500);

  tInput.onkeyup = () => { checkText(); } //calling checkUsername function on username input keyup
  emailContactInput.onkeyup = () => { checkEmail(emailContactField, emailContactInput); } //calling checkEmail function on email input keyup


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



// history content
const historyContent = document.getElementById('history-content');



// login functions
async function login() {
  email = eInput.value;
  password = pInput.value;
  loginLoader.style.display ="";
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
      loginLoader.style.display ='none';
      window.location.reload();
      showAlert('Login successful!', "", false, 3000);
      // element = document.body.classList.toggle("show-popup-logreg");
      eInput.value = "";
      pInput.value = "";

    } else {
      loginLoader.style.display = 'none';
      showAlert("Something went wrong. Please check your credentials or your network.", "login", true, 7000);
    }

  }
  catch {
    loginLoader.style.display = 'none';
    showAlert("Something went wrong. Please check your network connection.", "login", true);
  }

}


// login functions
async function resetPassword() {
  email = eInputR.value;
  new_password = pInputR.value;
  resetPassLoader.style.display = "";
  try {
    const response = await fetch('https://yembaner.onrender.com/user/password/reset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, new_password })
    });

    if (response.ok) {
      const data = await response.json();
      resetPassLoader.style.display = "none";
      showAlert(`A verification email has been sent to the provided email address!\n `, "resetPass");

      setTimeout(() => {

      }, 5000);
      element = document.body.classList.toggle("show-popup-logreg");
      eInputR.value = "";
      pInputR.value = "";

    } else {
      resetPassLoader.style.display = "none";
      showAlert("Please make sure the provided email address is linked to your account and your network is good.", "resetPass", true, 7000);
    }

  }
  catch {
    resetPassLoader.style.display = "none";
    showAlert("Something went wrong. Please check your network connection.", "resetPass", true);
  }

}


async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');

  if (!refresh_token) {
    document.body.classList.toggle("show-popup-logreg");
    showAlert("Please login to continue!", "login");
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
    // logout the user
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // handle login button
    storeLoginState(false);
    updateLoginButton();
    document.body.classList.toggle("show-popup-logreg");
    showAlert("Please login to continue!", "login");
  }
}


async function apiRequest(endpoint, options = {}) {
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    console.error('No access token found');
    return;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${access_token}`
    }
  });

  if (response.status === 401) {
    // Token might be expired, try to refresh it
    await refreshToken();

    // Retry the request with the new access token
    const newAccessToken = localStorage.getItem('access_token');
    const retryResponse = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${newAccessToken}`
      }
    });

    return retryResponse;
  }

  return response;
}




// registration function
async function registration() {
  const username = uInput.value;
  const email = eInput2.value;
  const first_name = fInput.value;
  const last_name = lInput.value;
  const password = pInput2.value;
  signupLoader.style.display = '';
  try {
    const response = await fetch('https://yembaner.onrender.com/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, first_name, last_name, password })
    });

    if (response.ok) {
      signupLoader.style.display = 'none';
      showAlert("A verification email has been sent to the provided email.", "signup", false, 7000);
      // Clear input fields
      setTimeout(() => {
        element = document.body.classList.toggle("show-popup-logreg");
      }, 7000);
      uInput.value = '';
      eInput2.value = '';
      fInput.value = '';
      lInput.value = '';
      pInput2.value = '';
    } else {
      const errorData = await response.json(); // Wait for JSON parsing
      signupLoader.style.display = 'none';
      showAlert(`${errorData['email'] ? errorData['email'][0] : ''} \n ${errorData['username'] ? errorData['username'][0] : ''}`, "signup", true, 7000);
    }
  } catch (error) {
    // Handle all errors (network, parsing, etc.)
    console.error('Error:', error);
    signupLoader.style.display = 'none';
    showAlert("An unexpected error occurred. Please try again later.", "signup", true);
  }
}


// view profile
async function fetchUserProfile() {

  const email = document.querySelector('form#profile .email3 input');
  const username = document.querySelector('form#profile .username3 input');
  const first_name = document.querySelector('form#profile .first_name2 input');
  const last_name = document.querySelector('form#profile .last_name2 input');
  
  if (retrieveLoginState()) {
    try {
      profileLoader.style.display = '';
      const response = await apiRequest('https://yembaner.onrender.com/user/profile/');
      if (response.ok) {
        const data = await response.json();
        username.value += data['results'][0]['username'];
        email.value += data['results'][0]['email'];
        first_name.value += data['results'][0]['first_name'];
        last_name.value += data['results'][0]['last_name'];
        profileLoader.style.display = 'none';
      } else {
        profileLoader.style.display = 'none';
        showAlert("Something went wrong. Please, check your network connection and try again later.", "profile", false, 7000);
      }
    } catch {
      profileLoader.style.display = 'none';
      showAlert("An unexpected error occurred. Please, check your network connection and try again later.", "profile", true, 7000);
    }

  } else {
    profileLoader.style.display = 'none';
    showAlert("Login to see your personal informations", "profile", false, 3000);
  }

} 



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
    case "resetPass":
      element = document.querySelector('.alert-container-resetPass');
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


