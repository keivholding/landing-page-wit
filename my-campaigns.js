//
//
// WHEN YOU HOVER ON THE SAVED TIME ANALYTICS
//
//

const saveTimeQuestion = document.querySelector(".question-icon");
const saveTimeBox = document.querySelector(".time-saved-popup-inner");
const saveTimeIcon = document.querySelector(".popup-from");

const showCloseTimePopup = function () {
  saveTimeBox.classList.toggle("show");
  saveTimeIcon.classList.toggle("show");
};

saveTimeQuestion.addEventListener("mouseover", showCloseTimePopup);
saveTimeQuestion.addEventListener("mouseout", showCloseTimePopup);

//
//
// WHEN YOU HOVER ON THE SAVED TIME ANALYTICS
//
//
