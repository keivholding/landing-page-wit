const allTextarea = document.querySelectorAll("textarea");

allTextarea.forEach((textarea) =>
  textarea.addEventListener("input", function (e) {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight + 7}px`;
  })
);

const allRadioGenderButtons = document.querySelectorAll(".gender-btn");
const hiddenInput = document.querySelector(".gender-input");

// this loops through all of the radio gender buttons
allRadioGenderButtons.forEach((button) =>
  button.addEventListener("click", function (e) {
    // prevent default makes it so that the form isn't submitted
    e.preventDefault();

    // this selects the button that was clicked even if the font-awesome icon was clicked
    const clickedButton = e.target.closest(".gender-btn");

    // we are updating the input value based on the button that isclicked!
    hiddenInput.value = "";
    hiddenInput.value = e.target.value;

    // adding / remove active classes
    allRadioGenderButtons.forEach((button) =>
      button.classList.remove("active")
    );

    clickedButton.classList.add("active");
  })
);

const allSocialBtns = document.querySelectorAll(".location");
const hangout = document.querySelector(".hangout-input");

allSocialBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const prevValue = hangout.value;
    const clickedValue = e.target.value;

    e.target.classList.toggle("active");

    hangout.value = `${clickedValue + " " + prevValue}`;

    allSocialBtns.forEach((btn) => {
      if (!btn.classList.contains("active")) {
        hangout.value = hangout.value.replaceAll(`${btn.value} `, "");
      }
    });
  })
);

const formDirectionBtns = document.querySelectorAll(".form-direction");
const formBoxTop = document.querySelector(".form-box.top");
const formBoxBottom = document.querySelector(".form-box.bottom");
const wholeInputForm = document.querySelector(".whole-input-form");
const sectionTwo = document.querySelector(".section-two");
const pagesForm = document.querySelector(".pages-form");

formDirectionBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    formDirectionBtns.forEach((btn) => btn.classList.toggle("disabled"));
    formBoxTop.classList.toggle("active");
    formBoxBottom.classList.toggle("active");
    wholeInputForm.classList.toggle("clicked");
    sectionTwo.scrollIntoView({ behavior: "smooth" });
    pagesForm.classList.toggle("clicked");
  })
);

const totalInputFields = wholeInputForm.querySelectorAll(".input-form").length;

wholeInputForm.addEventListener("click", function () {
  const percentageInc = 100 / totalInputFields;

  const inputFormField = document.querySelectorAll(".input-form-field");

  inputFormField.forEach((field) => {
    console.log(field.value === "");
  });

  console.log(inputFormField);
});
