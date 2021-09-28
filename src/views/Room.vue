<template>
  <div class="room">
    <h2 class="font-bold text-xl my-4">{{ room.name }}</h2>
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
import { useRoute } from "vue-router";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";
import Navbar from "@/components/Navbar";

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    console.log(route.params.id);

    const { getToken } = useFirebaseAuth();

    const user_id = ref(-1);
    const room = reactive({
      uid: "",
      name: "",
    });
    const message = ref("");
    const messages = ref([]);

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

    return {
      user_id,
      room,
      message,
      messages,
      sendMessage,
      showDateFormat,
    };
  },
});
</script>

