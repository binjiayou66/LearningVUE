var app = new Vue({
    el: "#app",
    data: {
        columnTitles: ["","商品名称","商品单价","购买数量","操作"],
        list: [
            {id:1, name:"iPhone X", price:6888, count:1},
            {id:2, name:"iPhone Xs", price:8888, count:1},
            {id:3, name:"iPad", price:2888, count:1}
        ]
    },
    computed: {
        totalPrice: function () {
            var result = 0;
            for(var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                result += item.price * item.count;
            }
            // 将结果转 换为带有“千位分隔符”的数字
            return result.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleDelete: function (index) {
            this.list.splice(index,1);
        }
    }
});