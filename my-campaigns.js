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

//
//
// CHECKBOX FUNCTION FOR THE TABLE
//
//

const campaignTable = document.querySelector(".campaigns");
const selectedArray = [];

// this function makes it so that when we
campaignTable.addEventListener("click", function (e) {
  // if the thing we click doesn't contain table-checkbox, then we immediately return
  if (!e.target.classList.contains("table-checkbox")) return;

  // this selects the table row of the checkbox
  const campaignRow = e.target.closest(".table-row");

  // if we are ticking the checkbox, we're adding checked to it, + making the campaign row appear selected
  if (e.target.checked) {
    e.target.setAttribute("checked", "");
    campaignRow.setAttribute("selected", "true");

    // this adds the row that was just selected to the selected array
    selectedArray.push(campaignRow);

    // need to call here because when we check, we want to show the to-do buttons
    showToDoButtons();

    // if we are unticking the checkbox, we're remove checked to it, + making the campaign not appear as selected
  } else {
    e.target.removeAttribute("checked");
    campaignRow.removeAttribute("selected");

    // this finds the index of the row that was unselected and removes it from the selected array
    selectedArray.splice(
      selectedArray.findIndex((row) => row === campaignRow),
      1
    );

    // need to call here as well because when we uncheck, this else block is run
    showToDoButtons();
  }
});

const campaignContainer = document.querySelector(".campaigns-container");
const downloadBtn = document.querySelector("button.download");
const archiveBtn = document.querySelector("button.archive");
const campaignNumber = document.querySelector(".number-campaigns");

const showToDoButtons = function () {
  const length = selectedArray.length;

  switch (length) {
    case 0: {
      campaignNumber.textContent = `You have selected 1 campaign`;
    }
    case 1:
      campaignNumber.textContent = `You have selected 1 campaign`;
      break;
    default:
      campaignNumber.textContent = `You have selected ${length} campaigns`;
  }

  // If the selected array doesn't have any elements, then we hide these buttons, else we show
  if (selectedArray.length === 0) {
    setTimeout(() => {
      campaignContainer.classList.remove("show");
    }, 400);

    setTimeout(() => {
      downloadBtn.classList.remove("show");
    }, 300);

    setTimeout(() => {
      archiveBtn.classList.remove("show");
    }, 150);

    campaignNumber.classList.remove("show");
  } else {
    campaignContainer.classList.add("show");

    downloadBtn.classList.add("show");

    setTimeout(() => {
      archiveBtn.classList.add("show");
    }, 150);

    setTimeout(() => {
      campaignNumber.classList.add("show");
    }, 300);
  }
};

//
//
// CHECKBOX FUNCTION FOR THE TABLE
//
//
