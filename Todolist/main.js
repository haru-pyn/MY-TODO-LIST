const draggable = window['vuedraggable'];
console.log(draggable);
new Vue({
  el: '#to-do',
  components: {
    'draggable': draggable,
  },
  data: {
    newTask: '',
    newDate: '',
    uniqueKey: 0,
    todos: JSON.parse(localStorage.getItem('todos')) || []
  },
  mounted () {
    this.clock();
    // 1000ミリ秒ごとに処理を実効
    setInterval(() => { this.clock() }, 1000)
  },
  methods: {
    addTodo: function () {
      if (this.newTask == '') return;
      this.todos.push(
        {
          task: this.newTask,
          isCompleted: false,
          date: this.newDate,
          id: ++this.uniqueKey
        }
      );
      this.newTask = '';
      this.setTodos()
    },
    editTask: function (id) {
      var newTitle = window.prompt("以下内容で更新します。");
      if (newTitle === "") {
        alert("入力欄が空欄です。");
      } else if(newTitle !==null)
      {this.edit(id,newTitle);}}, 
    edit(id,task) {
      var editIndex = '';
      this.todos.some(function (value,index){
        if(value.id===id){
          editIndex = index;
        }
      });
      this.todos[editIndex].task=task;
      this.setTodos()
    },
    deleteTodo: function (todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      this.setTodos()
    },
    setTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    clock() {
      var myDay = new Array("日", "月", "火", "水", "木", "金", "土");
      var now = new Date();
      var year = now.getFullYear(); // 年
      var month = now.getMonth() + 1; // 月
      var date = now.getDate(); // 日
      var day = now.getDay();
      var hour = now.getHours(); // 時
      var min = now.getMinutes(); // 分
      var sec = now.getSeconds(); // 秒

      // 数値が1桁の場合、頭に0を付けて2桁で表示する指定
      if (hour < 10) { hour = "0" + hour; }
      if (min < 10) { min = "0" + min; }
      if (sec < 10) { sec = "0" + sec; }

      var clock2 = year + '-' + month + '-' + date + '（' + myDay[day] + '曜日）' + hour + '時' + min + '分' + sec + '秒';

      document.getElementById('clock-02').innerHTML = clock2.toLocaleString(); // div id="clock-02"

    }
  },
});