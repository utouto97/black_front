<template>
  <div class="w-full">
    <h2 class="mb-2 text-lg font-bold">ルーム作成</h2>
    <form @submit.prevent class="px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">ルーム名</label>
        <input type="text" v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">パスワード (空欄でパスワードなし)</label>
        <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="flex items-center justify-center">
        <button type="submit" @click="createRoom" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">作成</button>
      </div>
    </form>
    <Navbar />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
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

    const name = ref("");
    const password = ref("");

    const createRoom = async () => {
      const res = await getApi(token.value).post("/api/v1/room/", {
        room: {
          name: name.value,
          password: password.value
        }
      });
      const uid = res.data.room.uid;

      await getApi(token.value).post(`/api/v1/user/room/${uid}`, {
        password: password.value
      });

      alert(name.value+"を作成し、入室しました。");
      router.push("/");
    };

    return {
      name,
      password,
      createRoom,
    };
  },
});
</script>
