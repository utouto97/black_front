<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import { defineComponent, onMounted } from "vue";
// import { useApi } from "@/common/api";

export default defineComponent({
  setup() {
    // const auth = useAuth();
    // const api = useApi(auth.state.token);

    // onMounted(() => {
    //   api.get("/api/v1").then((result) => console.log(result.data));
    // });
  },
});
</script>
