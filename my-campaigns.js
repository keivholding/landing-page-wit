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
// ADDING CAMPAIGNS TO THE TABLE
//
//

const tableBody = document.querySelector(".table-body.campaigns");

const activeUserCampaigns = [
  `<tr class="table-row">
                        <td>
                            <input type="checkbox" class="table-checkbox">
                        </td>
                        <td class="campaign-details-table">
                            <div class="campaign-details">
                                <div class="campaign-name">This is my mintry fresh campaign name that is going
                                    to
                                    push everything
                                    unfortunately</div>
                                <div class="campaign-created">Created on May 5th, 2022</div>
                            </div>
                        </td>
                        <td class="emails-sent-table">105</td>
                        <td class="emails-opened-table">39</td>
                        <td class="responses-table">31</td>
                        <td class="meetings-booked-table">22</td>
                        <td class="sales-table">7</td>
                        <td class="time-saved-table">22h</td>
                        <td class="view-campaign">
                            <div class="campaign-buttons">
                                <a href="#">
                                    <div class="btn view-btn primary">View Campaign</div>
                                </a>
                                <div class="btn download-csv secondary">Download CSV</div>
                            </div>
                        </td>
                    </tr>`,
  `<tr class="table-row">
                        <td>
                            <input type="checkbox" class="table-checkbox">
                        </td>
                        <td class="campaign-details-table">
                            <div class="campaign-details">
                                <div class="campaign-name">I am going to target this demographic</div>
                                <div class="campaign-created">Created on June 22nd, 2022</div>
                            </div>
                        </td>
                        <td>56</td>
                        <td>22</td>
                        <td>14</td>
                        <td>9</td>
                        <td>3</td>
                        <td>16h</td>
                        <td class="view-campaign">
                            <div class="campaign-buttons">
                                <a href="#">
                                    <div class="btn view-btn primary">View Campaign</div>
                                </a>
                                <div class="btn download-csv secondary">Download CSV</div>
                            </div>
                        </td>
                    </tr>`,
  `<tr class="table-row">
                        <td>
                            <input type="checkbox" class="table-checkbox">
                        </td>
                        <td class="campaign-details-table">
                            <div class="campaign-details">
                                <div class="campaign-name">Cool bro campaign you know</div>
                                <div class="campaign-created">Created on December 31st, 2021</div>
                            </div>
                        </td>
                        <td>113</td>
                        <td>49</td>
                        <td>30</td>
                        <td>15</td>
                        <td>3</td>
                        <td>32h</td>
                        <td class="view-campaign">
                            <div class="campaign-buttons">
                                <a href="#">
                                    <div class="btn view-btn primary">View Campaign</div>
                                </a>
                                <div class="btn download-csv secondary">Download CSV</div>
                            </div>
                        </td>
                    </tr>`,
];

activeUserCampaigns.forEach((campaign) => {
  tableBody.insertAdjacentHTML("afterbegin", campaign);
});

//
//
// ADDING CAMPAIGNS TO THE TABLE
//
//

//
//
// CHECKBOX FUNCTION FOR THE TABLE
//
//

const campaignTable = document.querySelector(".campaigns");
const allCheckboxes = document.querySelectorAll(".table-checkbox");
const allCampaignRows = document.querySelectorAll(".table-row");
const selectAllCheckbox = document.querySelector(".table-checkbox-all");
const selectedArray = [];

// this function makes it so that when we
campaignTable.addEventListener("click", function (e) {
  // if the checkbox we click has table-checkbox (the table checkboxes)
  if (e.target.classList.contains("table-checkbox")) {
    // this selects the table row of the checkbox
    const campaignRow = e.target.closest(".table-row");

    // if we are ticking the checkbox, we're adding checked to it, + making the campaign row appear selected
    if (e.target.checked) {
      e.target.checked = true;
      e.target.setAttribute("checked", "");
      campaignRow.setAttribute("selected", "true");

      // this adds the row that was just selected to the selected array
      selectedArray.push(campaignRow);

      // need to call here because when we check, we want to show the to-do buttons
      showToDoButtons();

      // If every checkbox is ticked, then the selectAllCheckbox will apear ticked as well!
      if (selectedArray.length === allCheckboxes.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.setAttribute("checked", "");
      }

      // if we are unticking the checkbox, we're removing checked from it, + making the row not appear as selected + making the all checkbox button not ticked (important!)
    } else {
      e.target.removeAttribute("checked");
      campaignRow.removeAttribute("selected");
      e.target.checked = false;
      selectAllCheckbox.checked = false;
      selectAllCheckbox.removeAttribute("checked");

      // this finds the index of the row that was unselected and removes it from the selected array
      selectedArray.splice(
        selectedArray.findIndex((row) => row === campaignRow),
        1
      );

      // need to call here as well because when we uncheck, this else block is run
      showToDoButtons();
    }
  }

  // If the checkbox that we click is the all checkbox button
  if (e.target.classList.contains("table-checkbox-all")) {
    // when all is clicked, we need to 'reset' the array so that there aren't any duplicates
    selectedArray.splice(0, selectedArray.length);

    // if we are ticking the all checkbox, then we are selecting ALL of the checkboxes and setting checked to true for each one
    if (selectAllCheckbox.checked) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.setAttribute("checked", "");

      allCheckboxes.forEach((checkbox) => {
        checkbox.setAttribute("checked", "");
        checkbox.checked = true;
      });

      // we are also making all of the campaign rows selected
      allCampaignRows.forEach((campaignRow) => {
        campaignRow.setAttribute("selected", "true");
        // and adding each campaign to the array
        selectedArray.push(campaignRow);
      });

      // need to call here because when we check, we want to show the to-do buttons
      showToDoButtons();

      // if we are unselecting the all box, then we are removing
    } else {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.removeAttribute("checked");

      // removing the checked attribute for all checkboxes
      allCheckboxes.forEach((checkbox) => {
        checkbox.removeAttribute("checked", "");
        checkbox.checked = false;
      });

      // and removing the selected attribute from all rows
      allCampaignRows.forEach((campaignRow) => {
        campaignRow.removeAttribute("selected");
      });

      // resetting the array as not nothing is selected
      selectedArray.splice(0, selectedArray.length);

      // need to call so the to-do buttons can go away!
      showToDoButtons();
    }
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
      archiveBtn.classList.remove("show");
    }, 300);

    setTimeout(() => {
      downloadBtn.classList.remove("show");
    }, 150);

    campaignNumber.classList.remove("show");
  } else {
    campaignContainer.classList.add("show");

    archiveBtn.classList.add("show");
    setTimeout(() => {
      downloadBtn.classList.add("show");
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

const campaigns = {
  data: [
    {
      id: 2,
      created_at: "2023-03-28T18:33:35.840126+00:00",
      name: "Campaign 1",
      user_id: null,
      who_to_target: null,
      what_to_include: null,
    },
  ],
};
