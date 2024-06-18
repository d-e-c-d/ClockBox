<template>
  <div class="bg-white p-5 rounded-2xl shadow-2xl">
    <div class="flex justify-between items-center mb-4 pb-24">
      <p class="font-light text-xl">
        Weekly Attendance
      </p>
    </div>

    <div ref="chartRef" class="flex justify-between">
      <Bar :data="weeklyAttendanceChartData" :options="chartOptions"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const weeklyAttendanceChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',],
  datasets: [
    {
      label: 'Daily Work Time ',
      data: [86, 80, 95, 55, 65,],
      backgroundColor: '#FF8D06',
      borderWidth: 1,
      barThickness: 20,
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: '#D1D5DB',
      },
      ticks: {
        font: {
          size: 12,
        },
        callback: function(value: any) {
          return value + ' %';
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
};
</script>