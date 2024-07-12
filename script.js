const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    task: '',
    todoList: [], // これは配列
  },
  methods: {
    // 関数はここ
    addTask: function() {
      console.log('次のタスクが追加されました：', this.task);
      // 配列の先頭に現在のタスク内容を追加する（最後尾の場合はpush）
      this.todoList.unshift(this.task);
      console.log('現在のToDo一覧：', this.todoList);
    },
    // 以下を追加、関数名はなんでもよい
    clearAll: function() {
      this.todoList = [];
      console.log('全てのToDoが消去されました');
    },
  },
});