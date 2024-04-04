<script setup lang="ts">
import TaskButton from './UI/TaskButton.vue';
import { Task } from '../types/index';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'toggleDone', value: number): void;
  (e: 'deleteTask', value: number): void;
}

const emit = defineEmits<Emits>();

const toggleDoneHandler = (id: number) => {
  emit('toggleDone', id);
};
const deleteTaskHandler = (id: number) => {
  emit('deleteTask', id);
};
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
            @click="toggleDoneHandler(task.id)"
          />
          <label for="checkbox">done</label>
        </div>
      </div>
      <div class="task_btns">
        <TaskButton @click="deleteTaskHandler(task.id)">Удалить</TaskButton>
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
