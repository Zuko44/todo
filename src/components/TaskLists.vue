<script setup lang="ts">
import { useTaskStore } from '../stores/tasks';
import { ref, onMounted } from 'vue';

const tasksStore = useTaskStore();

const selectAllTasks = () => {
  tasksStore.isActive = 1;
};

onMounted(() => {
  selectAllTasks();
});
</script>

<template>
  <div class="task">
    <div @click="selectAllTasks">
      <a :class="{ active: tasksStore.isActive === 1 }"
        >Все ({{ tasksStore.tasks.length }})</a
      >
    </div>
    <div @click="tasksStore.isActive = 2">
      <a :class="{ active: tasksStore.isActive === 2 }"
        >в работе({{
          tasksStore.tasks.filter((e) => e.done === false).length
        }})</a
      >
    </div>
    <div @click="tasksStore.isActive = 3">
      <a :class="{ active: tasksStore.isActive === 3 }"
        >сделано ({{
          tasksStore.tasks.filter((e) => e.done === true).length
        }})</a
      >
    </div>
  </div>
</template>

<style scoped>
.task {
  padding: 15px;
  border: 2px solid blueviolet;
  text-align: left;
  width: 95%;
  margin: 15px auto 0px;
  text-align: center;
}

.task div {
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
