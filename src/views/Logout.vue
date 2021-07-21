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
      try {
        await firebase.auth().signOut();
        console.log("ログアウトしました");
        router.push("/login");
      } catch (e) {
        console.log("ログアウトエラー : " + e);
      }
    };

    return {
      logout,
    };
  },
});
</script>
