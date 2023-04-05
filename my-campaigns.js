//
//
// GETS CAMPAIGN DATA FROM LOGGED IN ACCOUNT
//
//

const url = "https://sales-machine.vercel.app/api/getCampaigns";
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    accessToken: localStorage.getItem("witSMAccessToken"),
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.data === "login-redirect-user") {
      window.location.href = "http://www.example.com";
    } else {
      showCampaignsAndAnalytics(data.data);
    }
  });

//
//
// GETS CAMPAIGN DATA FROM LOGGED IN ACCOUNT
//
//

// this function is called when the data is finished loading (important to wrap everything below in this function)
const showCampaignsAndAnalytics = function (campaigns) {
  //
  //
  // UPDATING ACCOUNT ANALYTICS
  //
  //

  const emailsSent = document.querySelector(".number-analytics.emails-sent");
  const emailsOpened = document.querySelector(
    ".number-analytics.emails-opened"
  );
  const emailsResponded = document.querySelector(
    ".number-analytics.email-responses"
  );
  const meetingsBooked = document.querySelector(
    ".number-analytics.meetings-booked"
  );
  const sales = document.querySelector(".number-analytics.sales");
  const timeSaved = document.querySelector(".number-analytics.time-saved");
  const timeSavedPopup = document.querySelector(".time-saved-popup.number");

  let sent = 0;
  let opens = 0;
  let responses = 0;
  let meetings = 0;
  let salesGenerated = 0;
  let timeHour = 0;

  // loops through each campaign adding up all the data
  campaigns.forEach((campaign) => {
    sent += campaign.emails_sent;
    opens += campaign.emails_opened;
    responses += campaign.responses;
    meetings += campaign.meetings_booked;
    salesGenerated += campaign.sales;
    timeHour += Math.floor((campaign.emails_sent * 13.5) / 60);
  });

  // these update the account statistics
  emailsSent.textContent = sent;
  emailsOpened.textContent = opens;
  emailsResponded.textContent = responses;
  meetingsBooked.textContent = meetings;
  sales.textContent = salesGenerated;
  timeSaved.textContent = timeSavedPopup.textContent = `${getFormattedNumber(
    timeHour
  )}h`;

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

  // Default is the unarchived campaign view --> archive toggle
  const updateTable = function (unarchivedView = true) {
    // this toggles between the archived and unarchived tables
    const viewableTable = unarchivedView
      ? campaigns.filter((campaign) => campaign.archived === null)
      : campaigns.filter((campaign) => campaign.archived === true);

    viewableTable.forEach((campaign) => {
      const html = `<tr class="table-row" data-campaign-id="${campaign.id}">
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

    // adds show to each row (and makes the pop up) --> animation
    document.querySelectorAll(".table-row").forEach((row, index) => {
      setTimeout(() => {
        row.classList.add("show");
      }, 200 * index + 100);
    });
  };

  // Need to call from the get-go so you see the first table on page load
  updateTable();

  //
  //
  // UPDATING THE TABLE
  //
  //

  //
  //
  // WHEN ARCHIVE BUTTON IS CLICKED
  //
  //

  const archiveBtnView = document.querySelector(".archived");
  let toggle = true;

  // When the achived (showing table) is clicked --> top right of table
  archiveBtnView.addEventListener("click", function () {
    // Deselects the all checkbocx button when it is clicked
    selectAllCheckbox.checked = false;
    selectAllCheckbox.removeAttribute("checked");

    // this refreshes the table (deletes existing html)
    tableBody.innerHTML = "";

    // toggles whether we are showing the archive or unarchive
    toggle = !toggle;

    // Updates the archive text
    toggle
      ? (archiveBtnView.textContent = "View Archived Campaigns")
      : (archiveBtnView.textContent = "View Unarchived Campaigns");

    // this deletes the selectedArray selections
    selectedArray.splice(0, selectedArray.length);

    // makes it so that the to do buttons go away
    showToDoButtons();

    // toggles the view
    updateTable(toggle);
  });

  //
  //
  // WHEN ARCHIVE BUTTON IS CLICKED
  //
  //

  //
  //
  // CHECKBOX FUNCTION FOR THE TABLE
  //
  //

  const campaignTable = document.querySelector(".campaigns");
  const selectAllCheckbox = document.querySelector(".table-checkbox-all");
  const selectedArray = [];

  // this function makes it so that when we
  campaignTable.addEventListener("click", function (e) {
    // These need to be added here as the rows and checkboxes will change when the achrive button is clicked (so these will get updated)
    const allCampaignRows = document.querySelectorAll(".table-row");
    const allCheckboxes = document.querySelectorAll(".table-checkbox");

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
    if (length === 0) {
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

  //
  //
  // FILTERING THE CAMPAIGNS
  //
  //

  const filterType = document.querySelector(".filter-type");

  console.log(filterType);

  //
  //
  // FILTERING THE CAMPAIGNS
  //
  //
};

setInterval(() => {
  // check threads for new replies
  fetch(`https://sales-machine.vercel.app/api/checkThreads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: localStorage.getItem("witSMAccessToken"),
      refreshToken: localStorage.getItem("witSMRefreshToken"),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log({ data }));
}, 60000);
