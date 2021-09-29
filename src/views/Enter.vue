<template>
  <div class="login w-full">
    <form @submit.prevent class="px-8 pt-6 pb-8 mb-4">
      <div class="font-bold text-xl mb-4">
        ルーム名: {{ room.name }}
      </div>
      <div v-if="room.requirePassword" class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
        <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="mb-4 text-sm text-red-500">
        {{ error }}
      </div>
      <button type="submit" @click="enterRoom" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">入室</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { getToken } = useFirebaseAuth();

    const password = ref("");
    const room = reactive({
      uid: "",
      name: "",
      requirePassword: false,
    });
    const error = ref("");

    onMounted(async () => {
      room.uid = route.params.id;
      const res = await getApi(await getToken()).get(`/api/v1/room/${room.uid}`);
      room.name = res.data.room.name;
      room.requirePassword = res.data.room.require_password;
      console.log(room.requirePassword);
      console.log(room);
    });

    const enterRoom = async () => {
      try {
        await getApi(await getToken()).post(`/api/v1/user/room/${room.uid}`, {
          password: password.value,
        });

        alert(room.name+"に入室しました。");
        router.push({ name: 'Room', params: { id: room.uid } });
      } catch (e) {
        error.value = "入室エラーです。パスワード不一致の場合あり。";
      }
    };

    return {
      room,
      password,
      error,
      enterRoom,
    };
  },
});
</script>
