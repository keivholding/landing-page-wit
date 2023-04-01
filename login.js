function getTokensFromUrl() {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");

  if (accessToken && refreshToken) {
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    localStorage.setItem("witSMAccessToken", accessToken);
    localStorage.setItem("witSMRefreshToken", refreshToken);
  } else {
    console.error("Access token or refresh token is missing in the URL.");
  }
}

const accessToken = getTokensFromUrl();

const url = "https://salesmachine.vercel.app/api/getCampaigns";
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ accessToken }),
})
  .then((response) => response.json())
  .then((data) => console.log({ data }));
