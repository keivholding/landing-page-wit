const loginBox = document.querySelector(".login-box");
const googleBtn = document.querySelector(".google");
const microsoftBtn = document.querySelector(".microsoft");

loginBox.addEventListener("click", function (e) {
  const clicked = e.target.closest(".social-buttons");

  if (!clicked) return;

  const provider = clicked.value;

  const url = "https://sales-machine.vercel.app/api/signin/" + provider;

  fetch(url, {
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
    .then((data) => {
      console.log(data.signinRedirectUrl);
      window.location.href = data.signinRedirectUrl;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
