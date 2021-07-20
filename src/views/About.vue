<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import api from "@/common/api";

export default defineComponent({
  setup() {
    onMounted(() => {
      api.get("/api/v1").then((result) => console.log(result.data));
    });
  },
});
</script>
