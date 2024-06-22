<template>
  <div class="bg-white p-5 rounded-2xl shadow-2xl w-[55rem]">
    <div class="flex justify-between items-center mb-4">
      <p class="font-light text-xl">
        {{ $t('attendanceComparisonChart.title') }}
      </p>
    </div>
    <div ref="chartRef" class="flex justify-between">
      <Line :data="attendanceChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

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
      data: [0, 75, 60, 75, 91, 55, 75, 40, 60, 75, 60, 65],
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
      hidden: false,
    },
    {
      label: 'Weekly',
      data: [0, 80, 95, 55, 65,90 , 0, 0, 70, 85, 15, 50],
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
      hidden: true,
    },
    {
      label: 'Monthly',
      data: [0, 80, 75, 80, 85, 80, 70, 55, 70, 85, 70, 65],
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