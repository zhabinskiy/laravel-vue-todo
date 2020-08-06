<template>
  <div class="xl:container mx-auto px-4 sm:px-8 py-4 lg:py-16">
    <div
      class="flex flex-1 flex-col flex-col-reverse sm:flex-row sm:space-x-8 md:space-x-16 text-gray-700"
    >
      <div class="flex flex-col sm:w-56 md:w-64 space-y-8 sm:divide-y">
        <div class="flex flex-col mt-16">
          <h2
            class="text-sm text-gray-800 uppercase tracking-wider font-semibold"
          >
            Stack:
          </h2>
          <ul
            class="mt-1 sm:mt-3 space-x-2 sm:space-x-0 space-y-2 sm:space-y-1"
          >
            <li class="inline-block sm:block">Laravel</li>
            <li class="inline-block sm:block">Laravel Mix</li>
            <li class="inline-block sm:block">Webpack</li>
            <li class="inline-block sm:block">Vue</li>
            <li class="inline-block sm:block">Vuex</li>
            <li class="inline-block sm:block">TailwindCSS</li>
          </ul>
        </div>

        <div class="pt-2 sm:pt-6 text-gray-500">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <img src="/img/avatar.png" class="w-10 h-10" />
            <p class="mt-4 sm:ml-4 sm:mt-0">
              Crafted by Tino&nbsp;Zhabinskiy in August,&nbsp;2020
            </p>
          </div>
          <ul class="list-none -ml-2 mt-3">
            <li class="inline-block sm:block">
              <a
                class="inline-block underline transition duration-75 px-2 py-1 hover:bg-gray-100 hover:text-gray-700 transform active:scale-95"
                href="mailto:mail@zhabinskiy.me"
                target="_blank"
                rel="noopener nofollow"
                >mail@zhabinskiy.me
              </a>
            </li>
            <li class="inline-block sm:block">
              <a
                class="inline-block underline transition duration-75 px-2 py-1 hover:bg-gray-100 hover:text-gray-700 transform active:scale-95"
                href="https://github.com/zhabinskiy"
                target="_blank"
                rel="noopener nofollow"
                >Github</a
              >
            </li>
            <li class="inline-block sm:block">
              <a
                class="inline-block underline transition duration-75 px-2 py-1 hover:bg-gray-100 hover:text-gray-700 transform active:scale-95"
                href="https://twitter.com/zzzhabinskiy"
                target="_blank"
                rel="noopener nofollow"
                >Twitter
              </a>
            </li>
            <li class="inline-block sm:block">
              <a
                class="inline-block underline transition duration-75 px-2 py-1 hover:bg-gray-100 hover:text-gray-700 transform active:scale-95"
                href="https://dribbble.com/zhabinskiy"
                target="_blank"
                rel="noopener nofollow"
                >Dribbble</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1 space-y-6 sm:space-y-12">
        <div class="flex flex-col lg:w-3/4 space-y-4">
          <h1 class="text-3xl font-bold text-gray-800">Todo App</h1>
          <p>
            Hey there. That's my first Laravel app. I've built a simple Vue SPA
            to test it out.<br />
            There is RESTful API so you can
            <code class="bg-yellow-200 text-sm font-semi px-2 py-1 rounded"
              >GET</code
            >,
            <code class="bg-yellow-200 text-sm font-semi px-2 py-1 rounded"
              >POST</code
            >,
            <code class="bg-yellow-200 text-sm font-semi px-2 py-1 rounded"
              >PATCH</code
            >, and
            <code class="bg-yellow-200 text-sm font-semi px-2 py-1 rounded"
              >DELETE</code
            >
            items. Also, you can reordering todos by drag: it's simple as
            that.<br />
            These todos are public, so please be a good person and don't abuse
            the prototype :)
          </p>
        </div>

        <TodoList />
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
  },
}
</script>
