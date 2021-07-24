<template>
  <div class="rooms">
    <div>部屋一覧</div>
    <div v-for="r in rooms" :key="r.id">
      <router-link v-bind:to="{ name: 'Room', params: { id: r.uid } }">
        {{ r.uid }} : {{ r.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useAuth } from "@/common/auth";
import { useApi } from "@/common/api";

export default defineComponent({
  setup() {
    const auth = useAuth();
    const api = useApi(auth.state.token);

    const rooms = ref([]);

    onMounted(async () => {
      const result = await api.get("/api/v1/user/room");
      rooms.value = result.data.rooms;
    });

    return {
      rooms,
    };
  },
});
</script>

