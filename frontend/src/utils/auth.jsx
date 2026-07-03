const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

const handleResponse = (res) => {
  if (!res.ok) {
    return res
      .json()
      .catch(() => {
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((errData) => {
        return Promise.reject(errData.message || `Error: ${res.status}`);
      });
  }
  return res.json();
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
