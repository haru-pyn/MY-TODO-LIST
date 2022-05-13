new Vue({
    el: '#to-do',
    data: {
      newTask: '',
      newDate: '',
      todos: [
        { task: 'Rubyの勉強をする', isCompleted: false,date:'2022-11-05'},
        { task: 'Vue.jsのアプリを作る', isCompleted: false,date:'2022-04-10' },
        { task: 'Youtubeをみる', isCompleted: false,date:'2022-09-14' }
      ]
    },
    methods: {
      addTodo: function() {
        if (this.newTask == '') return;
        this.todos.push(
          { task: this.newTask, isCompleted: false, date: this.newDate }
        );
        this.newTask = '';
      },
      deleteTodo: function (todo) {
        var index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
      },
    },

  });