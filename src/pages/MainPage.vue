<script setup lang="ts">
import { Task } from '../types/index';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import { ref, onMounted, watch } from 'vue';

interface Emits {
  (e: 'createTask', value: Task): void;
}

const emit = defineEmits<Emits>();

const title = ref<string>('paper');
const changeRename = ref<boolean>(false);
const tasks = ref<Task[]>([]);

const createTaskHandler = (obj: Task) => {
  tasks.value.push(obj);
  parseStorage();
};

const initRename = () => {
  const localStorageValue = localStorage.getItem('rename');
  if (localStorageValue) {
    title.value = localStorageValue;
  }
};

const parseStorage = () => {
  const parsed = JSON.stringify(tasks.value);
  localStorage.setItem('tasks', parsed);
};

const checkTasks = () => {
  const localStorageValue = localStorage.getItem('tasks');
  let tasksStorage: Task[] = [];

  if (localStorageValue !== null) {
    tasksStorage = JSON.parse(localStorageValue);
    tasks.value = tasksStorage;
  }
};

watch(title, (newTitle) => {
  document.title = newTitle;
  localStorage.setItem('rename', newTitle);
});

onMounted(() => {
  initRename();
  checkTasks();
});
</script>

<template v-cloak>
  <div class="main">
    <div class="top">
      <div v-if="!changeRename">
        <h1 @click="changeRename = true">{{ title }}</h1>
      </div>
      <div v-if="changeRename">
        <input
          v-model="title"
          placeholder="новое название"
          @keyup.enter="changeRename = false"
        />
      </div>
    </div>
    <TaskForm @createTask="(obj: Task) => createTaskHandler(obj)" />
    <TaskList :tasks="tasks" />
  </div>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.main {
  text-align: center;
}

.top {
  margin: 15px 0px;
}

[v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner 0.6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}
</style>
