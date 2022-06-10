<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { RouterLink, useRouter } from 'vue-router';
import JSConfetti from 'js-confetti';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { userClient } from '@/api/api';
import type { User } from '@/utils/interfaces';
import ProgressSpinner from 'primevue/progressspinner';
import { useLoginStore } from '@/stores/loggedIn';

const jsConfetti = new JSConfetti();
const toast = useToast();
const router = useRouter();
const email = ref<string>('');
const pass = ref<string>('');
const loading = ref<boolean>(false);
const loginStore = useLoginStore();

async function onSubmit() {
  const userInfo: User = {
    email: email.value,
    password: pass.value,
  };
  loading.value = true;
  const res = await userClient.validUser(userInfo);
  loading.value = false;
  if (res._id) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login successfull.',
      life: 3000,
    });
    jsConfetti.addConfetti();
    loginStore.login(res.email);
  }
  email.value = '';
  pass.value = '';
  router.push('/');
}
</script>

<template>
  <Toast position="top-right" />
  <Dialog modal header="Header" v-model:visible="loading">
    <ProgressSpinner />
  </Dialog>
  <h1 class="text-5xl text-blue-500 text-center mt-4">Login</h1>
  <section
    class="container flex align-items-center justify-content-center mt-4"
  >
    <form
      @submit.prevent="onSubmit"
      class="flex flex-column gap-6 bg-blue-100 p-8 border-round"
    >
      <div class="p-float-label">
        <InputText
          id="inputemail"
          type="text"
          v-model="email"
          class="p-inputtext-lg"
        />
        <label for="inputemail">Email</label>
      </div>
      <div class="p-float-label">
        <Password
          id="inputpass"
          type="text"
          v-model="pass"
          class="p-inputtext-lg"
        />
        <label for="inputpass">Password</label>
      </div>
      <Button @click="onSubmit" class="p-button-lg">Submit</Button>
      <p class="font-bold">
        Don't have an account? <router-link to="/login">Signup</router-link>
      </p>
    </form>
  </section>
</template>
