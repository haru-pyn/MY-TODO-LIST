new Vue({
  el: '#to-do',
  data: {
    newTask: '',
    newDate: '',
    todos: [
      { task: 'Rubyの勉強をする', isCompleted: false, date: '2022-11-05' },
      { task: 'Vue.jsのアプリを作る', isCompleted: false, date: '2022-04-10' },
      { task: 'Youtubeをみる', isCompleted: false, date: '2022-09-14' }
    ]
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
          date: this.newDate
        }
      );
      this.newTask = '';
    },
    deleteTodo: function (todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
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