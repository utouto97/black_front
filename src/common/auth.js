import { reactive, toRefs } from "vue";
import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
  });
}

const state = reactive({
  user: null,
  token: null,
  initialized: false,
});

export default function () {

  const authCheck = async () => {
    return new Promise((resolve) => {
      !state.initialized &&
        firebase.auth().onAuthStateChanged(async (u) => {
          if (u) {
            state.user = u;
            state.token = await u.getIdToken();
          } else {
            state.user = null;
            state.token = null;
          }

          state.initialized = true;
          resolve(true);
        });
    });
  };

  const register = async (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async u => {
        state.user = u.user;
        state.token = await u.user.getIdToken();
      });
  };

  const login = async (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async u => {
        state.user = u.user;
        state.token = await u.user.getIdToken();
      });
  };

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        state.user = null;
        state.token = null;
      })
  };

  return {
    ...toRefs(state),
    register,
    login,
    logout,
    authCheck,
  };
}
