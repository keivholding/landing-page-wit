//
//
// INPUT FIELD CHANGES COLOR ON HOME PAGE (AS USER TYPES)
//
//

const emailInputHomepage = document.querySelector(".input-homepage");

emailInputHomepage.addEventListener("input", function (e) {
  // if there's an empty value, then the color is gray, if not (user types --> get gradient)
  e.target.value === ""
    ? emailInputHomepage.classList.remove("gradient-darker")
    : emailInputHomepage.classList.add("gradient-darker");
});

//
//
// INPUT FIELD CHANGES COLOR ON HOME PAGE (AS USER TYPES)
//
//

// TESTING

document.addEventListener("DOMContentLoaded", function () {
  const googleAuthButton = document.getElementById("google-auth-button");

  googleAuthButton.addEventListener("click", function handleAuth() {
    fetch("https://3973-208-118-225-163.ngrok.io/api/googleGetAuthUrl", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const { authUrl } = data;
        window.location.href = authUrl;
      })
      .catch((error) => {
        console.error("Error fetching Google auth URL:", error);
      });
  });
});

// TESTING
