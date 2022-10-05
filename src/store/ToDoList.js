import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
    state: () => ({
        todoList: [],
        id: 1
    }),
    actions: {
        addTodo(content) {
            this.todoList.push({ id: this.id++, content })
        },
        deleteTodo(id) {
            this.todoList = this.todoList.filter((object) => {
                return object.id !== id;
            });
        }
    },
})