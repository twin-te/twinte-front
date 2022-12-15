import firebase from "firebase/app";
import "firebase/storage";
import { InternalServerError, NetworkError } from "~/domain/error";

const firebaseConfig = {
  apiKey: "AIzaSyACPmoxAt9e8m50mAcNE_seJWr1KV264ZU",
  authDomain: "twinte-feedback.firebaseapp.com",
  projectId: "twinte-feedback",
  storageBucket: "twinte-feedback.appspot.com",
  messagingSenderId: "506135788576",
  appId: "1:506135788576:web:e6e2df4eff16a20e8b9045",
};

// eslint-disable-next-line import/no-named-as-default-member
firebase.initializeApp(firebaseConfig);

export class Firebase {
  static #instance: Firebase | undefined;

  static getInstance(): Firebase {
    if (Firebase.#instance == undefined) Firebase.#instance = new Firebase();
    return Firebase.#instance;
  }

  /**
   * Save the screenshots to storage and return the url to access it.
   */
  async saveScreenshots(
    screenshots: File[],
    userId: string
  ): Promise<string[] | NetworkError | InternalServerError> {
    // eslint-disable-next-line import/no-named-as-default-member
    const storageRef = firebase.storage().ref();
    const now = new Date();

    return Promise.all(
      screenshots.map(async (screenshot, index) => {
        const screenshotRef = storageRef.child(
          `screenshots/${userId}_${now.getTime()}_${index}`
        );
        await screenshotRef.put(screenshot);
        return (await screenshotRef.getDownloadURL()) as string;
      })
    )
      .then((screenshotUrls) => {
        return screenshotUrls;
      })
      .catch(() => {
        return new InternalServerError("Failed to save screenshots.");
      });
  }
}
