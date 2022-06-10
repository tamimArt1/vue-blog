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

const jsConfetti = new JSConfetti();
const toast = useToast();
const router = useRouter();
const name = ref<string>('');
const email = ref<string>('');
const pass = ref<string>('');
const loading = ref<boolean>(false);

async function onSubmit() {
  const newUser: User = {
    name: name.value,
    email: email.value,
    password: pass.value,
  };
  loading.value = true;
  const res = await userClient.add(newUser);
  loading.value = false;
  if (res._id) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User created successfully.',
      life: 3000,
    });
    jsConfetti.addConfetti();
  }
  name.value = '';
  email.value = '';
  pass.value = '';
  router.push('/login');
}
</script>

<template>
  <Toast position="top-right" />
  <Dialog modal header="Header" v-model:visible="loading">
    <ProgressSpinner />
  </Dialog>
  <h1 class="text-5xl text-blue-500 text-center mt-4">Signup</h1>
  <section
    class="container flex align-items-center justify-content-center mt-4"
  >
    <form
      @submit.prevent="onSubmit"
      class="flex flex-column gap-6 bg-blue-100 p-8 border-round"
    >
      <div class="p-float-label">
        <InputText
          id="inputname"
          type="text"
          v-model="name"
          class="p-inputtext-lg"
        />
        <label for="inputname">Name</label>
      </div>
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
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </form>
  </section>
</template>
