<script setup>
import { ref, defineEmits } from "vue";
import Button from "primevue/button";

const props = defineProps({
  modelValue: {
    type: Number,
    default() {
      return 0;
    },
  },
  iconNames: {
    type: Array,
    default() {
      return ["pi-sort-alt", "pi-sort-alpha-down", "pi-sort-alpha-up-alt"];
    },
  },
});

const state = ref(props.modelValue);
const emits = defineEmits(["update:modelValue"]);

const updateState = () => {
  if (state.value == 2) {
    state.value = 0;
  } else {
    state.value++;
  }

  emits("update:modelValue", state.value);
};
</script>

<template>
  <Button
    :icon="`pi ${props.iconNames[state]}`"
    class="p-button-rounded mr-2"
    @click.prevent="updateState"
  />
</template>
