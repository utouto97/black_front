<template>
  <div class="room">
    <h3 class="font-bold text-xl my-4">{{ room.name }}</h3>
    <form @submit.prevent>
      <input
        type="text"
        v-model="message"
        class="
          border
          text-gray-700
          py-2
          px-2
          mx-2
          rounded-lg
          focus:outline-none
          focus:border-blue-500
        "
      />
      <button
        type="submit"
        @click="sendMessage"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
        "
      >
        送信
      </button>
    </form>
    <div class="w-80 mx-auto my-4">
      <div v-for="m in messages" :key="m.id">
        <div class="ml-8 mt-2" v-if="m.user_id == 1">
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import { defineComponent, onMounted, reactive, ref } from "vue";
// import { useApi } from "@/common/api";
// import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
  //   const auth = useAuth();
  //   const api = useApi(auth.state.token);

  //   const room = reactive({
  //     uid: "",
  //     name: "",
  //   });

  //   const messages = ref([]);
  //   const message = ref("");

  //   onMounted(async () => {
  //     room.uid = useRoute().params.id;
  //     const result = await api.get(`/api/v1/room/${room.uid}`);
  //     room.name = result.data.room.name;
  //     getMessages();
  //     setInterval(() => getMessages(), 1000);
  //   });

  //   const sendMessage = async () => {
  //     console.log(message.value);
  //     const result = await api.post(`/api/v1/room/${room.uid}/message`, {
  //       content: message.value,
  //     });
  //     console.log(result);
  //     message.value = "";
  //     getMessages();
  //   };

  //   const getMessages = async () => {
  //     const result = await api.get(`/api/v1/room/${room.uid}/message`, {
  //       params: {
  //         lim: 50,
  //       },
  //     });
  //     messages.value = [...new Set(result.data.messages)];
  //   };

  //   const monthName = [
  //     "Jan.",
  //     "Feb.",
  //     "Mar.",
  //     "Apr.",
  //     "May",
  //     "Jun.",
  //     "Jul.",
  //     "Aug.",
  //     "Sep.",
  //     "Oct.",
  //     "Nov.",
  //     "Dec.",
  //   ];

  //   const showDateFormat = (date) => {
  //     return (
  //       monthName[date.getMonth()] +
  //       " " +
  //       ("0" + date.getDate()).slice(-2) +
  //       " " +
  //       ("0" + date.getHours()).slice(-2) +
  //       ":" +
  //       ("0" + date.getMinutes()).slice(-2)
  //     );
  //   };

  //   return {
  //     room,
  //     messages,
  //     message,
  //     sendMessage,
  //     showDateFormat,
  //   };
  },
});
</script>

