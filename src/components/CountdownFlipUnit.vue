<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const props = defineProps({
  value: [String, Number],
  label: String,
});

const digits = computed(() => (props.value ?? 0).toString().padStart(2, "0").split(""));
const previousDigits = ref([...digits.value]);

watch(digits, (_newDigits, oldDigits) => {
  previousDigits.value = oldDigits;
});
</script>

<template>
  <div class="fclock-unit">
    <div class="fclock-digits">
      <div v-for="(digit, index) in digits" :key="index" class="time-segment">
        <div class="segment-inner">
          <div class="segment-half segment-top">
            <span>{{ digit }}</span>
          </div>
          <div class="segment-half segment-bottom">
            <span>{{ previousDigits[index] }}</span>
          </div>

          <div :key="digit" class="segment-overlay flip">
            <div class="overlay-top">
              <span>{{ previousDigits[index] }}</span>
            </div>
            <div class="overlay-bottom">
              <span>{{ digit }}</span>
            </div>
          </div>

          <div class="segment-line"></div>
        </div>
      </div>
    </div>
    <p class="fclock-label">{{ label }}</p>
  </div>
</template>

<style scoped>
.fclock-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fclock-digits {
  display: flex;
  gap: 0.25rem; /* gap-1 */
}

.time-segment {
  position: relative;
  display: block;
  font-weight: 900;
  width: 90px;
  height: 135px;
  font-size: 110px;
}

.segment-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #111;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); /* shadow-2xl */
}

.segment-half {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.segment-top {
  top: 0;
  align-items: flex-end;
  background-color: #1a1a1a;
  color: #eee;
}

.segment-top span {
  transform: translateY(50%);
}

.segment-bottom {
  bottom: 0;
  align-items: flex-start;
  background-color: #222;
  color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
}

.segment-bottom span {
  transform: translateY(-50%);
}

.segment-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 20;
  transform: translateY(-50%);
}

.fclock-label {
  margin-top: 1rem;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  font-weight: bold;
}

/* RESPONSIVE LOGIC */
@media (max-width: 1180px) {
  .time-segment {
    width: 81px;
    height: 121px;
    font-size: 99px;
  }
}

@media (max-width: 768px) {
  .time-segment {
    width: 70px;
    height: 100px;
    font-size: 80px;
  }
}

/* ANIMATIONS */
span {
  display: block;
  line-height: 0;
}

.segment-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  perspective: 500px;
}

.overlay-top, .overlay-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  backface-visibility: hidden;
}

.overlay-top {
  top: 0;
  align-items: flex-end;
  background-color: #1a1a1a;
  color: #eee;
  z-index: 11;
  transform-origin: bottom;
}

.overlay-top span { transform: translateY(50%); }

.overlay-bottom {
  bottom: 0;
  align-items: flex-start;
  background-color: #222;
  color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  transform-origin: top;
  transform: rotateX(90deg);
}

.overlay-bottom span { transform: translateY(-50%); }

.flip .overlay-top { animation: flip-top 0.4s ease-in forwards; }
.flip .overlay-bottom { animation: flip-bottom 0.4s ease-out 0.4s forwards; }

@keyframes flip-top {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(-90deg); }
}

@keyframes flip-bottom {
  0% { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}
</style>
