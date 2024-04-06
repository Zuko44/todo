<script setup lang="ts">
import { FilterTasks } from '../types/index';
import { useTaskStore } from '../stores/tasks';
import { ref, onMounted } from 'vue';

const tasksStore = useTaskStore();
const activeFilterOfTasks = ref<FilterTasks>();

interface Emits {
  (e: 'switchTaskFilter', value: FilterTasks): void;
}

const emit = defineEmits<Emits>();

const switchTaskFilter = (id: number) => {
  activeFilterOfTasks.value = id;
  emit('switchTaskFilter', activeFilterOfTasks.value);
};

onMounted(() => {
  switchTaskFilter(1);
});
</script>

<template>
  <div class="taskFilter">
    <div @click="switchTaskFilter(1)">
      <a :class="{ active: activeFilterOfTasks === 1 }"
        >Все ({{ tasksStore.tasks.length }})</a
      >
    </div>
    <div @click="switchTaskFilter(2)">
      <a :class="{ active: activeFilterOfTasks === 2 }"
        >в работе({{
          tasksStore.tasks.filter((e) => e.done === false).length
        }})</a
      >
    </div>
    <div @click="switchTaskFilter(3)">
      <a :class="{ active: activeFilterOfTasks === 3 }"
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
