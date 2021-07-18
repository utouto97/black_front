import { ref } from "vue";
import firebase from "@/firebase";

export const user = ref(null);
export const token = ref(null);

firebase.auth().onAuthStateChanged(async u => {
  user.value = u;
  token.value = await u.getIdToken();
});

