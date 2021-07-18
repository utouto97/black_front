<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import { token } from "@/store/auth";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log("token: " + token.value);
      axios
        .get("http://localhost:3000/api/v1", {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then((result) => console.log(result));
    });
  },
});
</script>
