<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">logout</button>
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import useFirebaseAuth from '@/common/auth'
import Navbar from "@/components/Navbar";

const { logout } = useFirebaseAuth();

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Navbar
  },
  methods: {
    logout
  }
}
</script>
