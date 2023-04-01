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
