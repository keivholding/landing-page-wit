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
// this gets the accesstoken / refresh token and stores it in the user's local storage
//
//

function getTokensFromUrl() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const provider = searchParams.get("provider");

  if (accessToken && refreshToken) {
    localStorage.setItem("witSMAccessToken", accessToken);
    localStorage.setItem("witSMRefreshToken", refreshToken);
    localStorage.setItem("witSMProvider", provider);
  }
}

getTokensFromUrl();

//
//
// this gets the accesstoken / refresh token and stores it in the user's local storage
//
//
