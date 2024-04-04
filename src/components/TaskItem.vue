<script setup lang="ts">
import TaskButton from './UI/TaskButton.vue';
import { Task } from '../types/index';
import { useTaskStore } from '../stores/tasks';

interface Props {
  task: Task;
}

const tasksStore = useTaskStore();

const props = defineProps<Props>();
</script>

<template>
  <div class="task">
    <div>
      <div>{{ props.task.body }}</div>
    </div>
    <div class="subtask">
      <div>
        <div>
          <input
            type="checkbox"
            :checked="props.task.done"
            @click="tasksStore.changedDoneHandler(task.id)"
          />
          <label for="checkbox">done</label>
        </div>
      </div>
      <div class="task_btns">
        <TaskButton @click="tasksStore.deleteTaskHandler(task.id)"
          >Удалить</TaskButton
        >
      </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subtask {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
}
</style>
