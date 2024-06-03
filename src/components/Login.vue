<template>
  <div class="relative flex flex-col md:flex-row h-screen bg-gray-100">
    <!-- Left side with logo or image -->
    <div class="hidden md:flex w-full md:w-[400px] bg-blue-900 items-center justify-center rounded-tr-[75px] rounded-br-[75px] mt-8 mb-8 relative">
      <span class="text-[18rem] text-white opacity-5 font-bold -mt-[100px]">Q</span>
      <span class="text-[18rem] text-white opacity-5 font-bold ml-[-2rem] mt-24">S</span>

      <!-- Signature -->
      <div class="absolute mb-10 bottom-0 left-3 p-4 flex flex-col items-start">
        <div class="text-cyan-500 text-2xl font-semibold text-center">
          <p>
            Clock
            <a class="text-white -ml-1.5">Box</a>
          </p>
        </div>
        <div class="ml-5 text-gray-300 text-xs">
          <p>
            <a class="border-2 -ml-10 mt-2 -mb-2.5 border-cyan-500 w-9 block"></a>
            By Quick Safe
          </p>
        </div>
      </div>
    </div>

    <!-- Right side with login form -->
    <div class="flex-1 flex items-center justify-center p-4 md:p-0">
      <div class="bg-white drop-shadow-2xl rounded-[25px] p-8 md:p-20 max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Connectez-vous</h2>
        <div class="-mt-4 mb-8 text-center text-[0.7rem]">
          <p>
            Connectez-vous pour accéder à votre espace
          </p>
        </div>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
                v-model="email"
                type="email"
                id="email"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-6 relative">
            <label for="password" class="block text-gray-700">Mot de passe</label>
            <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
            <div id="eye-icon" class="absolute inset-y-0 top-8 opacity-70 right-0 pr-3 flex items-center cursor-pointer" @click="togglePassword">
              <img :src="showPassword ? 'public/unslash.png' : 'public/slash.png'" alt="Toggle Password Visibility" class="object-contain h-4 w-6">
            </div>
          </div>
          <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-4">{{ error }}</p>
          <div class="flex justify-center mb-3">
            <button
                type="submit"
                class="w-full md:w-52 bg-blue-700 text-white py-2 px-4 text-center rounded-md hover:bg-blue-900"
            >
              Connexion
            </button>
          </div>
          <div class="mt-4 text-center cursor-pointer">
            <a @click="openModal" class="text-blue-500 hover:underline">Mot de passe oublié ?</a>
          </div>
          <div class="mt-4 text-center text-xs">
            <p>
              Vous n'avez pas de compte ?
              <router-link to="/register" class="text-blue-500 ml-1 hover:underline">Créer un compte</router-link>
            </p>
          </div>
          <div class="mt-4 text-center text-xs text-gray-500">
            <p>
              By signing up you are agreeing to our
              <a @click="openTerms" class="text-blue-500 hover:underline cursor-pointer">Terms and Conditions</a>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Forgotten password -->
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h3 class="text-lg font-medium text-gray-900">Mot de passe oublié</h3>
          <p class="mt-2 text-sm text-gray-500">Un e-mail a été envoyé à votre adresse {{ maskEmail(email) }} pour réinitialiser votre mot de passe.</p>
          <button @click="closeModal" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            J'ai compris, merci !
          </button>
        </div>
      </div>
    </transition>
    <!-- Terms and Conitions -->
    <transition name="fade">
      <div v-if="termsOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="w-full px-4 pt-16">
          <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>About our terms</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us within
                90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" class="mt-2" v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>About our conditions</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </DisclosurePanel>
            </Disclosure>
            <button @click="closeTerms" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              J'approuve avoir lu et accepté !
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  } from '@headlessui/vue';
  import { ChevronUpIcon } from '@heroicons/vue/20/solid';

  const router = useRouter();
  const isOpen = ref(false);
  const email = ref('');
  const password = ref('');
  const error = ref('');

  const closeModal = () => {
    isOpen.value = false;
  };
  const openModal = () => {
    if (email.value) {
      isOpen.value = true;
    }
  };

  // Terms and conditions
  const termsOpen = ref(false);

  const openTerms = () => {
    termsOpen.value = true;
  };
  const closeTerms = () => {
    termsOpen.value = false;
  };

  // Show password
  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  // Hide email
  const maskEmail = (email: string) => {
    const atIndex = email.indexOf('@'); // Find the index of '@'
    const maskedPart = email.substring(1, atIndex).replace(/./g, '*'); // Replace characters before '@' with '*'
    return email.charAt(0) + maskedPart + email.substring(atIndex); // Concatenate masked and unmasked parts
  };

  const login = () => {

      const user1 = users.find((u: { email: string }) => u.email === email.value);
      const user2 = empl.find((u: { email: string }) => u.email === email.value);

    if (!user1 || !user2) {
        error.value = 'Aucun utilisateur trouvé !';
      } else if (user1.password !== password.value || user2.password !== password.value) {
        error.value = 'Mot de passe incorrect !';
      } else {
        router.push('/dashboard')
      }
  };
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>