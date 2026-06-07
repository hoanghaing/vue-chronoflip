<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import CountdownFlipUnit from "./CountdownFlipUnit.vue";

const props = defineProps({
  date: { type: String, default: "2026-01-01T00:00:00" },
});

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

const updateTime = () => {
  const diff = new Date(props.date).getTime() - new Date().getTime();
  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0;
    return clearInterval(timer);
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((diff / 1000 / 60) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="fclock-container">
    <CountdownFlipUnit :value="days" label="Days" />
    <CountdownFlipUnit :value="hours" label="Hours" />
    <CountdownFlipUnit :value="minutes" label="Minutes" />
    <CountdownFlipUnit :value="seconds" label="Seconds" />
  </div>
</template>

<style scoped>
.fclock-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; /* Tương đương gap-6 */
}

@media (max-width: 1180px) {
  .fclock-container {
    gap: 0.75rem; /* gap-3 */
  }
}

@media (max-width: 768px) {
  .fclock-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1rem;
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
