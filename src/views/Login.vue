<template>
  <div class="login w-full">
    <form @submit.prevent class="px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
        <input type="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
        <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">新規登録</button>
        <button type="submit" @click="doLogin" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";

export default defineComponent({
  setup() {
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const { login } = useFirebaseAuth();

    const doLogin = async () => {
      await login(email.value, password.value);
      router.push("/");
    };

    return {
      email,
      password,
      doLogin,
    };
  },
});
</script>
