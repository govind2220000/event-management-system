const API_URL = "http://localhost:5000"; // Change if needed

export async function apiRequest(endpoint, method = "GET", data, token) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) options.headers["Authorization"] = "Bearer " + token;
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(API_URL + endpoint, options);
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "API error");
  return result;
} 