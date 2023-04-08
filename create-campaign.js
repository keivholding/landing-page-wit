//
// Makes it so that the textarea height changes based on how tall the inner content it
//

const allTextarea = document.querySelectorAll("textarea");

// this loops through all of the text areas and adds an event listener for when an input is changed. It then changes the height of that text area so the user doesn't have to scroll
allTextarea.forEach((textarea) =>
  textarea.addEventListener("input", function (e) {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
    checkFormStatus();
  })
);

//
// Makes it so that the textarea height changes based on how tall the inner content it
//

//
// Adjusting the social Buttons value and active classes (shopify, linkedin, etc)
//

const socialButtonsContainer = document.querySelector(".social-buttons");
const notImportantTargeting = document.querySelector(
  "#not-important-targeting"
);
const targetingInput = document.querySelector(".targeting-input");
const targetingBtns = document.querySelectorAll(".targeting-btn");

// this adjusts the value for the targeting (shopify, linkedin, etc) buttons.
socialButtonsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  // this makes it so that the input value is reset each time there is a new click so that we don't get duplicates when we loop through the active classes at the bottom
  targetingInput.value = "";

  const clickedBtn = e.target.closest(".targeting-btn");

  // If the clicked button is the not important button, then we remove the active classes from all of the other buttons
  if (clickedBtn === notImportantTargeting) {
    targetingBtns.forEach((btn) => btn.classList.remove("active"));
    notImportantTargeting.classList.add("active");
    // if it isn't the not important button, then we remove the active class from the not important button and add it to the clicked button
  } else {
    notImportantTargeting.classList.remove("active");
    clickedBtn.classList.toggle("active");
  }

  // we are looping through each of the buttons, and if the button has a class "active", then we are adding the btns value to the input value with a space in between
  targetingBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      targetingInput.value += btn.value + " ";
    }
  });
});

//
// Adjusting the social Buttons value and active classes (shopify, linkedin, etc)
//

//
// Checks whether the whole form has been completed
//

const wholeInputForm = document.querySelector(".whole-input-form");
const formBoxBottom = document.querySelector(".form-box.bottom");
const industry = document.querySelector(".industry-select");
const locationInput = document.querySelector("#location");
const productDesc = document.querySelector("#product-description");
const valueProps = document.querySelector("#value-props");
const painPoints = document.querySelector("#pain-points");
const submitFormBtn = document.querySelector(".submit-button");

const checkFormStatus = function () {
  if (
    formBoxBottom.classList.contains("active") &&
    industry.value !== "" &&
    hiddenInputNumEmployees.value !== "" &&
    targetingInput.value !== "" &&
    locationInput.value !== "" &&
    productDesc.value !== "" &&
    valueProps.value !== "" &&
    painPoints.value !== ""
  ) {
    submitFormBtn.classList.remove("disabled");
  } else {
    submitFormBtn.classList.add("disabled");
  }
};

wholeInputForm.addEventListener("click", checkFormStatus);

const formDirectionBtns = document.querySelectorAll(".form-direction");
const formBoxTop = document.querySelector(".form-box.top");
const sectionTwo = document.querySelector(".section-two");
const pagesForm = document.querySelector(".pages-form");

// this makes it so that when the user clicks "next page", then the page switches and other stuff happens
formDirectionBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    formDirectionBtns.forEach((btn) => btn.classList.toggle("disabled"));
    formBoxTop.classList.toggle("active");
    formBoxBottom.classList.toggle("active");
    wholeInputForm.classList.toggle("clicked");
    sectionTwo.scrollIntoView({ behavior: "smooth" });
    pagesForm.classList.toggle("clicked");
    checkFormStatus();
  })
);

//
// Checks whether the whole form has been completed
//

//
// Makes it so that the create campaign button only pops up when a user scrolls down the page
//

const submitBtnContainer = document.querySelector(".submit-container");

// this makes it so that the create campaign button doesn't immediately show up (only shows up / gets removed when 20% of section 2 is showing)
const showRemoveBtn = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    submitBtnContainer.classList.add("show");
  }

  if (!entry.isIntersecting) {
    submitBtnContainer.classList.remove("show");
  }
};

const btnObserver = new IntersectionObserver(showRemoveBtn, {
  root: null,
  threshold: 0.2,
});

btnObserver.observe(sectionTwo);

//
// Makes it so that the create campaign button only pops up when a user scrolls down the page
//

//
// Making it so that the user can click "Not Important" buttons
//

const allNotImportantBtns = document.querySelectorAll(".not-important-btn");

allNotImportantBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Selects the parent form div
    const parentDiv = e.target.closest(".input-form");
    // Selects the text area field where we can now add "Not Important!"" to it
    const textContent = parentDiv.querySelector(".input-form-field");

    textContent.value = "Not Important!";
  });
});

//
// Making it so that the user can click "Not Important" buttons
//

//
//
//
//
//
//
//
//
//
//

//
// THIS IS FOR WHEN WE HAD BUTTONS WITH IMAGES ON THE FORM
//

// const hasButtonsForm = document.querySelectorAll(".has-buttons");

// // when any of the form buttons are clicked
// const formButtons = function (e) {
//   // prevent default makes it so that the form isn't submitted
//   e.preventDefault();

//   // this selects the button that was clicked
//   const clickedButton = e.target.closest(".btn");

//   // if clicked button doesn't exist, then return
//   if (!clickedButton) return;

//   // this selects the input form (the parent)
//   const inputForm = e.target.closest(".input-form");
//   // this selects the input (hidden type) where the value is stored
//   const fieldValue = inputForm.querySelector("input");
//   // this selects all of the buttons
//   const allBtns = inputForm.querySelectorAll(".btn");

//   // we are updating the input value based on the button that is clicked!
//   fieldValue.value = "";
//   fieldValue.value = clickedButton.value;

//   // remove active classes from all the buttons
//   allBtns.forEach((button) => button.classList.remove("active"));

//   // adds active class to the clicked button
//   clickedButton.classList.add("active");
// };

// // Loops through the divs that have buttons and adds click event listener
// hasButtonsForm.forEach((btnForm) =>
//   btnForm.addEventListener("click", formButtons)
// );

//
// THIS IS FOR WHEN WE HAD BUTTONS WITH IMAGES ON THE FORM
//

//
//
//
//
//
//
//
//
//
//
