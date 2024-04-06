<script setup lang="ts">
import TasksFilter from '../components/TasksFilter.vue';
import TaskItem from './TaskItem.vue';
import { Task, FilterTasks } from '../types/index';
import { useTaskStore } from '../stores/tasks';
import { ref } from 'vue';

// interface Props {
//   tasks: Task[];
// }

// const props = defineProps<Props>();
const numberOfStatusTasks = ref<FilterTasks>(FilterTasks.All);
const tasksStore = useTaskStore();

const toggleDoneHandler = (id: number) => {
  tasksStore.toggleDoneHandler(id);
};
const deleteTaskHandler = (id: number) => {
  tasksStore.deleteTaskHandler(id);
};

const switchTaskFilter = (id: number) => {
  numberOfStatusTasks.value = id;
};

const switchTasksHandler = (activeFIlter: FilterTasks): Task[] => {
  let switchedTasks: Task[] = [];
  if (activeFIlter === FilterTasks.All) {
    switchedTasks = tasksStore.tasks;
  }
  if (activeFIlter === FilterTasks.InWork) {
    switchedTasks = tasksStore.tasks.filter((e) => e.done === false);
  }
  if (activeFIlter === FilterTasks.Done) {
    switchedTasks = tasksStore.tasks.filter((e) => e.done === true);
  }
  return switchedTasks;
};
</script>

<template>
  <TasksFilter @switchTaskFilter="switchTaskFilter" />
  <div>
    <h3>Список задач</h3>
    <TaskItem
      v-for="task in switchTasksHandler(numberOfStatusTasks)"
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
