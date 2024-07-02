// ************ MENU ********###########

const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());


// *************** LOGIN/REGISTRATION POPUP ******########

const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
  });
});


// ************* PROFILE AND PASSWORD RESET POPUP ********####################

const showProfilePopupBtn = document.querySelector("#profile");
const profilePopup = document.querySelector(".profile-popup");
const hideProfilePopupBtn = profilePopup.querySelector(".close-btn-1");

// Show profile popup
showProfilePopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide profile popup
hideProfilePopupBtn.addEventListener("click", () => showProfilePopupBtn.click());


// ************************** FORM VALIDATION FOR LOGIN *****###########################

const loginForm = document.querySelector("#login-form");
const emailField = loginForm.querySelector(".email");
const emailInput = emailField.querySelector("input");
const passwordField = loginForm.querySelector(".password");
const passwordInput = passwordField.querySelector("input");

loginForm.onsubmit = (e) => {
  e.preventDefault(); // Prevent form submission

  // Validate email
  if (emailInput.value === "") {
    emailField.classList.add("shake", "error");
  } else {
    emailField.classList.remove("shake", "error");
  }

  // Validate password
  if (passwordInput.value === "") {
    passwordField.classList.add("shake", "error");
  } else {
    passwordField.classList.remove("shake", "error");
  }

  // Redirect user if inputs are valid
  if (emailInput.value !== "" && passwordInput.value !== "") {
    window.location.href = loginForm.getAttribute("action");
  }
};

// Form validation for the registration

const registrationForm = document.querySelector("#register-form");
const usernameField = registrationForm.querySelector(".username");
const usernameInput = usernameField.querySelector("input");
const emailField2 = registrationForm.querySelector(".email2");
const emailInput2 = emailField2.querySelector("input");
const passwordField2 = registrationForm.querySelector(".password2");
const passwordInput2 = passwordField2.querySelector("input");

registrationForm.onsubmit = (e) => {
  e.preventDefault(); // Prevent form submission

  // Validate username
  if (usernameInput.value === "") {
    usernameField.classList.add("shake", "error");
  } else {
    usernameField.classList.remove("shake", "error");
  }

  // Validate email
  if (emailInput2.value === "") {
    emailField2.classList.add("shake", "error");
  } else {
    emailField2.classList.remove("shake", "error");
  }

  // Validate password
  if (passwordInput2.value === "") {
    passwordField2.classList.add("shake", "error");
  } else {
    passwordField2.classList.remove("shake", "error");
  }

  // Redirect user if inputs are valid
  if (usernameInput.value !== "" && emailInput2.value !== "" && passwordInput2.value !== "") {
    window.location.href = registrationForm.getAttribute("action");
  }
};
