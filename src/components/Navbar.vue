<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
import { useLoginStore } from '@/stores/loggedIn';

const logInfo = useLoginStore();

function login() {
  // fetch user data and pass id
  const id = 'ecqwh';
  logInfo.login(id);
}
function logout() {
  logInfo.logout();
}
</script>

<template>
  <section
    class="surface-800 flex justify-content-evenly align-items-center py-2"
  >
    <h1 class="text-blue-500 text-5xl">Blogify</h1>
    <div>
      <router-link
        to="/"
        class="text-blue-50 text-lg no-underline hover:underline"
        >Home</router-link
      >
      <router-link
        to="/newpost"
        class="mx-2 text-blue-50 text-lg no-underline hover:underline"
        >Add</router-link
      >
      <router-link
        to="/about"
        class="text-blue-50 text-lg no-underline hover:underline"
        >About</router-link
      >
    </div>
    <div>
      <div v-if="logInfo.loggedIn">
        <Button @click="logout" class="p-button-rounded p-button-lg"
          >Log Out</Button
        >
      </div>
      <div v-else>
        <Button @click="login" class="p-button-rounded p-button-lg"
          >Log In</Button
        >
      </div>
    </div>
  </section>
</template>
