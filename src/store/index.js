import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [{
      id: Math.floor(10000 + Math.random() * 90000),
      title: "You can add tasks by clicking the + icon in the bottom right corner.",
      completed: false
    },
      {
        id: Math.floor(10000 + Math.random() * 90000),
        title: "Delete tasks by clicking the X icon.",
        completed: false
      },
      {
        id: Math.floor(10000 + Math.random() * 90000),
        title: "Mark completed tasks by clicking the ✓ icon",
        completed: true
      }]
  },
  getters: {
    getTaskByTitle: (state) => (searchString) => {
      const lowercasedSearchString = searchString.toLowerCase();
      return state.tasks.filter(task => task.title.toLowerCase().includes(lowercasedSearchString));
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, taskTitle) {
      const newTask = {
        id: Math.floor(10000 + Math.random() * 90000),
        title: taskTitle,
        completed: false
      };
      state.tasks.push(newTask);
      this.commit('saveTasksToLocalStorage');
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      this.commit('saveTasksToLocalStorage');
    },
    toggleTask(state, id) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.commit('saveTasksToLocalStorage');
      }
    },
    updateTaskOrder (state, sortedTasks) {
      state.tasks = sortedTasks;
      this.commit('saveTasksToLocalStorage');
    },
    saveTasksToLocalStorage(state) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        commit('setTasks', tasks);
      }
    }
  },
  modules: {}
});
