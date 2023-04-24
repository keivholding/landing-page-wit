// grabs the campaign ID from the URL
function campaignIdUrl() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  const campaignID = searchParams.get("campaignID");

  return campaignID;
}

const campaignID = campaignIdUrl();

// Get Templates
fetch(`https://sales-machine.vercel.app/api/templates/get`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    accessToken: localStorage.getItem("witSMAccessToken"),
    refreshToken: localStorage.getItem("witSMRefreshToken"),
    campaignID: campaignID,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.data === "login-redirect-user") {
      window.location.href = "https://salesmachineai.io/login-page.html";
    } else {
      console.log(data);
      showTemplates(data.data);
    }
  });

const showTemplates = function (templates) {
  //
  //
  // SHOWING THE EMAIL TEMPLATES
  //
  //

  console.log(templates);
  const insertEmails = document.querySelector(".emails-entered-here");

  templates.forEach((template) => {
    const html = `<div class="warning-and-email">
    <div class="email-template" data-approved="false" data-campaign-id="${template.campaign_id}" data-template-id="${template.id}">
                <div class="email-description">
                    <div class="email-left header-text">Style: <span class="gradient style-data">${template.style}</span></div>
                    <div class="email-right">
                        <!-- <div class="email-recipients paragraph-text">1 recipient</div> -->
                        <button class="btn secondary view-email closed paragraph-text">View Email</button>
                        <button class="btn primary approve-email paragraph-text">Approve Email</button>
                        <button class="btn primary reject-email paragraph-text">Reject Email</button>
                      </div>

                        <div class="are-you-sure">

                          <div class="confirm-container">
                            <i class="fa fa-check you-sure yes" aria-hidden="true"></i>
                            <p class="paragraph-text">Confirm</p>
                          </div>

                          <div class="confirm-container">
                            <i class="fa fa-times you-sure no" aria-hidden="true"></i>
                            <p class="paragraph-text">Go Back</p>
                          </div>

                        </div>
                </div>

                <div class="divider-email"></div>
                <button class="btn paragraph-text edit-email-btn">Edit Email</button>

                <div class="email">
                    <div class="subject-email header-text">
                        <div class="email-header header-text">Subject:</div>
                        <div class="subject-text paragraph-text">${template.subject}
                        </div>
                    </div>

                    <div class="body-email">
                        <div class="email-header header-text">Body:</div>
                        <div class="body-text paragraph-text">${template.body}
                        </div>
                    </div>
                </div>
            </div>
              <p class="paragraph-text warning">*<span>Make sure</span> this email template has these variables: <span>[contact name]</span>, <span>[meeting link]</span>, <span>[your company name]</span>, <span>[reason to outreach]</span>. Any misspelled variables will not update correctly.*
                </p>
                </div>`;

    insertEmails.insertAdjacentHTML("afterbegin", html);
  });

  //
  //
  // SHOWING THE EMAIL TEMPLATES
  //
  //

  //
  //
  // EDIT CAMPAIGN NAME
  //
  //

  const popupEditCampaignName = document.querySelector(
    ".popup.edit-campaign-name"
  );
  const editCampaignBtn = document.querySelector(".edit-btn.campaign");
  const campaignNameTemplate = document.querySelector(".campaign-name");
  const campaignNameEdit = document.querySelector(".campaign-input");
  const saveChangesCampaignBtn = document.querySelector(
    ".save-changes.campaign"
  );
  const goBackCampaignBtn = document.querySelector(".go-back.campaign");
  const closeXCampaignBtn = document.querySelector(".close-modal-campaign");

  // Displays the campaign name
  campaignNameTemplate.innerText = templates[0].campaigns.name;

  // Edit campaign function
  editCampaignBtn.addEventListener("click", function () {
    campaignNameEdit.value = campaignNameTemplate.innerText;

    popupEditCampaignName.classList.add("show");
    blurryBackground.classList.add("show");

    // when save changes is clicked, the campaign name and backend are updated
    saveChangesCampaignBtn.addEventListener("click", function () {
      campaignNameTemplate.innerText = campaignNameEdit.value;
      closeEditCampaign();

      //update backend when the campaign name is changed and saved
      const url = "https://sales-machine.vercel.app/api/campaigns/upsertName";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: localStorage.getItem("witSMAccessToken"),
          campaignID: campaignID,
          campaignName: campaignNameEdit.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data === "login-redirect-user") {
            window.location.href = "https://salesmachineai.io/login-page.html";
          }
        });
    });
  });

  const closeEditCampaign = function () {
    popupEditCampaignName.classList.remove("show");
    blurryBackground.classList.remove("show");
  };

  goBackCampaignBtn.addEventListener("click", closeEditCampaign);
  closeXCampaignBtn.addEventListener("click", closeEditCampaign);

  //
  //
  // EDIT CAMPAIGN NAME
  //
  //

  // These elements are used throughout the file below
  const emailTemplates = document.querySelectorAll(".email-template");
  const blurryBackground = document.querySelector(".blurry-background");
  // These elements are used throughout the file below

  //
  //
  // THIS ADDS AND EVENT LISTENER TO THE EMAIL TEMPLATES FOR THE VIEW, APPROVE, AND EDIT BUTTONS
  //
  //

  emailTemplates.forEach((email) => {
    email.addEventListener("click", function (e) {
      const clicked = e.target;
      // if the view email button is clicked, then the tab opens / closes
      if (clicked.classList.contains("view-email")) {
        openCloseTabs(clicked);
        // else if the approve email button is clicked, then the email is marked approved / removed as approved
      } else if (clicked.classList.contains("approve-email")) {
        approveEmail(clicked);
        // else if the edit email button is clicked, then the edit email popup occurs
      } else if (clicked.classList.contains("edit-email-btn")) {
        editEmail(clicked);
      }
    });
  });

  //
  //
  // THIS ADDS AND EVENT LISTENER TO THE EMAIL TEMPLATES FOR THE VIEW, APPROVE, AND EDIT BUTTONS
  //
  //

  //
  //
  // THIS FUNCTION OPENS AND CLOSES THE EMAIL TABS //
  //
  //

  const openCloseTabs = function (clicked) {
    // clicked is the button that is clicked (contains view-email class) as a class

    // emailTemplate is the closest parent with the div class .email-template. We then use this to find all of the children
    const emailTemplate = clicked.closest(".email-template");

    // emailHeight is the body of the email --> is the height of the email. We use this to tell emailtemplate how much it needs to grow
    const emailHeight = emailTemplate
      .querySelector(".email")
      .getBoundingClientRect().height;

    // if the tab is closed, the then tab opens, else there's a delay and then it closes
    if (clicked.classList.contains("closed")) {
      emailTemplate.style.minHeight = `${emailHeight + 120}px`;
      clicked.textContent = "Close Email";
    } else {
      setTimeout(() => {
        emailTemplate.style.minHeight = "100px";
      }, 300);
      clicked.textContent = "View Email";
    }

    // these elements are are for toggling the divider, subject, and body of the email -- show and hides
    const divider = emailTemplate.querySelector(".divider-email");
    const editEmailBtn = emailTemplate.querySelector(".edit-email-btn");
    const subject = emailTemplate.querySelector(".subject-email");
    const body = emailTemplate.querySelector(".body-email");

    emailTemplate.classList.toggle("open");
    divider.classList.toggle("open");
    editEmailBtn.classList.toggle("open");
    subject.classList.toggle("open");
    body.classList.toggle("open");
    clicked.classList.toggle("closed");
  };

  //
  //
  // THIS FUNCTION OPENS AND CLOSES THE EMAIL TABS //
  //
  //

  //
  //
  // THIS FUNCTION MANIPULATES WHAT HAPPENS WHEN APPROVE EMAIL IS CLICKED //
  //
  //

  const approveEmail = function (clicked) {
    // this selects the parent element
    const emailTemplate = clicked.closest(".email-template");
    // this selects the sibling view-email button and makes it disabled (user can't click it to edit email)
    const siblingEditEmail = emailTemplate.querySelector(".view-email");
    siblingEditEmail.classList.toggle("disabled");

    // This toggles back and forth when the email approved button is clicked again
    if (emailTemplate.dataset.approved === "true") {
      emailTemplate.dataset.approved = "false";
      clicked.textContent = "Approve Email";
    } else {
      emailTemplate.dataset.approved = "true";
      clicked.textContent = "Email Approved";
    }

    // If the email template is open, then we are passing in the sibling edit email button as if it was clicked (so the tab will close)
    if (emailTemplate.classList.contains("open")) {
      openCloseTabs(siblingEditEmail);
    }

    canLaunchCampaign();

    const templateID = emailTemplate.dataset.templateId;
    const subjectText = emailTemplate.querySelector(".subject-text").innerHTML;
    const bodyText = emailTemplate.querySelector(".body-text").innerHTML;
    const style = emailTemplate.querySelector(".style-data").innerHTML;

    myObj = {
      templateID: templateID,
      subjectText: subjectText,
      bodyText: bodyText,
      style: style,
    };

    updateTemplates(myObj, false);
  };

  //
  //
  // THIS FUNCTION MANIPULATES WHAT HAPPENS WHEN APPROVE EMAIL IS CLICKED //
  //
  //

  //
  //
  // EDITING EMAIL FUNCTION
  //
  //

  const popupEditEmail = document.querySelector(".popup.edit-email");
  const subjectTextEdit = document.querySelector(".subject-input");
  const bodyTextEdit = document.querySelector(".body-textarea");
  const goBackEditBtn = document.querySelector(".go-back.edit");
  const closeXEditBtn = document.querySelector(".close-modal-edit");
  const saveChangesBtn = document.querySelector(".save-changes.edit");

  const editEmail = function (clicked) {
    // this selects the parent element
    const emailTemplate = clicked.closest(".email-template");
    const subjectTextTemplate = emailTemplate.querySelector(".subject-text");
    const bodyTextTemplate = emailTemplate.querySelector(".body-text");
    const style = emailTemplate.querySelector(".style-data");
    const campaignID = emailTemplate.dataset.campaignId;
    const templateID = emailTemplate.dataset.templateId;

    subjectTextEdit.value = subjectTextTemplate.innerText;
    bodyTextEdit.value = bodyTextTemplate.innerText;
    bodyTextEdit.style.height = `${bodyTextEdit.scrollHeight}px`;

    popupEditEmail.classList.add("show");
    blurryBackground.classList.add("show");

    // this event listener makes it so that when save changes is clicked at the bottom, the tempalte text is automatically updated to what the edit text was changed to. it also closes the popup and closes the tab
    const saveChanges = function () {
      subjectTextTemplate.innerText = subjectTextEdit.value;
      bodyTextTemplate.innerText = bodyTextEdit.value;

      closeEditEmail();

      // emailHeight is the body of the email --> is the height of the email. We use this to tell emailtemplate how much it needs to grow
      const emailHeight = emailTemplate
        .querySelector(".email")
        .getBoundingClientRect().height;

      // recalculates the height of the email
      emailTemplate.style.minHeight = `${emailHeight + 120}px`;

      // Update Backend when email is edited and saved
      const url = "https://sales-machine.vercel.app/api/templates/upsert";
      const data = {
        subject: subjectTextEdit.value,
        body: bodyTextEdit.value,
        style: style.innerText,
        campaignID: campaignID,
        templateID: templateID,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: localStorage.getItem("witSMAccessToken"),
          data,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      saveChangesBtn.removeEventListener("click", saveChanges);
    };

    saveChangesBtn.addEventListener("click", saveChanges);
  };

  // this function closes the popup
  const closeEditEmail = function () {
    popupEditEmail.classList.remove("show");
    blurryBackground.classList.remove("show");

    // Needs to be added as it "resets those values" --> otherwise bug
    setTimeout(() => {
      subjectTextEdit.value = "";
      bodyTextEdit.textContent = "";
      bodyTextEdit.style.height = "0px";
    }, 500);
  };

  goBackEditBtn.addEventListener("click", closeEditEmail);
  closeXEditBtn.addEventListener("click", closeEditEmail);

  // this recalculates the height of the textarea when a change occurs
  bodyTextEdit.addEventListener("input", function () {
    // auto is needed because it 'collapses' the textarea and sort of resets it so we can properly calculate scrollHeight ('0') would also work
    bodyTextEdit.style.height = "auto";
    bodyTextEdit.style.height = `${bodyTextEdit.scrollHeight}px`;
  });

  //
  //
  // EDITING EMAIL FUNCTION
  //
  //

  //
  //
  // THIS FUNCTION UPDATES THE TEXT AT THE BOTTOM OF THE SCREEN (HOW MANY EMAILS TO APPROVE) //
  //
  //

  const launchCampaignBtn = document.querySelector(".launch-campaign");
  const approveText = document.querySelector(".approval-left");

  const canLaunchCampaign = function () {
    const totalEmails = [...emailTemplates].filter(
      (email) => email.dataset.approved === "false"
    ).length;

    switch (totalEmails) {
      case 0:
        approveText.innerHTML = `You're ready to launch your campaign!`;
        launchCampaignBtn.classList.remove("disabled");
        break;
      case 1:
        approveText.innerHTML = `You still need to approve <span>${totalEmails}</span> email template before launching the campaign!`;
        // This needs to be added becuse without it, a user can approve all emails, then decide to go back and the disabled class needs to be added
        launchCampaignBtn.classList.add("disabled");
        break;
      default:
        approveText.innerHTML = `You still need to approve <span>${totalEmails}</span> email templates before launching the campaign!`;
    }
  };

  // Need to call it on load to immediately display the text content
  canLaunchCampaign();

  //
  //
  // THIS FUNCTION UPDATES THE TEXT AT THE BOTTOM OF THE SCREEN (HOW MANY EMAILS TO APPROVE) //
  //
  //

  //
  //
  // WHEN LAUNCH CAMPAIGN IS CLICKED
  //
  //

  const modal = document.querySelector(".popup.create-campaign");
  const closeXBtn = document.querySelector(".close-modal");
  const goBackBtn = document.querySelector(".go-back");

  // shows the popup
  const showModal = function () {
    modal.classList.add("show");
    blurryBackground.classList.add("show");
  };

  // closes the popup
  const closeModal = function () {
    modal.classList.remove("show");
    blurryBackground.classList.remove("show");
  };

  launchCampaignBtn.addEventListener("click", showModal);
  closeXBtn.addEventListener("click", closeModal);
  goBackBtn.addEventListener("click", closeModal);

  // closes popup when escape is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (modal.classList.contains("show")) {
        closeModal();
      }

      if (popupEditEmail.classList.contains("show")) {
        closeEditEmail();
      }

      if (popupEditCampaignName.classList.contains("show")) {
        closeEditCampaign();
      }
    }
  });

  //
  //
  // WHEN LAUNCH CAMPAIGN IS CLICKED (EMAILS SENT)
  //
  //

  const officialLaunchBtn = document.querySelector(".official-launch");

  // this sends the emails out
  officialLaunchBtn.addEventListener("click", function () {
    const contactsArr = [];

    document.querySelectorAll(".person-count li").forEach((contact) => {
      const name = contact.querySelector("#name").value;
      const title = contact.querySelector("#title").value;
      const email = contact.querySelector("#email").value;
      const reason = contact.querySelector("#reason").value;

      contactsArr.push({
        name: name,
        title: title,
        email: email,
        reason: reason,
      });
    });

    console.log(contactsArr);

    fetch(`https://sales-machine.vercel.app/api/createEmails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campaignID: campaignID,
        accessToken: localStorage.getItem("witSMAccessToken"),
        refreshToken: localStorage.getItem("witSMRefreshToken"),
        provider: localStorage.getItem("witSMProvider"),
        contacts: contactsArr,
      }),
    }).then(() =>
      window.location.replace(
        "https://keivholding.github.io/landing-page-wit/my-campaigns.html"
      )
    );
  });

  //
  //
  // WHEN LAUNCH CAMPAIGN IS CLICKED (EMAILS SENT)
  //
  //

  //
  //
  // DELETE TEMPLATE
  //
  //

  const rejectTemplateBtn = document.querySelectorAll(".reject-email");

  rejectTemplateBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      const template = btn.closest(".warning-and-email");
      const areYouSure = template.querySelector(".are-you-sure");

      btn.style.display = "none";
      areYouSure.style.display = "flex";

      areYouSure.addEventListener("click", function (e) {
        const clicked = e.target.closest(".you-sure");

        if (!clicked) return;

        if (clicked.classList.contains("yes")) {
          const templateID = template.dataset.templateId;
          const subjectText = template.querySelector(".subject-text").innerHTML;
          const bodyText = template.querySelector(".body-text").innerHTML;
          const style = template.querySelector(".style-data").innerHTML;

          const myObj = {
            templateID: templateID,
            subjectText: subjectText,
            bodyText: bodyText,
            style: style,
          };

          updateTemplates(myObj, true);

          template.style.display = "none";
        } else {
          areYouSure.style.display = "none";
          btn.style.display = "block";
        }
      });
    })
  );

  //
  //
  // DELETE TEMPLATE
  //
  //

  const updateTemplates = function (obj, deleteTemplate) {
    // Update Backend when email is edited and saved
    const url = "https://sales-machine.vercel.app/api/templates/upsert";
    const data = {
      subject: obj.subjectText,
      body: obj.bodyText,
      style: obj.style,
      campaignID: obj.campaignID,
      templateID: obj.templateID,
      isDeleted: deleteTemplate,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: localStorage.getItem("witSMAccessToken"),
        data,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

//
//
// MORE CONTACTS
//
//

const addMoreContactsBtn = document.querySelector(".add-more-contacts");
const contactList = document.querySelector(".person-count");

addMoreContactsBtn.addEventListener("click", function () {
  const html = `<li>
                            <div class="field subheader-text">
                                <label for="name">Name:</label>
                                <input class="contact paragraph-text" type="text" id="name" name="name" required>
                            </div>
                            <div class="field subheader-text">
                                <label for="email">Email:</label>
                                <input class="contact paragraph-text" type="email" id="email" name="email" required>
                            </div>
                            <div class="field subheader-text">
                                <label for="title">Title:</label>
                                <input class="contact paragraph-text" type="text" id="title" name="title" required>
                            </div>
                            <div class="field subheader-text">
                                <label for="reason">Reason why this person is good to email:</label>
                                <textarea class="contact paragraph-text" id="reason" name="reason" required></textarea>
                            </div>
                        </li>`;

  contactList.insertAdjacentHTML("beforeend", html);
});

//
//
// MORE CONTACTS
//
//
