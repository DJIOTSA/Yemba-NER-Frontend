// /\/\/\/\/\\/\/\/\/\/\/\/\ login/registration popup \/\//\/\/\/\/\/\//\/\/

// login sign up popup
const showLogRegBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector("#logreg.popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const resetLoginLink = formPopup.querySelectorAll(".middle-link a");

//  Show login popup
showLogRegBtn.addEventListener("click", () => {
  if (showLogRegBtn.textContent === 'Login'){
    element = document.body.classList.toggle("show-popup-logreg");
  }else{
    // logout the user
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // handle login button
    // change login status to true
    storeLoginState(false);
    updateLoginButton();
  }
});
// Hide login popup
hidePopupBtn.addEventListener("click", () => showLogRegBtn.click());
// Show or hide signup form
signupLoginLink.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
  });
});
// Show or hide reset form
resetLoginLink.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === 'forgot-pass-link' ? 'add' : 'remove']("show-resetPass");
  });
});




// /\/\/\/\/\/\//\/\ contact us /\/\/\/\\/\/\\/\/\/\/\/\
const showContactBtn = document.querySelector("#contact-link");
const contactPopup = document.querySelector("#contact.popup");
const hideContactBtn = contactPopup.querySelector(".close-btn");

//  Show contact us popup
showContactBtn.addEventListener("click", () => {
  element = document.body.classList.toggle("show-popup-contact");
});
// Hide login popup
hideContactBtn.addEventListener("click", () => showContactBtn.click());


// /\/\/\/\/\/\//\/\ About us /\/\/\/\\/\/\\/\/\/\/\/\
const showAboutUsBtn = document.querySelector("#aboutus-link");
const aboutUsPopup = document.querySelector("#aboutus.popup");
const hideAboutUsBtn = aboutUsPopup.querySelector(".close-btn");

//  Show contact us popup
showAboutUsBtn.addEventListener("click", () => {
  element = document.body.classList.toggle("show-popup-aboutus");
});
// Hide login popup
hideAboutUsBtn.addEventListener("click", () => showAboutUsBtn.click());




function  updateLoginButton() {
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