const emailTemplate = document.querySelectorAll(".email-template");

// this event listener opens the email tabs when view email is clicked
emailTemplate.forEach((email) => {
  email.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-email")) {
      // clicked the button that is clicked (contains edit-email class) as a class
      const clicked = e.target;

      // adding the class close to the button so we can use that to close the button later on. Also changing text to close email
      clicked.textContent = "Close email";

      // emailTemplate is the closest parent with the div class .email-template. We then use this to find all of the children
      const emailTemplate = clicked.closest(".email-template");

      // emailHeight is the body of the email --> is the height of the email. We use this to tell emailtemplate how much it needs to grow
      const emailHeight = emailTemplate
        .querySelector(".email")
        .getBoundingClientRect().height;

      // if the tab is closed, the then tab opens, else there's a delay and then it closes
      clicked.classList.contains("closed")
        ? (emailTemplate.style.minHeight = `${emailHeight + 125}px`)
        : setTimeout(() => {
            emailTemplate.style.minHeight = "100px";
          }, 300);

      // these elements are are for toggling the divider, subject, and body of the email -- show and hides
      const divider = emailTemplate.querySelector(".divider-email");
      const subject = emailTemplate.querySelector(".subject-email");
      const body = emailTemplate.querySelector(".body-email");

      divider.classList.toggle("open");
      subject.classList.toggle("open");
      body.classList.toggle("open");
      clicked.classList.toggle("closed");
    }
  });
});

const launchCampaignBtn = document.querySelector(".launch-campaign");
const approveText = document.querySelector(".approval-left");

const canLaunchCampaign = function () {
  const totalEmails = emailTemplate.filter((email) =>
    email.classList.contains("yes")
  );

  console.log(totalEmails);
  approveText.textContent = `You still need to approve ${totalEmails} emails`;
};

canLaunchCampaign();
