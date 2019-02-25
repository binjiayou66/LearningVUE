Vue.component('sortabletable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    mounted: function () {
        this.makeColums();
        this.makeData();
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    methods: {
        makeColums: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                col._sortType = 'normal';
                col._index = index;

                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                row._index = index;

                return row;
            });
        },
        handleSortByAsc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';

            this.currentData.sort(function (a, b) {
                return a[key] > b[key] ? 1 : -1;
            });
        },
        handleSortByDesc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';

            this.currentData.sort(function (a, b) {
                return a[key] < b[key] ? 1 : -1;
            });
        }
    },
    render: function (createElement) {
        var _this = this;
        var ths = [];
        this.currentColumns.forEach(function (col, index) {
            if (col.sortable) {
                ths.push(createElement('th', [
                    createElement('span', col.title),
                    createElement('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByAsc(index);
                            }
                        }
                    }, '↑'),
                    createElement('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByDesc(index);
                            }
                        }
                    }, '↓')
                ]));
            } else {
                ths.push(createElement('th', col.title));
            }
        });
        var trs = [];
        this.currentData.forEach(function (row) {
            var tds = [];
            _this.currentColumns.forEach(function (cell) {
                tds.push(createElement('td', row[cell.key]));
            });
            trs.push(createElement('tr', tds));
        });
        return createElement('table', [
            createElement('thead', [createElement('tr', ths)]),
            createElement('tbody', trs)
        ]);
    }
})

var app = new Vue({
    el: "#app",
    data: {
        columns: [
            {
                title: "姓名",
                key: "name",
                sortable: false
            },
            {
                title: "年龄",
                key: "age",
                sortable: true
            }
        ],
        data: [
            {
                name: "王小明",
                age: 18,
                birthday: "1999-02-21",
                address: "北京市朝阳区苟药居"
            },
            {
                name: "李红",
                age: 16,
                birthday: "1999-02-21",
                address: "北京市朝阳区苟药居"
            },
            {
                name: "张飞",
                age: 10,
                birthday: "1999-02-21",
                address: "北京市朝阳区苟药居"
            },
            {
                name: "李磊",
                age: 20,
                birthday: "1999-02-21",
                address: "北京市朝阳区苟药居"
            }
        ]
    }
});