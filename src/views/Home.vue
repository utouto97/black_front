<template>
  <div class="w-full">
    <h2 class="mb-2 text-lg font-bold">ルーム一覧</h2>
    <div v-for="room in rooms" :key="room.id">
      <router-link v-bind:to="{ name: 'Room', params: { id: room.uid } }" class="py-4 w-full block border text-lg hover:bg-gray-200">
        {{ room.name }}
      </router-link>
    </div>
    <Navbar />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useFirebaseAuth from "@/common/auth";
import getApi from "@/common/api";
import Navbar from "@/components/Navbar";

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const { token } = useFirebaseAuth();

    const rooms = ref([]);

    onMounted(async () => {
      const res = await getApi(token.value).get("/api/v1/user/room");
      rooms.value = res.data.rooms;
    });

    return {
      rooms
    };
  },
});
</script>
