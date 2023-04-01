const campaigns = {
  data: [
    {
      user_id: null,
      id: 1,
      name: "Fast Food Restaurants on Shopify",
      created_at: "2023-03-31T18:33:35.840126+00:00",
      emails_sent: 182,
      emails_opened: 56,
      responses: 40,
      meetings_booked: 32,
      sales: 18,
      who_to_target: null,
      what_to_include: null,
    },
    {
      user_id: null,
      id: 2,
      name: "Grocery Stores In Colombia [using discounts]",
      created_at: "2023-03-28T18:33:35.840126+00:00",
      emails_sent: 57,
      emails_opened: 32,
      responses: 23,
      meetings_booked: 22,
      sales: 13,
      who_to_target: null,
      what_to_include: null,
    },
    {
      user_id: null,
      id: 3,
      name: "Retargeting Fast Food Restaurants on Shopify (cold targeting)",
      created_at: "2023-03-21T18:33:35.840126+00:00",
      emails_sent: 77,
      emails_opened: 33,
      responses: 27,
      meetings_booked: 25,
      sales: 19,
      who_to_target: null,
      what_to_include: null,
    },
    {
      user_id: null,
      id: 4,
      name: "First launch campaign w/ Deborah",
      created_at: "2023-02-28T18:33:35.840126+00:00",
      emails_sent: 27,
      emails_opened: 12,
      responses: 7,
      meetings_booked: 5,
      sales: 2,
      who_to_target: null,
      what_to_include: null,
    },
  ],
};

//
//
// UPDATING ACCOUNT ANALYTICS
//
//

const emailsSent = document.querySelector(".number-analytics.emails-sent");
const emailsOpened = document.querySelector(".number-analytics.emails-opened");
const emailsResponded = document.querySelector(
  ".number-analytics.email-responses"
);
const meetingsBooked = document.querySelector(
  ".number-analytics.meetings-booked"
);
const sales = document.querySelector(".number-analytics.sales");
const timeSaved = document.querySelector(".number-analytics.time-saved");

let sent = 0;
let opens = 0;
let responses = 0;
let meetings = 0;
let salesGenerated = 0;
let timeHour = 0;
let timeMinute = 0;

campaigns.data.forEach((campaign) => {
  sent += campaign.emails_sent;
  opens += campaign.emails_opened;
  responses += campaign.responses;
  meetings += campaign.meetings_booked;
  salesGenerated += campaign.sales;
  timeHour += Math.floor(campaign.sent * 13.5);
});

timeHour = Math.floor((sent * 13.5) / 60);

emailsSent.textContent = sent;
emailsOpened.textContent = opens;
emailsResponded.textContent = responses;
meetingsBooked.textContent = meetings;
sales.textContent = salesGenerated;
timeSaved.textContent = `${getFormattedNumber(timeHour)}h`;
//
//
// UPDATING ACCOUNT ANALYTICS
//
//

//
//
// UPDATING THE TABLE
//
//

const tableBody = document.querySelector(".table-body.campaigns");

campaigns.data.forEach((campaign) => {
  const html = `<tr class="table-row">
                        <td>
                            <input type="checkbox" class="table-checkbox">
                        </td>
                        <td class="campaign-details-table">
                            <div class="campaign-details">
                                <div class="campaign-name">${
                                  campaign.name
                                }</div>
                                <div class="campaign-created">${getDateDifference(
                                  campaign.created_at
                                )}</div>
                            </div>
                        </td>
                        <td class="emails-sent-table">${
                          campaign.emails_sent
                        }</td>
                        <td class="emails-opened-table">${
                          campaign.emails_opened
                        }</td>
                        <td class="responses-table">${campaign.responses}</td>
                        <td class="meetings-booked-table">${
                          campaign.meetings_booked
                        }</td>
                        <td class="sales-table">${campaign.sales}</td>
                        <td class="time-saved-table">
                        ${getFormattedNumber(
                          Math.floor((campaign.emails_sent * 13.5) / 60)
                        )}h
                        <td class="view-campaign">
                            <div class="campaign-buttons">
                                <a href="#">
                                    <div class="btn view-btn primary">View Campaign</div>
                                </a>
                                <div class="btn download-csv secondary">Download CSV</div>
                            </div>
                        </td>
                    </tr>`;

  tableBody.insertAdjacentHTML("beforeend", html);
});

//
//
// UPDATING THE TABLE
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
