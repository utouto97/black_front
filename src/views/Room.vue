<template>
  <div class="room">
    <h3>{{ room.name }}</h3>
    <table
      style="
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
      "
    >
      <tr v-for="m in messages" :key="m.id">
        <td>{{ showDateFormat(new Date(m.created_at)) }}</td>
        <td>{{ m.username }}</td>
        <td>{{ m.content }}</td>
      </tr>
    </table>
    <form @submit.prevent>
      <input type="message" v-model="message" />
      <button type="submit" @click="sendMessage">送信</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAuth } from "@/common/auth";
import { useApi } from "@/common/api";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const auth = useAuth();
    const api = useApi(auth.state.token);

    const room = reactive({
      uid: "",
      name: "",
    });

    const messages = ref([]);
    const message = ref("");

    onMounted(async () => {
      room.uid = useRoute().params.id;
      const result = await api.get(`/api/v1/room/${room.uid}`);
      room.name = result.data.room.name;
      getMessages();
    });

    const sendMessage = async () => {
      console.log(message.value);
      const result = await api.post(`/api/v1/room/${room.uid}/message`, {
        content: message.value,
      });
      console.log(result);
    };

    const getMessages = async () => {
      const result = await api.get(`/api/v1/room/${room.uid}/message`);
      messages.value = result.data.messages;
      console.log(result);
    };

    const showDateFormat = (date) => {
      return (
        date.getMonth() +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    };

    return {
      room,
      messages,
      message,
      sendMessage,
      showDateFormat,
    };
  },
});
</script>

