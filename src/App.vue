<script setup>
import { ref, reactive, computed } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import useVuelidate from "@vuelidate/core";
import { required, GLOBAL_CONFIG } from "@/utils/validators";

import { useTodoListStore } from "@/store/ToDoList";

import TriStateButton from "./components/TriStateButton.vue";

const taskForm = reactive({
  newTask: "",
});

const filterTypes = ["pi-sort-alt", "pi-sort-alpha-down", "pi-sort-alpha-up-alt"];
const filterType = ref(0);
const nameFilter = ref("");

const store = useTodoListStore();
const rules = {
  newTask: { required },
};
const $v = useVuelidate(rules, taskForm, GLOBAL_CONFIG);

const createNewTask = async () => {
  const isFormCorrect = await $v.value.$validate();

  if (!isFormCorrect) return;

  store.addTodo(taskForm.newTask);
  taskForm.newTask = "";

  $v.value.$reset();
};

const compare = (a, b) => {
  if (a.content < b.content) {
    return filterType.value == 1 ? -1 : 1;
  }
  if (a.content > b.content) {
    return filterType.value == 1 ? 1 : -1;
  }
  return 0;
};
const filteredList = computed(() => {
  const filtered =
    store.todoList.filter((el) =>
      el.content.toLowerCase().includes(nameFilter.value.toLowerCase())
    ) || null;

  return filterType.value ? filtered.sort(compare) : filtered;
});
</script>

<template>
  <div class="flex flex-column align-items-center p-1">
    <header>
      <h1>To-Do App</h1>
    </header>

    <div class="mainSection">
      <form
        class="flex justify-content-between gap-3 mt-4"
        @submit.prevent="createNewTask"
      >
        <div class="flex-grow-1">
          <InputText
            v-model="taskForm.newTask"
            class="w-full"
            placeholder="* Enter task name"
            :class="{ 'p-invalid': $v.newTask.$error }"
          />
          <small v-if="$v.newTask.$error" class="p-error">
            {{ $v.newTask.$errors[0].$message }}
          </small>
        </div>
        <div>
          <Button label="Add Task" type="submit" icon="pi pi-plus" />
        </div>
      </form>

      <div class="flex justify-content-between mt-4">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="nameFilter"
            class="p-inputtext-sm"
            placeholder="Search task"
          />
        </span>
        <TriStateButton v-model="filterType" :icon-names="filterTypes" />
      </div>
      <div class="flex flex-column mt-2 gap-2">
        <div
          class="surface-card border-round flex justify-content-between align-items-center gap-4 p-2"
          v-for="(task, id) in filteredList"
          :key="id"
        >
          <div class="flex align-items-center gap-4">
            <div>
              <Button :label="`${task.id}`" />
            </div>

            <p class="taskContent capitalize">{{ task.content }}</p>
          </div>
          <div>
            <Button
              @click.prevent="store.deleteTodo(task.id)"
              icon="pi pi-trash"
              class="p-button-rounded p-button-outlined p-button-danger p-button-sm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "/node_modules/primeflex/primeflex.css";

body {
  font-size: 14px;
  font-family: var(--font-family);
  background-color: var(--surface-ground);
}
</style>

<style scoped>
.mainSection {
  min-width: 32rem;
  max-width: 32rem;
}

.taskContent {
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
}
</style>
