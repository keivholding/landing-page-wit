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

const seeTemplateBtn = document.querySelector(".template-button");

const adjustHeight = function (textarea) {
  const scrollHeight = textarea.scrollHeight;
  textarea.style.height = `${scrollHeight + 7}px`;
};

seeTemplateBtn.addEventListener("click", function () {
  one.value = `We're an end-to-end sales prospecting service that helps our customers find high-quality leads for their businesses. We create personalized email templates for each lead and use an automated email system to send them. Using machine learning, we analyze the performance of each template to identify the most effective ones, helping streamline our customer's sales process to free up their time to actually focus on growing their businesses!`;

  two.value = `Save Time: Automate your whole sales prospecting pipeline from lead sourcing to emailing so you can focus on closing deals.\n\nPersonalized Messaging: Customized email templates increase the chances of converting leads to customers.\n\nResults that Improve Over Time: Our machine learning algorithm tracks the performance of each email template, so, with each iteration, the algorithm gets better at determining which email will perform given the lead's demographic.`;

  three.value = `Identifying the right audience: Difficulty in identifying the target audience most likely to be interested in your product or service.\n\nTime-consuming: Finding leads, verifying those leads, then crafting a personalized, high-converting email is very time consuming.`;

  adjustHeight(one);
  adjustHeight(two);
  adjustHeight(three);
});

const one = document.querySelector("#product-description");
const two = document.querySelector("#value-props");
const three = document.querySelector("#pain-points");
const four = document.querySelector("#both-btn");
const five = document.querySelector("#min-age");
const six = document.querySelector("#max-age");
const seven = document.querySelector("#location");
const eight = document.querySelector("#linkedin");
const nine = document.querySelector("#twitter");
