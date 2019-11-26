import { BASE_URL, axios } from "./config";
const url = BASE_URL;

type provider = "twitter" | "google";

async function login(provider: provider = "twitter") {
  // location.href = `${url}/auth/${provider}`;
  try {
    const { data } = await axios.get(`${url}/auth/${provider}`);
    return data;
  } catch (error) {
    const { status, statusText } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    return null;
  }
}

async function logout() {
  try {
    const { data } = await axios.get(`${url}/auth/logout`);
    return data;
  } catch (error) {
    const { status, statusText } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    return null;
  }
}

/**
 * ログインされているかの判定 true : false
 * ネートワークエラーもfalse
 */
async function isLogin(): Promise<boolean> {
  try {
    await axios.get(`${url}/users/me`);
    return true;
  } catch (error) {
    console.log(
      `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
    );
    return false;
  }
}

export { login, logout, isLogin };
