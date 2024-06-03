<template>
  <div class="bg-white p-5 rounded-2xl shadow-2xl">
    <div class="flex justify-between items-center mb-4 pb-24">
      <p class="font-light text-xl">
        Weekly Attendance
      </p>
      <button
          class="bg-orange-400 hover:bg-orange-600 text-white px-2 rounded text-xs flex items-center"
          @click="exportChart"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            width="25"
            height="35"
            class="mr-2"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M4 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm3.5 10a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"
          />
        </svg>
        Export
      </button>
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
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import {ref} from "vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartRef = ref(null);

const exportChart = async () => {
  const chartElement = chartRef.value;
  if (chartElement) {
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new JsPDF('landscape', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Weekly attendance.pdf');
  }
};

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