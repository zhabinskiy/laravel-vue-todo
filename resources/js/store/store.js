import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    currentError: '',
    currentErrorInput: null,
    errors: {
      507: {
        title: 'TODO_LIMIT',
        message:
          "You can't create more than 10 todos. Please delete some and try again.",
      },
      0: {
        title: 'CHARACTER_LIMIT',
        message: 'Your todo is a bit long. Try to use 80 characters or less.',
      },
      422: {
        title: 'WRONG_FORMAT',
        message: 'Sorry, your todo may only contain letters and numbers.',
      },
      429: {
        title: 'THROTTLE',
        message:
          "We are trying to prevent a server's abuse, so we can't get more than 25 todos in a minute.",
      },
    },
  },
  mutations: {
    loadTodos(state, payload) {
      state.todos = payload.todos
    },
    changeTodo(state, payload) {
      const { id, title, completed, order } = payload

      const todo = state.todos.find((todo) => todo.id === id)

      if (title !== undefined) {
        todo.title = title
      }

      if (completed !== undefined) {
        todo.completed = completed
      }

      if (order !== undefined) {
        todo.order = order
      }
    },
    reorderTodo(state, payload) {
      const { id, order } = payload

      state.todos.find((todo) => todo.id === id).order = order
    },
    showError(state, payload) {
      const { id, errorCode } = payload

      state.currentErrorInput = id
      state.currentError = state.errors[errorCode].message
      console.log(state.currentErrorInput)
    },
    removeError(state) {
      state.currentError = ''
      state.currentErrorInput = null
    },
  },
  actions: {
    loadTodos({ commit }) {
      axios.get('http://todo-app.test/api/todos').then((response) => {
        commit('loadTodos', {
          todos: response.data,
        })
      })
    },
    addTodo({ dispatch, commit }, payload) {
      const { title } = payload

      axios
        .post('http://todo-app.test/api/todos', {
          title,
          completed: false,
        })
        .then((response) => {
          dispatch('loadTodos')
        })
        .catch((error) => {
          commit('showError', {
            errorCode: error.response.status,
          })
        })
    },
    deleteTodo({ dispatch, commit }, payload) {
      const { id } = payload

      axios.delete(`http://todo-app.test/api/todos/${id}`).then(() => {
        dispatch('loadTodos')
      })
    },
    changeTodo({ dispatch, commit }, payload) {
      const { id, title, completed, moveTo } = payload

      axios
        .patch(`http://todo-app.test/api/todos/${id}`, {
          title,
          completed,
          moveTo,
        })
        .then(() => {
          commit('changeTodo', {
            id,
            title,
            completed,
            moveTo,
          })
        })
        .then(() => {
          dispatch('loadTodos')
        })
        .catch((error) => {
          commit('showError', {
            id,
            errorCode: error.response.status,
          })
        })
    },
  },
  modules: {},
})
