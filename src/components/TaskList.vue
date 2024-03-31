<script setup lang="ts">
import { Task } from '../types/index';
import TaskItem from './TaskItem.vue';

interface Emits {
  (e: 'changedDone', value: boolean): void;
  (e: 'remove'): void;
}

interface Props {
  tasks: Task[];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//const tasks = ref<Task[]>([]);

const changedDoneHandler = (id: number, isDone: boolean) => {
  const task: Task = props.tasks.find((task) => task.id === id);
  task.done = isDone;
  parseStorage();
};

const deleteTaskHandler = (id: number) => {
  //props.tasks = props.tasks.filter((p) => p.id !== id);
  const serialNumber: number = props.tasks.findIndex((task) => task.id === id);
  props.tasks.splice(serialNumber, 1);
  parseStorage();
};

const parseStorage = () => {
  const parsed = JSON.stringify(props.tasks);
  localStorage.setItem('tasks', parsed);
};
</script>

<template>
  <div>
    <h3>Список задач</h3>
    <TaskItem
      v-for="task in props.tasks"
      :key="task.id"
      :task="task"
      @remove="deleteTaskHandler(task.id)"
      @changedDone="(isDone: boolean) => changedDoneHandler(task.id, isDone)"
    />
  </div>
</template>

<style scoped>
h3 {
  margin-top: 15px;
}
</style>
