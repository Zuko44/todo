import { Task } from '../types/index';
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', () => {
  //const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const tasks = ref<Task[]>([]);
  const tasksOnLocalStorage = localStorage.getItem('tasks');

  const deleteTaskHandler = (id: number) => {
    tasks.value = tasks.value.filter((p) => p.id !== id);
    // const serialNumber: number = tasks.value.findIndex(
    //   (task: Task) => task.id === id,
    // );
    // tasks.value.splice(serialNumber, 1);
    saveTasks();
  };

  const changedDoneHandler = (id: number) => {
    /*const newTask: Task = { ...props.task, done: e.target.checked }
    newTask.done = e.target.checked*/
    const task = tasks.value.find((task: Task) => task.id === id);
    task.done = !task.done;
    saveTasks();
  };

  const createTaskHandler = (task: Task) => {
    tasks.value.push(task);
    saveTasks();
  };

  const saveTasks = () => {
    const parsed = JSON.stringify(tasks);
    localStorage.setItem('tasks', parsed);
  };

  const checkTasks = () => {
    let tasksStorage: Task[] = [];

    if (tasksOnLocalStorage !== null) {
      tasksStorage = JSON.parse(tasksOnLocalStorage)._value;
      tasks.value = tasksStorage;
    }
  };

  onMounted(() => {
    checkTasks();
  });

  return { tasks, deleteTaskHandler, changedDoneHandler, createTaskHandler };
});
