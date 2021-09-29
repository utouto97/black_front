<template>
  <div class="room">
    <div class="font-bold text-xl my-4">
      {{ room.name }}
      <button @click="roomname_edit = !roomname_edit" class="h-8 w-8 py-1 px-1 mx-auto inline text-center rounded-full hover:bg-gray-700 hover:text-white text-gray-700">
        <svg class="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg>
      </button>
      <button @click="leaveRoom" class="ml-2 py-1 px-2 text-xs text-gray-500 rounded hover:text-white hover:bg-gray-500">
        退室
      </button>
      <div v-if="roomname_edit" class="w-full mt-2 px-4 flex">
        <p class="flex-1 text-xs">変更後</p>
        <input
          type="text"
          v-model="roomname"
          class="flex-auto border text-gray-700 py-2 px-2 mx-2 rounded-lg focus:outline-none focus:border-blue-500" />
        <button
          type="submit"
          @click="changeRoomname"
          class="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">変更</button>
      </div>
    </div>
    <form @submit.prevent>
      <input
        type="text"
        v-model="message"
        class="border text-gray-700 py-2 px-2 mx-2 rounded-lg focus:outline-none focus:border-blue-500" />
      <button
        type="submit"
        @click="sendMessage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">送信</button>
    </form>
    <div class="w-80 mx-auto my-4">
      <div v-for="m in messages" :key="m.id">
        <div class="ml-8 mt-2" v-if="m.user_id == user_id">
          <div class="text-left bg-blue-200 rounded-lg py-2 px-4">
            {{ m.content }}
          </div>
          <div class="text-xs text-right pr-2">
            {{ showDateFormat(new Date(m.created_at)) }}
          </div>
        </div>
        <div class="mr-8 mt-1" v-else>
          <div class="text-xs text-left pl-2">{{ m.username }}</div>
          <div class="text-left bg-gray-200 rounded-lg py-2 px-4">
            {{ m.content }}
          </div>
          <div class="text-xs text-right pr-2">
            {{ showDateFormat(new Date(m.created_at)) }}
          </div>
        </div>
      </div>
    </div>
    <Navbar />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";
import Navbar from "@/components/Navbar";

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // console.log(route.params.id);

    const { getToken } = useFirebaseAuth();

    const user_id = ref(-1);
    const room = reactive({
      uid: "",
      name: "",
    });
    const message = ref("");
    const messages = ref([]);
    const roomname_edit = ref(false);
    const roomname = ref("");

    onMounted(async () => {
      const user_info = await getApi(await getToken()).get("/api/v1/user");
      user_id.value = user_info.data.user.id;
      room.uid = route.params.id;
      const res = await getApi(await getToken()).get(`/api/v1/room/${room.uid}`);
      room.name = res.data.room.name;
      getMessages();
    });

    const sendMessage = async () => {
      await getApi(await getToken()).post(`/api/v1/room/${room.uid}/message`, {
        content: message.value,
      });
      message.value = "";
      getMessages();
    };

    const getMessages = async () => {
      const res = await getApi(await getToken()).get(`/api/v1/room/${room.uid}/message`, {
        params: {
          lim: 50,
        },
      });
      messages.value = res.data.messages;
    };

    const monthName = [
      "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
      "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
    ];

    const showDateFormat = (date) => {
      return (
        monthName[date.getMonth()] +
        " " +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2)
      );
    };

    const changeRoomname = async () => {
      // console.log(roomname.value);
      await getApi(await getToken()).patch(`/api/v1/room/${room.uid}`, {
        room: {
          name: roomname.value
        }
      });

      alert("ルーム名を"+roomname.value+"に変更しました。");
      router.go({ path: router.currentRoute.path, force: true });
    };

    const leaveRoom = async () => {
      await getApi(await getToken()).delete(`/api/v1/user/room/${room.uid}`);
      alert("このルームを退室しました。");
      router.push("/")
    };

    return {
      user_id,
      room,
      message,
      messages,
      roomname_edit,
      roomname,
      sendMessage,
      showDateFormat,
      changeRoomname,
      leaveRoom,
    };
  },
});
</script>

