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
        <h2 class="text-2xl font-bold mb-6 -mt-6 text-center text-blue-700">Inscrivez-vous</h2>
        <div class="-mt-4 mb-5 text-center text-[0.7rem]">
          <p>
            Inscrivez-vous pour accéder à un espace
          </p>
        </div>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="user_nom" class="block text-gray-700">Nom<span class="text-red-600">*</span></label>
            <input
                v-model="user_nom"
                type="text"
                id="user_nom"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-4">
            <label for="user_prenom" class="block text-gray-700">Prenom</label>
            <input
                v-model="user_prenom"
                type="text"
                id="user_prenom"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email<span class="text-red-600">*</span></label>
            <input
                v-model="email"
                type="email"
                id="email"
                class="mt-2 p-2 w-full border rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-custom"
                required
            />
          </div>
          <div class="mb-6 relative">
            <label for="password" class="block text-gray-700">Mot de passe<span class="text-red-600">*</span></label>
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
            <label for="confirm_password" class="block text-gray-700">Confirmer le mot de passe</label>
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
              Vous avez déjà un compte ?
              <router-link to="/login" class="text-blue-500 ml-1 hover:underline">Se connecter</router-link>
            </p>
          </div>
          <div class="mt-5 -mb-6 text-center text-xs text-gray-500">
            <p>
              By signing up you are agreeing to our
              <a @click="openTerms" class="text-blue-500 hover:underline cursor-pointer">Terms and Conditions</a>
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
import {onBeforeMount, ref} from 'vue';
import { useRouter } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue';
import {ChevronUpIcon} from "@heroicons/vue/20/solid";

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

const identifiants = ref<Array>([
  {   "id": 1,
    "user_nom": "Dikoume",
    "user_prenom": "Darryl",
    "email": "darryllk97@gmail.com",
    "password": "Azerty_97"
  },
  {
    "id": 2,
    "user_nom": "Dikoume",
    "user_prenom": "Charles",
    "email": "charles.dikoume@2027.ucac-icam.com",
    "password": "Azerty_97"
  }
]);
const employees = ref<Array>([
  {
    "id": 2341421,
    "employee": "Ahmed Rashdan",
    "role": "Help Desk Executive",
    "téléphone": "+237655510637",
    "site": "Logpom",
    "matricule": "Os11e4d1sz4",
    "email": "Ahmedsz4@nomdedomaine.com",
    "password": "AhdRashdan123!"
  },
  {
    "id": 2341422,
    "employee": "Kadi Manela",
    "role": "System coordinator",
    "téléphone": "+237677812345",
    "site": "Yansoki",
    "matricule": "Ya12e5d2sz5",
    "email": "Kadisz5@nomdedomaine.com",
    "password": "KadManela456@"
  },
  {
    "id": 2341423,
    "employee": "John Doe",
    "role": "Software Engineer",
    "téléphone": "+237699876543",
    "site": "Bali",
    "matricule": "Ba13e6d3sz6",
    "email": "Johnsz6@nomdedomaine.com",
    "password": "JohDoe789#"
  },
  {
    "id": 2341424,
    "employee": "Jane Smith",
    "role": "Marketing Manager",
    "téléphone": "+237622334567",
    "site": "Akwa",
    "matricule": "Ak14e7d4sz7",
    "email": "Janesz7@nomdedomaine.com",
    "password": "JanSmi890*"
  },
  {
    "id": 2341425,
    "employee": "Emily Chen",
    "role": "Data Analyst",
    "téléphone": "+237688765432",
    "site": "Bonapriso",
    "matricule": "Bo15e8d5sz8",
    "email": "Emilsz8@nomdedomaine.com",
    "password": "EmiChe901@"
  },
  {
    "id": 2341426,
    "employee": "Michael Brown",
    "role": "Sales Representative",
    "téléphone": "+237655678901",
    "site": "Logpom",
    "matricule": "Os16e9d6sz9",
    "email": "Micsz9@nomdedomaine.com",
    "password": "MicBro234$"
  },
  {
    "id": 2341427,
    "employee": "Sarah Lee",
    "role": "HR Manager",
    "téléphone": "+237677890123",
    "site": "Yansoki",
    "matricule": "Ya17e10d7sz10",
    "email": "Sarsz0@nomdedomaine.com",
    "password": "SarLee567#"
  },
  {
    "id": 2341428,
    "employee": "David Kim",
    "role": "Network Administrator",
    "téléphone": "+237699012345",
    "site": "Bali",
    "matricule": "Ba18e11d8sz11",
    "email": "Davisz1@nomdedomaine.com",
    "password": "DavKim890*"
  },
  {
    "id": 2341429,
    "employee": "Lisa Nguyen",
    "role": "Graphic Designer",
    "téléphone": "+237622123456",
    "site": "Akwa",
    "matricule": "Ak19e12d9sz12",
    "email": "Lisz2@nomdedomaine.com",
    "password": "LisNgu456@"
  },
  {
    "id": 2341430,
    "employee": "Kevin White",
    "role": "Operations Manager",
    "téléphone": "+237688234567",
    "site": "Bonapriso",
    "matricule": "Bo20e13d10sz13",
    "email": "Kevsz3@nomdedomaine.com",
    "password": "KevWhi789#"
  },
  {
    "id": 2341431,
    "employee": "Jessica Martin",
    "role": "Customer Service Representative",
    "téléphone": "+237655345678",
    "site": "Logpom",
    "matricule": "Os21e14d11sz14",
    "email": "Jessz4@nomdedomaine.com",
    "password": "JesMar901@"
  },
  {
    "id": 2341432,
    "employee": "Brian Hall",
    "role": "Software Developer",
    "téléphone": "+237677456789",
    "site": "Yansoki",
    "matricule": "Ya22e15d12sz15",
    "email": "Brisz5@nomdedomaine.com",
    "password": "BriHal234$"
  },
  {
    "id": 2341433,
    "employee": "Daniel Park",
    "role": "Financial Analyst",
    "téléphone": "+237699567890",
    "site": "Bali",
    "matricule": "Ba23e16d13sz16",
    "email": "Dansz6@nomdedomaine.com",
    "password": "DanPar567#"
  },
  {
    "id": 2341434,
    "employee": "Stephanie Lee",
    "role": "Product Manager",
    "téléphone": "+237622567890",
    "site": "Akwa",
    "matricule": "Ak24e17d14sz17",
    "email": "Stesz7@nomdedomaine.com",
    "password": "SteLee890*"
  },
  {
    "id": 2341435,
    "employee": "James Kim",
    "role": "Business Development Manager",
    "téléphone": "+237688678901",
    "site": "Bonapriso",
    "matricule": "Bo25e18d15sz18",
    "email": "Jamsz8@nomdedomaine.com",
    "password": "JamKim901@"
  },
  {
    "id": 2341436,
    "employee": "Grace Lee",
    "role": "Content Writer",
    "téléphone": "+237655789012",
    "site": "Logpom",
    "matricule": "Os26e19d16sz19",
    "email": "Grasz9@nomdedomaine.com",
    "password": "GraLee234$"
  },
  {
    "id": 2341437,
    "employee": "Andrew Park",
    "role": "Quality Assurance Engineer",
    "téléphone": "+237677890123",
    "site": "Yansoki",
    "matricule": "Ya27e20d17sz20",
    "email": "Andsz0@nomdedomaine.com",
    "password": "AndPar567#"
  },
  {
    "id": 2341438,
    "employee": "Emily Chen",
    "role": "Data Scientist",
    "téléphone": "+237699012345",
    "site": "Bali",
    "matricule": "Ba28e21d18sz21",
    "email": "Emisz1@nomdedomaine.com",
    "password": "EmiChe890*"
  },
  {
    "id": 2341439,
    "employee": "Matthew Lee",
    "role": "Technical Writer",
    "téléphone": "+237622123456",
    "site": "Akwa",
    "matricule": "Ak29e22d19sz22",
    "email": "Matsz2@nomdedomaine.com",
    "password": "MatLee901@"
  },
  {
    "id": 2341440,
    "employee": "Jessica Kim",
    "role": "Project Coordinator",
    "téléphone": "+237688234567",
    "site": "Bonapriso",
    "matricule": "Bo30e23d20sz23",
    "email": "Jessz3@nomdedomaine.com",
    "password": "JesKim234$"
  },
  {
    "id": 2341441,
    "employee": "Daniel Lee",
    "role": "DevOps Engineer",
    "téléphone": "+237655345678",
    "site": "Logpom",
    "matricule": "Os31e24d21sz24",
    "email": "Dansz4@nomdedomaine.com",
    "password": "DanLee567#"
  },
  {
    "id": 2341442,
    "employee": "Sarah Kim",
    "role": "UX Researcher",
    "téléphone": "+237677456789",
    "site": "Yansoki",
    "matricule": "Ya32e25d22sz25",
    "email": "Sarsz5@nomdedomaine.com",
    "password": "SarKim901@"
  },
  {
    "id": 2341443,
    "employee": "Kevin Park",
    "role": "Front-end Developer",
    "téléphone": "+237699567890",
    "site": "Bali",
    "matricule": "Ba33e26d23sz26",
    "email": "Kevsz6@nomdedomaine.com",
    "password": "KevPark901#"
  },
  {
    "id": 2341444,
    "employee": "Kelly Lee",
    "role": "Accountant",
    "téléphone": "+237622890124",
    "site": "Akwa",
    "matricule": "Ak34e27d24sz27",
    "email": "Kellsz7@nomdedomaine.com",
    "password": "KelLee123*"
  },
  {
    "id": 2341445,
    "employee": "Bryan Chen",
    "role": "Graphic Designer",
    "téléphone": "+237688012346",
    "site": "Bonapriso",
    "matricule": "Bo35e28d25sz28",
    "email": "Brysza@nomdedomaine.com",
    "password": "BryChen123$"
  },
  {
    "id": 2341446,
    "employee": "Chris Park",
    "role": "Sales Manager",
    "téléphone": "+237655123457",
    "site": "Logpom",
    "matricule": "Os36e29d26sz29",
    "email": "Chrsz8@nomdedomaine.com",
    "password": "ChrPark901#"
  },
  {
    "id": 2341447,
    "employee": "Natalie Kim",
    "role": "HR Manager",
    "téléphone": "+237677234568",
    "site": "Yansoki",
    "matricule": "Ya37e30d30sz30",
    "email": "Natsz9@nomdedomaine.com",
    "password": "NatKim901@"
  },
  {
    "id": 2341448,
    "employee": "Timothy Lee",
    "role": "IT Manager",
    "téléphone": "+237699234569",
    "site": "Bali",
    "matricule": "Ba38e31d31sz31",
    "email": "Timsz10@nomdedomaine.com",
    "password": "TimLee901#"
  },
  {
    "id": 2341449,
    "employee": "Lily Park",
    "role": "Business Analyst",
    "téléphone": "+237655012347",
    "site": "Akwa",
    "matricule": "Ak39e32d32sz32",
    "email": "Lilsz11@nomdedomaine.com",
    "password": "LilPark901@"
  },
  {
    "id": 2341450,
    "employee": "Matthew Chen",
    "role": "Business Analyst",
    "téléphone": "+237688012348",
    "site": "Bonapriso",
    "matricule": "Bo39e33d33sz33",
    "email": "Matz12@nomdedomaine.com",
    "password": "MatChen123*"
  },
  {
    "id": 2341451,
    "employee": "Jessica Park",
    "role": "UX Designer",
    "téléphone": "+237655123459",
    "site": "Logpom",
    "matricule": "Os40e34d34sz34",
    "email": "Jessz13@nomdedomaine.com",
    "password": "JesPar901#"
  },
  {
    "id": 2341452,
    "employee": "Andrew Kim",
    "role": "Software Developer",
    "téléphone": "+237677234570",
    "site": "Yansoki",
    "matricule": "Ya41e35d35sz35",
    "email": "Andsza@nomdedomaine.com",
    "password": "AndKim123$"
  },
  {
    "id": 2341453,
    "employee": "Jessica Nguyen",
    "role": "Project Manager",
    "téléphone": "+237699234571",
    "site": "Bali",
    "matricule": "Ba42e36d36sz36",
    "email": "Jessb@nomdedomaine.com",
    "password": "JesNgu901@"
  },
  {
    "id": 2341454,
    "employee": "Stephanie Chen",
    "role": "Data Analyst",
    "téléphone": "+237655012349",
    "site": "Akwa",
    "matricule": "Ak43e37d37sz37",
    "email": "Stephcz@nomdedomaine.com",
    "password": "SteChen123*"
  },
  {
    "id": 2341455,
    "employee": "James Nguyen",
    "role": "Software Engineer",
    "téléphone": "+237688012350",
    "site": "Bonapriso",
    "matricule": "Bo44e38d38sz38",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu901#"
  },
  {
    "id": 2341456,
    "employee": "Grace Nguyen",
    "role": "Content Writer",
    "téléphone": "+237655123451",
    "site": "Logpom",
    "matricule": "Os45e39d39sz39",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraNgu901@"
  },
  {
    "id": 2341457,
    "employee": "Andrew Nguyen",
    "role": "QA Engineer",
    "téléphone": "+237677234572",
    "site": "Yansoki",
    "matricule": "Ya46e40d40sz40",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndNgu123*"
  },
  {
    "id": 2341458,
    "employee": "Jessica White",
    "role": "Project Coordinator",
    "téléphone": "+237699234573",
    "site": "Bali",
    "matricule": "Ba47e41d41sz41",
    "email": "Jesswhi@nomdedomaine.com",
    "password": "JesWhi901#"
  },
  {
    "id": 2341459,
    "employee": "Stephanie Lee",
    "role": "UX Designer",
    "téléphone": "+237655012352",
    "site": "Akwa",
    "matricule": "Ak48e42d42sz42",
    "email": "Steplsz@nomdedomaine.com",
    "password": "SteLee123$"
  },
  {
    "id": 2341460,
    "employee": "James Lee",
    "role": "Software Developer",
    "téléphone": "+237688012353",
    "site": "Bonapriso",
    "matricule": "Bo49e43d43sz43",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu123#"
  },
  {
    "id": 2341461,
    "employee": "Grace Lee",
    "role": "Content Writer",
    "téléphone": "+237655123454",
    "site": "Logpom",
    "matricule": "Os49e44d44sz44",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraLee123@"
  },
  {
    "id": 2341462,
    "employee": "Andrew Lee",
    "role": "QA Engineer",
    "téléphone": "+237677234575",
    "site": "Yansoki",
    "matricule": "Ya50e45d45sz45",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndLee123*"
  },
  {
    "id": 2341463,
    "employee": "Jessica Lee",
    "role": "Project Coordinator",
    "téléphone": "+237699234576",
    "site": "Bali",
    "matricule": "Ba51e46d46sz46",
    "email": "Jesswhi@nomdedomaine.com",
    "password": "JesLee123*"
  },
  {
    "id": 2341464,
    "employee": "Stephanie Johnson",
    "role": "UX Designer",
    "téléphone": "+237655012355",
    "site": "Akwa",
    "matricule": "Ak52e47d47sz47",
    "email": "Steplsz@nomdedomaine.com",
    "password": "SteJoh123$"
  },
  {
    "id": 2341465,
    "employee": "James Johnson",
    "role": "Software Developer",
    "téléphone": "+237688012356",
    "site": "Bonapriso",
    "matricule": "Bo53e48d48sz48",
    "email": "Jamnguy@nomdedomaine.com",
    "password": "JamNgu123@"
  },
  {
    "id": 2341466,
    "employee": "Grace Johnson",
    "role": "Content Writer",
    "téléphone": "+237655123457",
    "site": "Logpom",
    "matricule": "Os54e49d49sz49",
    "email": "Gracenguy@nomdedomaine.com",
    "password": "GraJoh123*"
  },
  {
    "id": 2341467,
    "employee": "Andrew Johnson",
    "role": "QA Engineer",
    "téléphone": "+237677234577",
    "site": "Yansoki",
    "matricule": "Ya55e50d50sz50",
    "email": "Andnguy@nomdedomaine.com",
    "password": "AndJoh123#"
  }
]);

const saveIdentifiantsToLocalStorage = (identifiants: Identifiants[]) => {
  localStorage.setItem('identifiants', JSON.stringify(identifiants));
}
const saveEmployeesToLocalStorage = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
}

const  getIdentifiantsFromLocalStorage = () => {
  if (localStorage.getItem('identifiants')){
    identifiants.value = JSON.parse(localStorage.getItem('identifiants'))
  }
}
const getEmployeesFromLocalStorage = () => {
  if (localStorage.getItem('employees')){
    employees.value = JSON.parse(localStorage.getItem('employees'))
  }
}

onBeforeMount(()=>{
  getIdentifiantsFromLocalStorage()
})

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
        saveIdentifiantsToLocalStorage(identifiants.value)
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