import { ref } from "vue";
import firebase from "@/firebase";

export const initialized = ref(false);
export const user = ref(null);
export const token = ref(null);

export function initializeAuth() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async u => {
      console.log(u);
      initialized.value = true;
      user.value = u;
      token.value = await u.getIdToken();
      resolve();
    });
  });
}

