<template>
  <div class="bg-white p-5 rounded-2xl shadow-2xl w-[55rem]">
    <div class="flex justify-between items-center mb-4">
      <p class="font-light text-xl">
        Attendance Comparison Chart
      </p>
      <button
          class="bg-blue-700 hover:bg-blue-900 text-white px-2 rounded text-xs flex items-center"
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
      <Line :data="attendanceChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const chartRef = ref(null);

const exportChart = async () => {
  await nextTick();
  const chartElement = chartRef.value;
  if (chartElement) {
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new JsPDF('landscape', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Attendance-comparison-chart.pdf');
  }
};

const today = new Date();
const labels = [];

for (let i = 11; i >= 0; i--) {
  const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
  labels.push(`${date.getDate()} ${date.toLocaleString('en-EN', { month: 'short' })}`);
}

const attendanceChartData = {
  labels,
  datasets: [
    {
      label: 'Daily',
      data: [60, 75, 60, 75, 91, 55, 75, 40, 60, 75, 60, 65],
      borderColor: '#FF8D06',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#FF8D06',
      fill: {
        target: 'origin',
        above: '#E0E5FA',
        below: '#E0E5FA',
        opacity: 0.5,
      },
      hidden: false,
    },
    {
      label: 'Weekly',
      data: [70, 78, 78, 80, 95, 75, 80, 50, 70, 80, 70, 50],
      borderColor: '#0054E8',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#0054E8',
      fill: {
        target: 'origin',
        above: '#E0E5FA',
        below: '#E0E5FA',
        opacity: 0.5,
      },
      hidden: true,
    },
    {
      label: 'Monthly',
      data: [85, 80, 75, 80, 85, 80, 70, 55, 70, 85, 70, 65],
      borderColor: '#5e5d5d',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#5e5d5d',
      fill: {
        target: 'origin',
        above: '#E0E5FA',
        below: '#E0E5FA',
        opacity: 0.5,
      },
      hidden: true,
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#000000',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
    title: {
      display: true,
      font: {
        size: 16,
        weight: 'bold',
      },
      color: '#0054E8',
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
        callback: function(value:any) {
          return value + ' %';
        },
      },
    },
    x: {
      grid: {
        display: true,
        color: '#D1D5DB',
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