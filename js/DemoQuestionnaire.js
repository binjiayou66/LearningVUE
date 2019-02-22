Vue.component('question-page', {
    props: {
        questionData: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            checkedValue: ''
        }
    },
    methods: {
        nextPage: function () {
            this.$emit('gonextpage');
        },
        prePage: function () {
            this.$emit('goprepage');
        },
        submit: function () {
            this.$emit('gosubmit');
        }
    },
    template: "\
    <div>\
        <div>{{ questionData.index + 1 }}.{{ questionData.question }}</div>\
        <div v-if=\"questionData.type==='single'\" v-for=\"option in questionData.options\">\
            <input type=\"radio\" :value=\"option\" v-model=\"checkedValue\">\
            <label :for=\"option\">{{ option }}</label>\
        </div>\
        <div v-if=\"questionData.type==='multiple'\" v-for=\"option in questionData.options\">\
            <input type=\"checkbox\" :value=\"option\">\
            <label :for=\"option\">{{ option }}</label>\
        </div>\
        <div v-if=\"questionData.type==='input'\">\
            <textarea placeholder=\"\"></textarea>\
        </div>\
        <div v-if=\"questionData.firstPage\">\
            <button @click=\"nextPage\">下一步</button>\
        </div>\
        <div v-else-if=\"questionData.lastPage\">\
            <button @click=\"submit\">提交</button>\
            <button @click=\"prePage\">上一步</button>\
        </div>\
        <div v-else>\
            <button @click=\"nextPage\">下一步</button>\
            <button @click=\"prePage\">上一步</button>\
        </div>\
    </div>",
});
var app = new Vue({
    el: '#app',
    data: {
        currentPage: 0,
        questions: [
            {
                index: 0,
                question: '请问您的性别是：',
                options: ['男','女','保密'],
                type: 'single',
                firstPage: true,
                lastPage: false
            },
            {
                index: 1,
                question: '请问您的年龄是：',
                options: ['小于18岁','18-30岁','30-40岁','40-50岁','50岁以上'],
                type: 'single',
                firstPage: false,
                lastPage: false
            },
            {
                index: 2,
                question: '请选择您的爱好：',
                options: ['看书','游泳','跑步','看电影','听音乐'],
                type: 'multiple',
                firstPage: false,
                lastPage: false
            },
            {
                index: 3,
                question: '请问您的职业是：',
                options: ['工人','农民','干部','军人','其他'],
                type: 'single',
                firstPage: false,
                lastPage: false
            },
            {
                index: 4,
                question: '请介绍一下你自己：',
                options: [],
                type: 'input',
                firstPage: false,
                lastPage: true
            },
        ],
    },
    methods: {
        handleNextPage: function () {
            this.currentPage++;
            console.log(this.currentPage);
        },
        handlePrePage: function () {
            this.currentPage--;
            console.log(this.currentPage);
        },
        handleSubmit: function () {
            alert("感谢您的参与");
        }
    }
});