<template>
  <div class="login">
    <form @submit.prevent>
      <div>
        <label for="email">メールアドレス:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit" @click="login">ログイン</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "@/firebase";

export default defineComponent({
  setup() {
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        router.push("/");
      } catch (e) {
        console.log(e.code, e.message);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>
