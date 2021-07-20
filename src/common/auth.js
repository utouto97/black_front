import { reactive, readonly } from "vue";
import firebase from "@/firebase";

const state = reactive({
  initialized: false,
  user: null,
  token: null
});

export const useAuth = () => {
  const initializeAuth = async () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async u => {
        if (u) {
          state.user = u;
          state.token = await u.getIdToken();
        }
        state.initialized = true;
        resolve();
      });
    });
  };

  return {
    state: readonly(state),
    initializeAuth
  };
};
