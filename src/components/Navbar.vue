<template>
  <ul class="flex justify-center py-1 mt-2 rounded-md bg-blue-200">
    <li class="flex-1 mr-2">
      <router-link to="/" tag="button" class="h-12 w-12 py-2 px-2 mx-auto text-center block rounded-full hover:bg-blue-700 hover:text-white text-blue-700">
        <svg class="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
      </router-link>
    </li>
    <li class="flex-1 mr-2">
      <router-link to="/create" tag="button" class="h-12 w-12 py-2 px-2 mx-auto text-center block rounded-full hover:bg-blue-700 hover:text-white text-blue-700">
        <svg class="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </router-link>
    </li>
    <li class="flex-1 mr-2">
      <router-link to="/setting" class="h-12 w-12 py-2 px-2 mx-auto text-center block rounded-full hover:bg-blue-700 hover:text-white text-blue-700">
        <svg class="h-8 w-8"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </router-link>
    </li>
    <li class="flex-1">
      <button @click="doLogout" class="h-12 w-12 py-2 px-2 mx-auto text-center block rounded-full hover:bg-blue-700 hover:text-white text-blue-700">
        <svg class="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
      </button>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/common/auth";

export default defineComponent({
  setup(){
    const router = useRouter();
    const { logout } = useFirebaseAuth();

    const doLogout = async () => {
      await logout();
      router.push("/login");
    };

    return {
      doLogout
    };
  }
});
</script>
