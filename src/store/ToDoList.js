import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
    state: () => ({
        todoList: JSON.parse(localStorage.getItem("todoList")) || [],
        id: JSON.parse(localStorage.getItem("id")) || 1
    }),
    actions: {
        addTodo(content) {
            this.todoList.push({ id: this.id++, content })
            localStorage.setItem("todoList", JSON.stringify(this.todoList))
            localStorage.setItem("id", JSON.stringify(this.id))
        },
        deleteTodo(id) {
            this.todoList = this.todoList.filter((object) => {
                return object.id !== id;
            });

            localStorage.setItem("todoList", JSON.stringify(this.todoList))
        }
    },
})