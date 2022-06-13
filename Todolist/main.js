const draggable = window['vuedraggable'];

const VModal = window["vue-js-modal"].default
Vue.use(VModal);
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
    this.getUniqueKey()
  },
  methods: {
    getUniqueKey: function () {
      if(this.todos.length === 0) {
        return
      }
    
      let maxUniqueKey = 0
      this.todos.forEach(function(todo) {
        if (maxUniqueKey < todo.id) {
          maxUniqueKey = todo.id
        }
      });

      this.uniqueKey = maxUniqueKey
    },
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
    editTask: function (todo) {
      this.$modal.show("edit-modal-" + todo.id);
    },
    edit(id,task) {
      var editIndex = '';
      this.todos.some(function (value,index){
        if(value.id===id){
          editIndex = index;
        }
      });
      this.todos[editIndex].task=task;
    },
    hide : function (todo) {
      this.setTodos()
      this.$modal.hide("edit-modal-" + todo.id);
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