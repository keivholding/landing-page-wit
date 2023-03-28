const emailTemplates = document.querySelectorAll(".email-template");

//
//
// THIS ADDS AND EVENT LISTENER TO THE EMAIL TEMPLATES FOR THE VIEW, APPROVE, AND EDIT BUTTONS
//
//

emailTemplates.forEach((email) => {
  email.addEventListener("click", function (e) {
    const clicked = e.target;
    // if the edit email button is clicked, then the tab opens / closes
    if (clicked.classList.contains("view-email")) {
      openCloseTabs(clicked);
      // else if the approve email button is clicked, the the email is marked approved / removed as approved
    } else if (clicked.classList.contains("approve-email")) {
      approveEmail(clicked);
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
    emailTemplate.style.minHeight = `${emailHeight + 125}px`;
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

const editEmail = function (clicked) {
  // this selects the parent element
  const emailTemplate = clicked.closest(".email-template");
  const subjectText = emailTemplate.querySelector(".subject-text").innerText;
  const bodyText = emailTemplate.querySelector(".body-text").innerText;
};

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
const goBackBtn = document.querySelector(".go-back");
const closeXBtn = document.querySelector(".close-modal");

// shows the popup
const showModal = function () {
  modal.classList.add("show");
};

// closes the popup
const closeModal = function () {
  modal.classList.remove("show");
};

launchCampaignBtn.addEventListener("click", showModal);
goBackBtn.addEventListener("click", closeModal);
closeXBtn.addEventListener("click", closeModal);

// closes popup when escape is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

//
//
// WHEN LAUNCH CAMPAIGN IS CLICKED
//
//
