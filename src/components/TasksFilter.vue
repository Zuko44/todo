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

const switchTaskFilter = (typeOfTasks: FilterTasks) => {
  activeFilterOfTasks.value = typeOfTasks;
  emit('switchTaskFilter', activeFilterOfTasks.value);
};

onMounted(() => {
  switchTaskFilter(FilterTasks.All);
});
</script>

<template>
  <div class="taskFilter">
    <div @click="switchTaskFilter(FilterTasks.All)">
      <a :class="{ active: activeFilterOfTasks === FilterTasks.All }"
        >Все ({{ tasksStore.tasks.length }})</a
      >
    </div>
    <div @click="switchTaskFilter(FilterTasks.InWork)">
      <a :class="{ active: activeFilterOfTasks === FilterTasks.InWork }"
        >в работе({{
          tasksStore.tasks.filter((e) => e.done === false).length
        }})</a
      >
    </div>
    <div @click="switchTaskFilter(FilterTasks.Done)">
      <a :class="{ active: activeFilterOfTasks === FilterTasks.Done }"
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
