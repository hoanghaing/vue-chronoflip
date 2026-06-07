# vue-chronoflip

A premium animated flip-clock countdown component for Vue 3.
<img width="799" height="159" alt="image" src="https://github.com/user-attachments/assets/476fd6eb-abb2-4384-9854-38426e163b5d" />

## Install

```bash
pnpm install vue-chronoflip
```

## Usage

```vue
<script setup>
import { Countdown } from 'vue-chronoflip'
</script>

<template>
  <Countdown date="2026-12-31T23:59:59" />
</template>
```

That's it — no separate CSS import needed, styles ship inside the component.

## Props

### `<Countdown />`

| Prop   | Type     | Default                  | Description                          |
|--------|----------|--------------------------|--------------------------------------|
| `date` | `String` | `"2026-01-01T00:00:00"`  | Target date/time to count down to.   |

Renders four flip units (Days, Hours, Minutes, Seconds) that animate as the countdown ticks.

## Global registration

```js
import { createApp } from 'vue'
import VueChronoFlip from 'vue-chronoflip'

createApp(App).use(VueChronoFlip).mount('#app')
```

This registers `<Countdown />` and `<CountdownFlipUnit />` globally.

## License

MIT
