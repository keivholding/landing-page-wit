const emailTemplates = document.querySelectorAll(".email-template");

//
//
// THIS ADDS AND EVENT LISTENER TO THE EMAIL TEMPLATES FOR THE EDIT AND APPROVE BUTTONS
//
//

emailTemplates.forEach((email) => {
  email.addEventListener("click", function (e) {
    const clicked = e.target;
    // if the edit email button is clicked, then the tab opens / closes
    if (clicked.classList.contains("edit-email")) {
      openCloseTabs(clicked);
      // else if the approve email button is clicked, the the email is markeed approved / removed as approved
    } else if (clicked.classList.contains("approve-email")) {
      approveFunc(clicked);
    }
  });
});

//
//
// THIS ADDS AND EVENT LISTENER TO THE EMAIL TEMPLATES FOR THE EDIT AND APPROVE BUTTONS
//
//

//
//
// THIS FUNCTION OPENS AND CLOSES THE EMAIL TABS //
//
//

const openCloseTabs = function (clicked) {
  // clicked the button that is clicked (contains edit-email class) as a class

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
  const subject = emailTemplate.querySelector(".subject-email");
  const body = emailTemplate.querySelector(".body-email");

  divider.classList.toggle("open");
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

const approveFunc = function (e) {
  const clicked = e.target;
  const emailTemplate = clicked.closest(".email-template");

  emailTemplate.dataset.approved = "true";
  clicked.textContent = "Email Approved";

  canLaunchCampaign();
};

//
//
// THIS FUNCTION MANIPULATES WHAT HAPPENS WHEN APPROVE EMAIL IS CLICKED //
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
      approveText.innerHTML = `You still need to approve <span>${totalEmails}</span> email before launching the campaign!`;
      break;
    default:
      approveText.innerHTML = `You still need to approve <span>${totalEmails}</span> emails before launching the campaign!`;
  }
};

// Need to call it on load to immediately display the text content
canLaunchCampaign();

//
//
// THIS FUNCTION UPDATES THE TEXT AT THE BOTTOM OF THE SCREEN (HOW MANY EMAILS TO APPROVE) //
//
//
