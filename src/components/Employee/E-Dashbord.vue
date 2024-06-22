<template>
  <div class="bg-gray-100">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

        <div class="p-12 ml-24 mt-4 space-y-10">
          <div class="grid grid-cols-3 mr-36">

            <!-- Card containing time and date -->
            <div class="bg-white p-20 rounded-3xl shadow-2xl w-96">
              <div class="flex items-center mt-5 mb-5">
                <TimeBasedIcon />
                <div class="ml-5">
                  <p class="text-xl text-gray-500 font-light">{{ currentTime }}</p>
                  <p class="text-gray-500 font-serif">{{ $t('real') }}</p>
                </div>
              </div>
              <p class="text-xl mt-10 font-mono mb-12">{{ $t('auj') }}: <br>{{ currentDate }}</p>
              <router-link to="/epointing" class="bg-blue-700 text-white p-3 px-10 py-4 rounded-2xl hover:bg-blue-900">
                {{ $t('dashboard.viewAttendance') }}
              </router-link>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 col-span-2">
              <StatCard v-for="(leave, index) in leaves" :key="index" :title="leave.title" :remaining="leave.remaining" :used="leave.used" :total="leave.total" />
            </div>

          </div>

          <div class="flex">
            <!-- Attendance Comparison Chart -->
            <Chart />
            <!-- Weekly Attendance -->
            <Bar class="md:w-[31rem] ml-4" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue';
import Sidebar from "@/components/Employee/E-Sidebar.vue";
import Header from "@/components/Employee/E-Header.vue";
import StatCard from "@/components/Employee/E-StatCard.vue";
import Chart from "@/components/Employee/E-Chart.vue";
import TimeBasedIcon from "@/components/Employee/E-TimeBasedIcon.vue";
import Bar from "@/components/Employee/E-Bar.vue";
import {useStorage} from "@vueuse/core";
const leave = useStorage('leave', [])

// Format Date with letters
const formatDate = (date: Date) => {
  const day = date.getDate();
  let suffix = '';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
};

// Format time with AM/PM and include seconds
const formatTime = (time: Date) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
};

// Realtime data references
const currentTime = ref(formatTime(new Date()));
const currentDate = ref(formatDate(new Date()));


// Update time every second
const updateTime = () => {
  currentTime.value = formatTime(new Date());
  currentDate.value = formatDate(new Date());
};

// Set intervals for updating time and fetching data
onMounted(() => {
  const timeInterval = setInterval(updateTime, 1000);
  onUnmounted(() => {
    clearInterval(timeInterval);
  });
});

const totalLeave = computed(() => leave.value.length);
const leavePending = computed(() => leave.value.filter((item) => item.status === 'Pending').length)
const refusedLeave = computed(() => leave.value.filter((item) => item.status === 'Refused').length)
const justifiedLeave = computed(() => leave.value.filter((item) => item.reason && item.reason.trim() !== '').length);
const unjustifiedLeave = computed(() => leave.value.filter((item) => !item.reason || item.reason.trim() === '').length);
const allowedLeave = computed(() => leave.value.filter((item) => item.status === 'Allowed').length)

const leaves = ref([
  { title: 'Justified leave', total: justifiedLeave.value},
  { title: 'Unjustified leave', total: unjustifiedLeave.value},
  { title: 'Refused leave', total: refusedLeave.value},
  { title: 'Leave Request pending', total: leavePending.value},
  { title: 'Allowed leave', total: allowedLeave.value},
  { title: 'Total leave request', total: totalLeave.value }
]);
</script>
