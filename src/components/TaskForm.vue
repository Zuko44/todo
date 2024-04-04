<script setup lang="ts">
import TaskButton from './UI/TaskButton.vue';
import { Task } from '../types/index';
import { useTaskStore } from '../stores/tasks';
import { ref } from 'vue';

const body = ref<string>('');
const tasksStore = useTaskStore();

const createTaskHandler = (e: Task) => {
  const task: Task = {
    id: Math.floor(Math.random() * 1000000),
    body: body.value,
    done: false,
  };
  tasksStore.createTaskHandler(task);
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
