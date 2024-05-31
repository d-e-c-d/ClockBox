<template>
  <div class="bg-gray-100">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-1">
        <div class="flex flex-col justify-center items-center">
          <Sidebar />
        </div>

        <!-- Zone principale du contenu -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="bg-white shadow-md rounded">
            <div class="p-4">
              <h2 class="text-lg font-bold">Attendance Overview</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                <tr>
                  <th class="px-4 py-2">ID</th>
                  <th class="px-4 py-2">Employee</th>
                  <th class="px-4 py-2">Role</th>
                  <th class="px-4 py-2">Department</th>
                  <th class="px-4 py-2">Date</th>
                  <th class="px-4 py-2">Status</th>
                  <th class="px-4 py-2">Work Hours</th>
                </tr>
                </thead>
                <tbody>
                <!-- Les données d'attendance seront affichées ici -->
                <tr v-for="(attendance, index) in attendances" :key="index">
                  <td class="px-4 py-2">{{ attendance.id }}</td>
                  <td class="px-4 py-2">{{ attendance.employee }}</td>
                  <td class="px-4 py-2">{{ attendance.role }}</td>
                  <td class="px-4 py-2">{{ attendance.department }}</td>
                  <td class="px-4 py-2">{{ attendance.date }}</td>
                  <td class="px-4 py-2">{{ attendance.status }}</td>
                  <td class="px-4 py-2">{{ attendance.checkIn }}</td>
                  <td class="px-4 py-2">{{ attendance.checkOut }}</td>
                  <td class="px-4 py-2">{{ attendance.workHours }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import Sidebar from "@/components/Sidebar.vue";
import Header from "../components/Header.vue";

const attendances = [
  {
    id: 2341421,
    employee: 'Ahmed Rashdan',
    role: 'Help Desk Executive',
    department: 'IT',
    date: '29 July 2023',
    status: 'Work from office',
    checkIn: '09:00',
    checkOut: '18:00',
    workHours: '10h 2m',
  }]
</script>
