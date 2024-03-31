<script setup lang="ts">
import { Task } from '../types/index';
import TaskButton from './UI/TaskButton.vue';

interface Props {
  task: Task;
}

interface Emits {
  (e: 'changedDone', value: boolean): void;
  (e: 'remove'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const changedDoneHandler = (e: any) => {
  /*const newTask: Task = { ...props.task, done: e.target.checked }
  newTask.done = e.target.checked*/
  emit('changedDone', e.target.checked);
  //console.log(e.target.checked);
};

const deleteTaskHandler = () => {
  emit('remove');
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
            @click="changedDoneHandler"
          />
          <label for="checkbox">done</label>
        </div>
      </div>
      <div class="task_btns">
        <TaskButton @click="deleteTaskHandler">Удалить</TaskButton>
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
