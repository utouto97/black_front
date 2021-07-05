<template>
  <button @click="logout">ログアウト</button>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import firebase from "@/firebase";

export default defineComponent({
  setup() {
    const router = useRouter();

    const logout = async () => {
      firebase.auth().onAuthStateChanged(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("ログアウトしました");
            router.push("/login");
          })
          .catch((error) => {
            console.log("ログアウトエラー : " + error);
          });
      });
    };

    return {
      logout,
    };
  },
});
</script>
