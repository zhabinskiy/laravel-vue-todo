<template>
  <div>
    <div
      class="flex flex-1 items-center justify-center px-8 py-16 bg-white text-gray-500 border border-gray-400 border-3 border-dashed rounded"
      v-if="todos.length === 0"
    >
      <p class="text-center">
        Start adding todos to test the app. Simply type whatever you want, hit
        return, and call it a day.
      </p>
    </div>
    <draggable
      tag="div"
      class="flex flex-col"
      v-model="todos"
      v-bind="dragOptions"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <label
          class="flex relative items-center justify-between my-2 bg-white shadow rounded cursor-pointer active:cursor-grabbing hover:shadow-md transition-shadow duration-75"
          v-for="{ id, title, completed } in todos"
          :key="id"
        >
          <div
            class="flex flex-1 items-center px-4 py-2"
            :class="drag ? 'cursor-move cursor-grabbing' : 'cursor-pointer'"
          >
            <input
              type="checkbox"
              class="form-checkbox cursor-pointer"
              :checked="completed"
              @click="
                changeTodo({
                  id: id,
                  completed: !completed,
                })
              "
            />
            <span
              class="ml-4 px-2 py-1 rounded select-none focus:outline-none focus:bg-gray-200 focus:text-gray-800"
              :class="{
                'text-gray-500 line-through focus:no-underline': completed,
                'todo-error':
                  currentError.length > 0 && currentErrorInput === id,
              }"
              contenteditable="true"
              @focusout="onFocusOut($event, id, title)"
              @keydown.enter.prevent="changeTodoAndBlur($event, id, title)"
              @click.prevent=""
            >
              {{ title }}
            </span>
          </div>
          <button
            class="group p-2 mr-2 hover:bg-red-100 rounded-full focus:outline-none focus:shadow-outline"
            @click="deleteTodo({ id: id })"
          >
            <svg
              class="fill-current text-gray-400 group-hover:text-red-600"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2L9 3H5C4.448 3 4 3.448 4 4C4 4.552 4.448 5 5 5H7H17H19C19.552 5 20 4.552 20 4C20 3.448 19.552 3 19 3H15L14 2H10ZM5 7V20C5 21.105 5.895 22 7 22H17C18.105 22 19 21.105 19 20V7H5Z"
              />
            </svg>
          </button>
          <span
            v-if="currentError.length > 0 && currentErrorInput === id"
            class="inline-block absolute z-10 ml-12 mt-20 px-3 py-1 bg-red-500 text-white rounded"
          >
            {{ currentError }}
          </span>
        </label>
      </transition-group>
    </draggable>

    <label class="relative">
      <div class="absolute inset-y-0 left-0 pl-4">
        <svg
          class="fill-current text-gray-500"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM11.0769 6.96155C11.0769 6.6854 11.3008 6.46155 11.5769 6.46155H12.4231C12.6992 6.46155 12.9231 6.68541 12.9231 6.96155V11.0769H17.0385C17.3146 11.0769 17.5385 11.3008 17.5385 11.5769V12.4231C17.5385 12.6992 17.3146 12.9231 17.0385 12.9231H12.9231V17.0385C12.9231 17.3146 12.6992 17.5385 12.4231 17.5385H11.5769C11.3008 17.5385 11.0769 17.3146 11.0769 17.0385V12.9231H6.96155C6.6854 12.9231 6.46155 12.6992 6.46155 12.4231V11.5769C6.46155 11.3008 6.68541 11.0769 6.96155 11.0769H11.0769V6.96155Z"
          />
        </svg>
      </div>
      <input
        type="text"
        class="w-full form-input mt-3 sm:mt-8 py-3 px-12 bg-gray-200 border-1 border-transparent"
        :class="{
          error: currentError.length > 0 && !currentErrorInput,
        }"
        placeholder="Start typing new todo..."
        v-model="input"
        @keyup.enter="addTodoAndBlur(input)"
      />
      <span
        v-if="currentError.length > 0 && !currentErrorInput"
        class="inline-block mt-2 px-3 py-1 bg-red-500 text-white rounded"
        >{{ currentError }}</span
      >
    </label>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      input: '',
      isEditingStarted: false,
      isEditingFinished: true,
    }
  },
  computed: {
    todos: {
      get() {
        return this.$store.state.todos
      },
      set(value) {
        this.$store.commit('loadTodos', { todos: value })
      },
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        ghostClass: 'ghost',
        disabled: false,
      }
    },
    ...mapState(['currentError', 'currentErrorInput']),
  },
  mounted() {
    this.loadTodos()
  },
  watch: {
    todos(val, oldVal) {
      if (val > oldVal) {
        this.input = ''
      }
    },
    input(val, oldVal) {
      if (this.currentError.length > 0 && val !== oldVal) {
        this.removeError(this.$store.state)
      }
    },
  },
  methods: {
    ...mapMutations(['showError', 'removeError']),
    ...mapActions(['loadTodos', 'addTodo', 'deleteTodo', 'changeTodo']),
    addTodoAndBlur(input) {
      this.addTodo({ title: input })
    },
    changeTodoAndBlur(event, id, title, completed) {
      this.removeError()

      this.isEditingStarted = true
      this.isEditingFinished = false

      const newTodoText = event.target.innerText

      if (title !== newTodoText) {
        this.changeTodo({
          id,
          title: newTodoText,
        })

        this.isEditingFinished = true
      }

      event.target.blur()
      this.isEditingStarted = false
    },
    onFocusOut(event, id, title) {
      if (!this.isEditingStarted && this.isEditingFinished) {
        event.target.innerText = title
      }
    },
    onDragStart() {
      this.drag = true
    },
    onDragEnd(event) {
      this.drag = false

      const { oldIndex, newIndex } = event

      if (oldIndex === newIndex) {
        return
      }

      const todo = this.$store.state.todos.find(
        (todo) => todo.order === oldIndex + 1
      )
      const ghostTodo = this.$store.state.todos.find(
        (todo) => todo.order === newIndex + 1
      )

      this.changeTodo({
        id: todo.id,
        moveTo: ghostTodo.id,
      })
    },
  },
}
</script>

<style>
.ghost {
  @apply bg-gray-100 shadow-none border-2 border-dashed border-gray-200 !important;
}

.ghost div,
.ghost button {
  @apply opacity-0 !important;
}

.error {
  @apply border-red-500 !important;
}

.error:focus {
  box-shadow: 0 0 0 3px rgba(255, 45, 45, 0.5) !important;
}

.todo-error {
  @apply text-red-500 !important;
}
</style>
