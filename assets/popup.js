// /\/\/\/\/\\/\/\/\/\/\/\/\ login/registration popup \/\//\/\/\/\/\/\//\/\/

// login sign up popup
const showLogRegBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector("#logreg.popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
//  Show login popup
showLogRegBtn.addEventListener("click", () => {
  element = document.body.classList.toggle("show-popup-logreg");
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



//  /\/\\/\/\/\/\/\/\/ profile and password change \/\\/\/\/\/\/\\/\/\/\
const showProfileBtn = document.querySelector("#profile-link");
const profilePopup = document.querySelector("#profile.popup");
const hideProfileBtn = profilePopup.querySelector(".close-btn");

//  Show profile popup
showProfileBtn.addEventListener("click", () => {
  element = document.body.classList.toggle("show-popup-profile");
});
// Hide login popup
hideProfileBtn.addEventListener("click", () => showProfileBtn.click());


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
