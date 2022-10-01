import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACPmoxAt9e8m50mAcNE_seJWr1KV264ZU",
  authDomain: "twinte-feedback.firebaseapp.com",
  projectId: "twinte-feedback",
  storageBucket: "twinte-feedback.appspot.com",
  messagingSenderId: "506135788576",
  appId: "1:506135788576:web:e6e2df4eff16a20e8b9045",
};
firebase.initializeApp(firebaseConfig);

/**
 * firebase に screenshot の画像を送信し、返り値として画像にアクセスするための URL を受け取る。
 */
export const postScreenshot = async (
  screenshot: File | undefined,
  userId: string
) => {
  if (screenshot === undefined) {
    return "";
  } else {
    const storageRef = firebase.storage().ref();
    const now = new Date();
    const screenshotRef = storageRef.child(
      `screenshots/${userId}_${now.getTime()}`
    );
    await screenshotRef.put(screenshot);
    const screenshotUrl = await screenshotRef.getDownloadURL();
    return screenshotUrl;
  }
};
