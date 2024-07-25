new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
      itemsPerPageArray: [4, 8], //表示ページ選択の配列
      search: '', // 検索文字列を保持するデータプロパティ
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Name', '説明', '省略', 'メモ'],
      items: [
        // もともとのアイテム情報
        {
          name: 'v-bind',
          説明: 'つながり',
          省略: ':',
          メモ: '◎',
          overlayDesign: 'a:<a :href="キー名"></a>'
        },
        {
          name: 'v-show',
          説明: 'みせる',
          省略: 9.0,
          メモ: 'v-showの使用例です。',
          overlayDesign: 'うさぎ'
        },
        {
          name: 'v-if/v-else/v-else-if',
          説明: 'つながり',
          省略: ':',
          メモ: 'v-bindの使用例です。',
          overlayDesign: 'くま'
        },
        {
          name: 'v-for',
          説明: '繰り返し表示',
          省略: 'なし',
          メモ: 'key属性を使用したほうが良い/〇',
          overlayDesign: '<div v-for="(item, index) in items"></dv>'
        },
        {
          name: 'v-html/v-text',
          説明: 'html表記での表示/入力したままの表示',
          省略: 'なし',
          メモ: '◎',
          overlayDesign: 'ここに使用コードをかきますよー'
        },
        {
          name: 'v-cloak',
          説明: 'コンパイル終了までの非表示',
          省略: 'なし',
          メモ: '△',
          overlayDesign: 'cssでdisplay:noneを指定する必要あり'
        },
        {
          name: 'v-on',
          説明: '@',
          省略: ':',
          メモ: 'v-bindの使用例です。',
          overlayDesign: 'くま'
        },
      ],
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: '',
      formVisible: false,
      editFormVisible: false,
      newItem: {
        name: '',
        description: '',
        note: '',
        overlayDesign: ''
      },
      editedItem: {
        name: '',
        description: '',
        note: '',
        overlayDesign: ''
      },
      editedIndex: -1
    };
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    },
    displayedItems () {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    showCustomDesign(item) {
      this.dialogTitle = item.name;
      this.dialogContent = item.overlayDesign;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    openForm() {
      this.formVisible = true;
    },
    closeForm() {
      this.formVisible = false;
    },
    addNewPost() {
      this.items.push({
        name: this.newItem.name,
        説明: this.newItem.description,
        省略: this.newItem.note,
        メモ: this.newItem.overlayDesign,
        overlayDesign: this.newItem.overlayDesign
      });
      this.closeForm(); // フォームを閉じる
      this.clearForm(); // フォームの内容をクリア
    },
    clearForm() {
      this.newItem.name = '';
      this.newItem.description = '';
      this.newItem.note = '';
      this.newItem.overlayDesign = '';
    },
    editCard(item) {
      this.editedItem.name = item.name;
      this.editedItem.description = item.説明;
      this.editedItem.note = item.省略;
      this.editedItem.overlayDesign = item.overlayDesign;
      this.editedIndex = this.items.indexOf(item);
      this.editFormVisible = true;
    },
    closeEditForm() {
      this.editFormVisible = false;
      this.clearEditedItem();
    },
    saveEditedCard() {
      if (this.editedIndex > -1) {
        this.items.splice(this.editedIndex, 1, {
          name: this.editedItem.name,
          説明: this.editedItem.description,
          省略: this.editedItem.note,
          メモ: this.editedItem.overlayDesign,
          overlayDesign: this.editedItem.overlayDesign
        });
        this.closeEditForm();
        this.clearEditedItem();
      }
    },
    clearEditedItem() {
      this.editedItem.name = '';
      this.editedItem.description = '';
      this.editedItem.note = '';
      this.editedItem.overlayDesign = '';
      this.editedIndex = -1;
    }
  },
});