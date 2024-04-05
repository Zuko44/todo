<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import { Task } from '../types/index';
import { useTaskStore } from '../stores/tasks';

// interface Props {
//   tasks: Task[];
// }

// const props = defineProps<Props>();
const tasksStore = useTaskStore();

const toggleDoneHandler = (id: number) => {
  tasksStore.toggleDoneHandler(id);
};
const deleteTaskHandler = (id: number) => {
  tasksStore.deleteTaskHandler(id);
};

const switchTasksHandler = (id: number): Task[] => {
  let switchedTasks: Task[] = [];
  if (id === 1) {
    switchedTasks = tasksStore.tasks;
  }
  if (id === 2) {
    switchedTasks = tasksStore.tasks.filter((e) => e.done === false);
  }
  if (id === 3) {
    switchedTasks = tasksStore.tasks.filter((e) => e.done === true);
  }
  return switchedTasks;
};
</script>

<template>
  <div>
    <h3>Список задач</h3>
    <TaskItem
      v-for="task in switchTasksHandler(tasksStore.activeFilterOfTasks)"
      :key="task.id"
      :task="task"
      @deleteTask="deleteTaskHandler"
      @toggleDone="toggleDoneHandler"
    />
  </div>
</template>

<style scoped>
h3 {
  margin-top: 15px;
}
</style>
