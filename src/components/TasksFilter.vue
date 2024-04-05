<script setup lang="ts">
import { useTaskStore } from '../stores/tasks';
import { onMounted } from 'vue';

const tasksStore = useTaskStore();

const selectAllTasks = () => {
  tasksStore.activeFilterOfTasks = 1;
};

onMounted(() => {
  selectAllTasks();
});
</script>

<template>
  <div class="taskFilter">
    <div @click="selectAllTasks">
      <a :class="{ active: tasksStore.activeFilterOfTasks === 1 }"
        >Все ({{ tasksStore.tasks.length }})</a
      >
    </div>
    <div @click="tasksStore.activeFilterOfTasks = 2">
      <a :class="{ active: tasksStore.activeFilterOfTasks === 2 }"
        >в работе({{
          tasksStore.tasks.filter((e) => e.done === false).length
        }})</a
      >
    </div>
    <div @click="tasksStore.activeFilterOfTasks = 3">
      <a :class="{ active: tasksStore.activeFilterOfTasks === 3 }"
        >сделано ({{
          tasksStore.tasks.filter((e) => e.done === true).length
        }})</a
      >
    </div>
  </div>
</template>

<style scoped>
.taskFilter {
  padding: 15px;
  border: 2px solid blueviolet;
  text-align: left;
  width: 95%;
  margin: 15px auto 0px;
  text-align: center;
}

.taskFilter div {
  display: inline-block;
  margin: 0px 15px;
}

.active {
  color: red;
}

a:hover {
  color: blueviolet;
}

a:active {
  color: green;
}

a {
  color: blue;
  cursor: pointer;
}
</style>
