<script setup lang="ts">
import TaskButton from './UI/TaskButton.vue';
import { Task } from '../types/index';
import { ref } from 'vue';

// interface Emits {
//   (e: 'createTask', value: Task): void;
// }
// const emit = defineEmits<Emits>();

interface Emits {
  (e: 'createTask', value: Task): void;
}

const emit = defineEmits<Emits>();

const body = ref<string>('');

// const createHandler = (e: string) => {
//   emit('createTask', body.value);
//   body.value = '';
// };

const createTaskHandler = (e: Task) => {
  const id = Math.floor(Math.random() * 1000000);
  const text = body.value;
  const done = false;
  const task: Task = { id: id, body: text, done: done };
  emit('createTask', task);
  body.value = '';
};
</script>

<template>
  <form @submit.prevent>
    <h4>Создание задачи</h4>
    <input
      v-model="body"
      class="input"
      type="text"
      placeholder="текст задачи"
    />
    <TaskButton @click="createTaskHandler" class="main_button">
      Создать
    </TaskButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 95%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.main_button {
  margin-top: 15px;
}
</style>
