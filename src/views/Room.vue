<template>
  <div class="room">
    <h3>{{ room.name }}</h3>
    <table>
      <tr v-for="m in messages" :key="m.id">
        <td>{{ showDateFormat(new Date(m.created_at)) }}</td>
        <td>{{ m.username }}</td>
        <td>{{ m.content }}</td>
      </tr>
    </table>
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

    onMounted(async () => {
      room.uid = useRoute().params.id;
      const result = await api.get(`/api/v1/room/${room.uid}`);
      room.name = result.data.room.name;
      getMessages();
    });

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
      showDateFormat,
    };
  },
});
</script>

