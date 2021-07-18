import { ref } from "vue";
import firebase from "@/firebase";

export const user = ref(null);

firebase.auth().onAuthStateChanged(u => {
  user.value = u;
});

