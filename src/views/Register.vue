<template>
  <div class="w-full">
    <form @submit.prevent class="px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
        <input type="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div class="mt-1 text-red-500 text-sm">{{ error_email }}</div>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
        <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div class="mt-1 text-red-500 text-sm">{{ error_password }}</div>
      </div>
      <div class="mb-4">
        <label for="password_confirm" class="block text-gray-700 text-sm font-bold mb-2">パスワード確認</label>
        <input type="password" v-model="password_confirm" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div class="mt-1 text-red-500 text-sm">{{ error_password_confirm }}</div>
      </div>
      <div class="mb-6">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">ユーザーネーム</label>
        <input type="username" v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div class="mt-1 text-red-500 text-sm">{{ error_username }}</div>
      </div>
      <div class="flex items-center justify-center">
        <button type="submit" @click="doRegister" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">登録</button>
      </div>
      <div class="flex items-center justify-center mt-4">
        <router-link to="/login" class="px-4 py-2 rounded text-gray-600 hover:text-white hover:bg-gray-400">ログイン画面に戻る</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { register, token } = useFirebaseAuth();

    const email = ref("");
    const password = ref("");
    const password_confirm = ref("");
    const username = ref("");

    const error_email = ref("");
    const error_password = ref("");
    const error_password_confirm = ref("");
    const error_username = ref("");

    const doRegister = async () => {
      var error = false;

      const reg_email = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
      if (!reg_email.test(email.value)) {
        error = true;
        error_email.value = "メールアドレスの形式が正しくありません。";
      }

      const reg_password = /^[a-z\d]{8,30}$/i;
      if (!reg_password.test(password.value)) {
        error = true;
        error_password.value = "パスワードの形式が正しくありません。";
      }

      if (password.value != password_confirm.value) {
        error = true;
        error_password_confirm.value = "パスワードが一致していません。";
      }

      const reg_username = /^[A-Za-z0-9]{1,30}$/;
      if (!reg_username.test(username.value)) {
        error = true;
        error_username.value = "ユーザーネームは、1文字以上30文字以下の英数字にしてください。";
      }

      if (error) return;

      console.log(token.value);
      await register(email.value, password.value);
      await getApi(token.value).post("/api/v1/user", {
        user: {
          username: username.value
        }
      });
      router.push("/");
    };

    return {
      email,
      password,
      password_confirm,
      username,
      error_email,
      error_password,
      error_password_confirm,
      error_username,
      doRegister,
    };
  },
});
</script>
