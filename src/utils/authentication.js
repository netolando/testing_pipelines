export const getAccessToken = async (licenseKey, email) => {
  const response = await fetch(
    "https://api-gateway.getnuvo.com/dp/api/v1/auth/access-token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        license_key: licenseKey,
        auth: {
          identifier: email,
          type: "USER",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const result = await response.json();
  console.log(result);

  if (result && result.data && result.data.access_token) {
    return result.data.access_token;
  } else {
    throw new Error("Access token not found in response");
  }
};
