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
                  <p class="text-gray-500 font-serif">Realtime Insight</p>
                </div>
              </div>
              <p class="text-xl mt-10 font-mono mb-12">Today: <br>{{ currentDate }}</p>
              <router-link to="/epointing" class="bg-blue-700 text-white p-3 px-10 py-4 rounded-2xl hover:bg-blue-900">
                View Attendance
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
import { ref, onMounted, onUnmounted } from 'vue';
import Sidebar from "@/components/Employee/E-Sidebar.vue";
import Header from "@/components/Employee/E-Header.vue";
import StatCard from "@/components/Employee/E-StatCard.vue";
import Chart from "@/components/Employee/E-Chart.vue";
import TimeBasedIcon from "@/components/Employee/E-TimeBasedIcon.vue";
import Bar from "@/components/Employee/E-Bar.vue";



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

// Sample real-time data
const totalEmployees = ref(452);
const employeeChange = ref('2 new employees added!');
const onTime = ref(360);
const onTimeChange = ref('-10% Less than yesterday');
const absent = ref(30);
const absentChange = ref('+3% Increase than yesterday');
const lateArrival = ref(62);
const lateArrivalChange = ref('+5% Increase than yesterday');
const earlyDepartures = ref(6);
const earlyDeparturesChange = ref('-10% Less than yesterday');
const timeOff = ref(42);
const timeOffChange = ref('+2% Increase than yesterday');

// Update time every second
const updateTime = () => {
  currentTime.value = formatTime(new Date());
  currentDate.value = formatDate(new Date());
};

// Simulate fetching real-time data
const fetchData = () => {
  // Simulate data update
  totalEmployees.value = 452 + Math.floor(Math.random() * 10);
  onTime.value = 360 + Math.floor(Math.random() * 10);
  absent.value = 30 + Math.floor(Math.random() * 5);
  lateArrival.value = 62 + Math.floor(Math.random() * 5);
  earlyDepartures.value = 6 + Math.floor(Math.random() * 3);
  timeOff.value = 42 + Math.floor(Math.random() * 5);

  // Update change text
  employeeChange.value = '2 new employees added!';
  onTimeChange.value = '-10% Less than yesterday';
  absentChange.value = '+3% Increase than yesterday';
  lateArrivalChange.value = '+5% Increase than yesterday';
  earlyDeparturesChange.value = '-10% Less than yesterday';
  timeOffChange.value = '+2% Increase than yesterday';
};

// Set intervals for updating time and fetching data
onMounted(() => {
  const timeInterval = setInterval(updateTime, 1000);
  const dataInterval = setInterval(fetchData, 5000);

  onUnmounted(() => {
    clearInterval(timeInterval);
    clearInterval(dataInterval);
  });
});

// Generate random leave data
const generateRandomLeaveData = () => {
  const total = 7;
  const used = Math.floor(Math.random() * total);
  const remaining = total - used;

  return { remaining, used, total };
};

const leaves = ref([
  { title: 'Casual leave', ...generateRandomLeaveData() },
  { title: 'Stick leave', ...generateRandomLeaveData() },
  { title: 'Earned leave', ...generateRandomLeaveData() },
  { title: 'Ajustment leave', ...generateRandomLeaveData() },
  { title: 'Unpaid leave', ...generateRandomLeaveData() },
  { title: 'Half leave', ...generateRandomLeaveData() }
]);
</script>
