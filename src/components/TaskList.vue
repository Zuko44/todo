<script setup lang="ts">
import TaskItem from './TaskItem.vue';
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
</script>

<template>
  <div>
    <h3>Список задач</h3>
    <TaskItem
      v-for="task in tasksStore.tasks"
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
