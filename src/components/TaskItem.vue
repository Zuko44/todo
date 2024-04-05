<script setup lang="ts">
import TaskButton from './UI/TaskButton.vue';
import { Task } from '../types/index';
import { useTaskStore } from '../stores/tasks';
import { ref } from 'vue';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const editTodo = ref<string>('');
const isEditTodo = ref<boolean>(false);
const tasksStore = useTaskStore();

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

const editTaskHandler = () => {
  isEditTodo.value = true;
  editTodo.value = props.task.body;
};

const saveEditedTaskHandler = (id: number, body: string) => {
  tasksStore.editTaskHandler(id, body);
  isEditTodo.value = false;
};
</script>

<template>
  <div class="task">
    <div>
      <div v-if="!isEditTodo" @click="editTaskHandler">
        {{ props.task.body }}
      </div>
      <div v-if="isEditTodo">
        <input
          v-model="editTodo"
          placeholeder="введите данные"
          @keyup.enter="saveEditedTaskHandler(props.task.id, editTodo)"
        />
      </div>
    </div>
    <div class="subtask">
      <div>
        <div>
          <input
            type="checkbox"
            :checked="props.task.done"
            @click="toggleDoneHandler(props.task.id)"
          />
          <label for="checkbox">done</label>
        </div>
      </div>
      <div class="task_btns">
        <TaskButton @click="deleteTaskHandler(props.task.id)"
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
