<template>
  <div class="bg-gray-100">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

        <div class="p-12 ml-28 mt-4 space-y-10">
          <div class="grid grid-cols-3 mr-36">

            <!-- Card containing time and date -->
            <div class="bg-white p-20 rounded-3xl shadow-2xl w-96">
              <div class="flex items-center mt-5 mb-5">
                <TimeBasedIcon />
                <div class="ml-5">
                  <p class="text-xl text-gray-500 font-light">{{ currentTime }}</p>
                  <p class="text-gray-500 font-serif">{{ t('real') }}</p>
                </div>
              </div>
              <p class="text-xl mt-10 font-mono mb-12">{{ t('auj') }}: <br>{{ currentDate }}</p>
              <router-link to="/pointing" class="bg-blue-700 text-white p-3 px-10 py-4 rounded-2xl hover:bg-blue-900">
                {{ t('dashboard.viewAttendance') }}
              </router-link>
            </div>

            <!-- Cards for statistics -->
            <div class="grid grid-cols-1 gap-5">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-80">
                <StatCard
                    img="src/components/icons/TotalEmp.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#97CE71'/>
                              <path d='M4.72 6.676V6.412H10.36V6.676H4.72ZM7.672 9.496H7.408V3.7H7.672V9.496Z' fill='#43900C'/>
                              </svg>"
                    :title="t('statistics.totalEmployees.title')"
                    :value="String(totalEmployees)"
                    :change="employeeChange" />

                <StatCard
                    img="src/components/icons/Ontime.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#97CE71'/>
                              <path d='M3 10L5.5 7.5L7.5 9.5L10.75 6.25M11 9V6H8' stroke='#43910C'/>
                            </svg>"
                    :title="t('statistics.onTime.title')"
                    :value="String(onTime)"
                    :change="onTimeChange" />

                <StatCard
                    img="src/components/icons/Absent.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#CE7171'/>
                              <path d='M12 6L9.5 8.5L7.5 6.5L4.25 9.75M4 7V10H7' stroke='#910C0C'/>
                              </svg>"
                    :title="t('statistics.absent.title')"
                    :value="String(absent)"
                    :change="absentChange" />

              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-80">
                <StatCard
                    img="src/components/icons/Latearr.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#CE7171'/>
                              <path d='M12 6L9.5 8.5L7.5 6.5L4.25 9.75M4 7V10H7' stroke='#910C0C'/>
                              </svg>"
                    :title="t('statistics.lateArrival.title')"
                    :value="String(lateArrival)"
                    :change="lateArrivalChange" />

                <StatCard
                    img="src/components/icons/Earlydep.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#97CE71'/>
                              <path d='M3 10L5.5 7.5L7.5 9.5L10.75 6.25M11 9V6H8' stroke='#43910C'/>
                            </svg>"
                    :title="t('statistics.earlyDepartures.title')"
                    :value="String(earlyDepartures)"
                    :change="earlyDeparturesChange" />

                <StatCard
                    img="src/components/icons/Timeoff.svg"
                    svg-code="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <circle opacity='0.3' cx='7.5' cy='7.5' r='7.5' fill='#CCDDFA'/>
                              <path d='M3 10L5.5 7.5L7.5 9.5L10.75 6.25M11 9V6H8' stroke='#0054E8'/>
                            </svg>"
                    :title="t('statistics.pendingRequest.title')"
                    :value="String(pendingLeaveRequest)"
                    :change="timeOffChange" />

              </div>
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
import StatCard from '../components/StatCard.vue';
import Chart from '../components/Chart.vue';
import Bar from '../components/Bar.vue';
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import TimeBasedIcon from "../components/TimeBasedIcon.vue";
import { useStorage } from '@vueuse/core'

import { useI18n } from 'vue-i18n';
const { t } = useI18n({
  useScope: "global",
  inheritLocale: true,
});

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

// Use the pointing data to update the statistics
const pointing =  useStorage('pointing', []);
const employees = useStorage('employees', []);
const leave = useStorage('leave', []);

const totalEmployees = computed(() => employees.value.length);
const employeeChange = ref('2 new employees added!');
const lateArrival = computed(() => pointing.value.filter((item) => item.status === 'Late arrival').length)
const lateArrivalChange = ref('+5% Increase than yesterday');
const onTime = computed(() => pointing.value.filter((item) => item.status === 'On time').length)
const onTimeChange = ref('-10% Less than yesterday');
const absent = computed(() => pointing.value.filter((item) => item.status === 'Absent').length)
const absentChange = ref('+3% Increase than yesterday');
const earlyDepartures = computed(() => pointing.value.filter((item) =>
    item.checkOut === '17:30'
    || item.checkOut === '17:00'
    || item.checkOut === '17:45'
    || item.checkOut === '17:15').length)
const earlyDeparturesChange = ref('-10% Less than yesterday');
const pendingLeaveRequest =  computed(() => leave.value.filter((item) => item.status === 'Pending').length)
const timeOffChange = ref('+0% Increase than yesterday');

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

</script>