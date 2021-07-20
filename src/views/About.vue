<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@/store/auth";

export default defineComponent({
  setup() {
    const auth = useAuth();

    onMounted(() => {
      // console.log("token: " + auth.state.token);
      axios
        .get("http://localhost:3000/api/v1", {
          headers: {
            Authorization: `Bearer ${auth.state.token}`,
          },
        })
        .then((result) => console.log(result));
    });
  },
});
</script>
