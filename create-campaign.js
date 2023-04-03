const allTextarea = document.querySelectorAll("textarea");

allTextarea.forEach((textarea) =>
  textarea.addEventListener("input", function (e) {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
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
