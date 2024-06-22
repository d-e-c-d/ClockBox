<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-100">
    <!-- Left side with logo or image -->
    <div class="hidden md:flex w-full md:w-[400px] bg-blue-900 items-center justify-center rounded-tr-[75px] rounded-br-[75px] mt-8 mb-8 relative">
      <span class="text-[10rem] md:text-[18rem] text-white opacity-5 font-bold -mt-[100px]">Q</span>
      <span class="text-[10rem] md:text-[18rem] text-white opacity-5 font-bold ml-[-2rem] mt-24">S</span>

      <!-- Signature -->
      <div class="absolute mb-10 bottom-0 left-3 p-4 flex flex-col items-start">
        <div class="text-cyan-500 text-lg md:text-2xl font-semibold text-center">
          <p>
            Clock
            <a class="text-white -ml-1.5">Box</a>
          </p>
        </div>
        <div class="ml-2 md:ml-5 text-gray-300 text-xs">
          <p>
            <a class="border-2 -ml-5 md:-ml-10 mt-2 -mb-2.5 border-cyan-500 w-9 block"></a>
            By Quick Safe
          </p>
        </div>
      </div>
    </div>

    <!-- Right side with login form -->
    <div class="flex-1 flex items-center justify-center p-4 md:p-0">
      <div class="bg-white drop-shadow-2xl rounded-[25px] p-8 md:p-20 max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-6 -mt-6 text-center text-blue-700">{{ $t('register') }}</h2>
        <div class="-mt-4 mb-5 text-center text-[0.7rem]">
          <p>
            {{ $t('sign_up_message') }}
          </p>
        </div>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="user_nom" class="block text-gray-700">{{ $t('name') }}<span class="text-red-600">*</span></label>
            <input
                v-model="user_nom"
                type="text"
                id="user_nom"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-4">
            <label for="user_prenom" class="block text-gray-700">{{ $t('first_name') }}</label>
            <input
                v-model="user_prenom"
                type="text"
                id="user_prenom"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">{{ $t('email') }}<span class="text-red-600">*</span></label>
            <input
                v-model="email"
                type="email"
                id="email"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-6 relative">
            <label for="password" class="block text-gray-700">{{ $t('password') }}<span class="text-red-600">*</span></label>
            <input
                v-model="password"
                :type="showPassword ? 'texte' : 'password'"
                id="password"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
            <div class="absolute inset-y-0 top-8 opacity-70 right-0 pr-3 flex items-center cursor-pointer" @click="togglePassword">
              <img :src="showPassword ? 'public/unslash.png' : 'public/slash.png'" alt="Toggle Password Visibility" class="object-contain h-4 w-6">
            </div>
          </div>
          <div class="mb-6">
            <label for="confirm_password" class="block text-gray-700">{{ $t('confirm_password') }}</label>
            <input
                v-model="confirm_password"
                :type="showPassword ? 'text' : 'password'"
                id="confirm_password"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <p v-if="error" class="text-red-500 text-xs font-bold text-center mb-4">{{ error }}</p>
          <div class="flex justify-center mb-3">
            <button
                         type="submit"
                         class="w-full md:w-52 bg-blue-700 text-white py-2 px-4 text-center rounded-md hover:bg-blue-900"
            >
              Inscription
            </button>
          </div>
          <div class="mt-4 text-center text-xs">
            <p>
              {{ $t('already_have_account') }}
              <router-link to="/login" class="text-blue-500 ml-1 hover:underline">{{ $t('sign_in') }}</router-link>
            </p>
          </div>
          <div class="mt-5 -mb-6 text-center text-xs text-gray-500">
            <p>
              {{ $t('terms_conditions_message') }}
              <a @click="openTerms" class="text-blue-500 hover:underline cursor-pointer">{{ $t('terms_conditions') }}</a>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Terms and Conitions -->
    <transition name="fade">
      <div v-if="termsOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="w-full px-4 pt-16">
          <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>{{ $t('terms_title') }}</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                {{ $t('terms_and_conditions.about_terms_message') }}
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" class="mt-2" v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>{{ $t('terms_about') }}</span>
                <ChevronUpIcon
                    :class="open ? 'rotate-180 transform' : ''"
                    class="h-5 w-5 text-purple-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                {{ $t('terms_and_conditions.about_conditions_message') }}
              </DisclosurePanel>
            </Disclosure>
            <button @click="closeTerms" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-950 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              {{ $t('terms_close_button') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';
import { useRouter } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue';
import {ChevronUpIcon} from "@heroicons/vue/20/solid";
import {useStorage} from "@vueuse/core";

//Terms and conditions
const termsOpen = ref(false)

const openTerms = () => {
  termsOpen.value = true;
}
const closeTerms = () => {
  termsOpen.value = false;
};

// Affichage mot de passe
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const router = useRouter();
const user_nom = ref('');
const user_prenom = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const error = ref('');

const identifiants =  useStorage('identifiants', []);
const employees = useStorage('employees', []);


const register = () => {
  if (password.value !== confirm_password.value) {
    error.value = 'Les mots de passe ne correspondent pas !';
  } else if (!validatePassword(password.value)) {
    error.value = 'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial !';
  } else if (password.value.length < 8 || password.value.length > 25) {
    error.value = 'Le mot de passe doit contenir 8-25 caractères !';
  } else if (user_nom.value.length < 2 || user_prenom.value.length < 2) {
    error.value = 'Nom ou Prenom trop court !';
  } else if (employees.value.find((u: { email: string }) => u.email === email.value)) {
    error.value = 'Impossible de créer un compte avec cette addresse !';
  } else {
    const user = identifiants.value.find((u: { email: string }) => u.email === email.value);
      if (user) {
        error.value = 'Adresse déja utilisée. Connectez-vous !';
      } else {
        let lastId = 0;
        if (identifiants.value && identifiants.value.length > 0) {
          lastId = identifiants.value[identifiants.value.length - 1].id;
        }
        const newIdentifiant = {
          id: lastId + 1,
          user_nom: user_nom.value,
          user_prenom: user_prenom.value,
          email: email.value,
          password: password.value,
        };
        identifiants.value.push(newIdentifiant);
        localStorage.setItem('identifiants', JSON.stringify(identifiants.value));
        error.value = '';
        router.push('/dashboard')
      }
    }
};
// Fonction pour valider la complexité du mot de passe
const validatePassword = (password: string): boolean => {
  // Vérifie la présence d'au moins une lettre, un chiffre et un caractère spécial
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@/_|.#~=+*-]).*$/.test(password);
};
</script>