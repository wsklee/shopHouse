import { setCredentials } from "../store/authSlice";
import store from "../store/store";

const JWT_EXPIRY_TIME = 5 * 60 * 1000; // in ms

export async function onLogin(loginInfo, headers = {}) {
  const url = "http://localhost:8080/auth/login";
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(loginInfo),
  };

  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    onLoginSuccess(data);
    return data;
  } else {
    throw Error(data);
  }
}

export async function onReissue() {
  const url = "http://localhost:8080/auth/reissue";
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (res.ok) {
    onLoginSuccess(data);
  } else {
    console.error("Not logged in");
    // set accessToken in store
    store.dispatch(setCredentials({ accessToken: null }));
  }
}

export async function onLoginSuccess(response) {
  const newAccessToken = response.accessToken;
  // set accessToken in store
  store.dispatch(setCredentials({ accessToken: newAccessToken }));

  // silent-refresh accessToken 1 min before expiry
  setTimeout(onReissue, JWT_EXPIRY_TIME - 60000);
}
