<template>
  <div class="w-full">
    <h2 class="text-lg font-bold">ユーザーネーム変更</h2>
    <form @submit.prevent class="px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">変更前のユーザーネーム</label>
        <div class="text-lg">
          {{ username_old }}
        </div>
      </div>
      <div class="mb-6">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">変更後のユーザーネーム</label>
        <input type="username" v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <div class="mt-1 text-red-500 text-sm">{{ error_username }}</div>
      </div>
      <div class="flex items-center justify-center">
        <button type="submit" @click="changeUsername" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">変更</button>
      </div>
    </form>
    <Navbar />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";
import Navbar from "@/components/Navbar";

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const { token } = useFirebaseAuth();

    const username_old = ref("");
    const username = ref("");
    const error_username = ref("");

    onMounted(async () => {
      const user = await getApi(token.value).get("/api/v1/user");
      username_old.value = user.data.user.username;
    });

    const changeUsername = async () => {
      const reg_username = /^[A-Za-z0-9]{1,30}$/;
      if (!reg_username.test(username.value)) {
        error_username.value = "ユーザーネームは、1文字以上30文字以下の英数字にしてください。";
        return;
      }

      await getApi(token.value).patch("/api/v1/user", {
        user: {
          username: username.value
        }
      });

      alert("ユーザーネームを"+username.value+"に変更しました。");
      router.push("/");
    };

    return {
      username_old,
      username,
      error_username,
      changeUsername,
    };
  },
});
</script>
