const allTextarea = document.querySelectorAll("textarea");

// this loops through all of the text areas and adds an event listener for when an input is changed. It then changes the height of that text area so the user doesn't have to scroll
allTextarea.forEach((textarea) =>
  textarea.addEventListener("input", function (e) {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
    checkFormStatus();
  })
);

const hasButtonsForm = document.querySelectorAll(".has-buttons");

// when any of the form buttons are clicked
const formButtons = function (e) {
  // prevent default makes it so that the form isn't submitted
  e.preventDefault();

  // this selects the button that was clicked
  const clickedButton = e.target.closest(".btn");

  // if clicked button doesn't exist, then return
  if (!clickedButton) return;

  // this selects the input form (the parent)
  const inputForm = e.target.closest(".input-form");
  // this selects the input (hidden type) where the value is stored
  const fieldValue = inputForm.querySelector("input");
  // this selects all of the buttons
  const allBtns = inputForm.querySelectorAll(".btn");

  // we are updating the input value based on the button that is clicked!
  fieldValue.value = "";
  fieldValue.value = clickedButton.value;

  // remove active classes from all the buttons
  allBtns.forEach((button) => button.classList.remove("active"));

  // adds active class to the clicked button
  clickedButton.classList.add("active");
};

// Loops through the divs that have buttons and adds click event listener
hasButtonsForm.forEach((btnForm) =>
  btnForm.addEventListener("click", formButtons)
);

const allSocialBtns = document.querySelectorAll(".location");
const targeting = document.querySelector(".targeting-input");
const notImportantTargeting = document.querySelector(
  "#not-important-targeting"
);

// this adjusts the value for the targeting (shopify, linkedin, etc) buttons.
allSocialBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const prevValue = targeting.value;
    const clickedValue = e.target.value;

    e.target.classList.toggle("active");

    // if not important is clicked, then we're going to remove the active class from all of the other buttons and make the target value = to not important
    if (e.target === notImportantTargeting) {
      allSocialBtns.forEach((btn) => btn.classList.remove("active"));
      notImportantTargeting.classList.add("active");
      targeting.value = "";
      targeting.value = notImportantTargeting.value;
    }

    // if the button clicked is not the important button, we're going to remove the important from the value
    // this makes it so that the targeting value is concatenated like shopify --> shopify linkedin --> etc
    if (e.target !== notImportantTargeting) {
      targeting.value = `${clickedValue} ${prevValue}`;
      notImportantTargeting.classList.remove("active");
      targeting.value = targeting.value.replaceAll(
        `${notImportantTargeting.value}`,
        ""
      );
    }

    // this makes it so that if the button is clicked again (not active), then we replace that value in targeting value
    allSocialBtns.forEach((btn) => {
      if (!btn.classList.contains("active")) {
        targeting.value = targeting.value.replaceAll(`${btn.value}`, "");
      }
    });
  })
);

const wholeInputForm = document.querySelector(".whole-input-form");
const formBoxBottom = document.querySelector(".form-box.bottom");
const industry = document.querySelector(".industry-select");
const locationInput = document.querySelector("#location");
const targetingInput = document.querySelector(".targeting-input");
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
    wholeInputForm.scrollIntoView({ behavior: "smooth" });
    pagesForm.classList.toggle("clicked");
    checkFormStatus();
  })
);

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
