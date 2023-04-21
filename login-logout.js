// Log out function //

const logInStuff = document.querySelectorAll(".log-in");
const logOutStuff = document.querySelectorAll(".log-out");
const logOutBtn = document.querySelector(".log-out-button");

if (localStorage.getItem("witSMAccessToken")) {
  logInStuff.forEach((item) => (item.style.display = "none"));
} else {
  logOutStuff.forEach((item) => (item.style.display = "none"));
}

logOutBtn.addEventListener("click", function () {
  localStorage.removeItem("witSMAccessToken");
  localStorage.removeItem("witSMRefreshToken");
  localStorage.removeItem("witSMProvider");
  window.location.href = "http://127.0.0.1:8080/";
});

// Log out function //

//
//
// REDIRECT TO LOG IN PAGE
//
//

const start = document.querySelector(".btn-start");

start.addEventListener("click", function () {
  const url = "https://sales-machine.vercel.app/api/signin/google";

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

//
//
// REDIRECT TO LOG IN PAGE
//
//

//
//
// this gets the accesstoken / refresh token and stores it in the user's local storage
//
//

function getTokensFromUrl() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (accessToken && refreshToken) {
    localStorage.setItem("witSMAccessToken", accessToken);
    localStorage.setItem("witSMRefreshToken", refreshToken);
  }
}

getTokensFromUrl();

//
//
// this gets the accesstoken / refresh token and stores it in the user's local storage
//
//
