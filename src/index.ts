import type { App } from 'vue';
import Countdown from './components/Countdown.vue';
import CountdownFlipUnit from './components/CountdownFlipUnit.vue';

export { Countdown, CountdownFlipUnit };
export { Countdown as VueFclock };

export default {
  install: (app: App) => {
    app.component('Countdown', Countdown);
    app.component('CountdownFlipUnit', CountdownFlipUnit);
  },
};
