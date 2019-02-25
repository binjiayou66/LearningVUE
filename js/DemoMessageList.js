// input.js
Vue.component('vInput', {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    render: function (c) {
        var _this = this;
        return c('div', [
            c('span', '昵称：'),
            c('input', {
                attrs: {type: 'text'},
                domProps: {value: _this.value},
                on: {
                    input: function (event) {
                        _this.value = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    }
});
Vue.component('vTextarea', {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    render: function (c) {
        var _this = this;
        return c('div', [
            c('span', '消息：'),
            c('textarea', {
                attrs: {placeholder: '请输入留言内容'},
                domProps: {value: _this.value},
                on: {
                    input: function (event) {
                        _this.value = event.target.value;
                        _this.$emit('input', event.target.value);
                    }
                }
            })
        ]);
    },
    methods: {
        focus: function () {
            this.$refs.message.focus();
        }
    }
});

// list.js
Vue.component('list', {
    props: {
        list: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    render: function (c) {
        var _this = this;
        var list = [];
        this.list.forEach(function (msg, index) {
            var node = c('div', { attrs: {class: 'list-item'} }, [
                c('span', msg.name + '：'),
                c('div', {attrs: {class: 'list-message'}}, [
                    c('p', msg.message),
                    c('a', {
                        attrs: { class: 'list-reply' },
                        on: {
                            click: function () {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复')
                ])
            ]);
            list.push(node);
        });
        if (this.list.length) {
            return c('div', {attrs:{class:'list'}}, list);
        } else {
            return c('div', {attrs:{class:'list-nothing'}}, '留言列表为空');
        }
    },
    methods: {
        handleReply: function (index) {
            this.$emit('reply', index);
        }
    }
});

// index.js
var app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: []
    },
    methods: {
        handleSend: function () {
            if (this.username === '') {
                window.alert('请输入昵称');
                return;
            }
            if (this.message === '') {
                window.alert('请输入消息');
                return;
            }
            this.list.push({name : this.username, message : this.message});
            this.message = '';
        },
        handleReply: function (index) {
            var name = this.list[index].name;
            this.message = '回复@' + name + '：';
        }
    }
});