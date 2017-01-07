

module.exports = {
	template: require('../../views/not-found.html'),
	data:function(){
		return {
			warning:'找不到页面'
		};
	},
	//在实例开始初始化时同步调用。此时数据观测、事件和 watcher 都尚未初始化
	beforeCreate:function(){
		console.log("beforeCreate..");
	},

	//在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。在编译开始前调用。
	created:function(){
		console.log("created..");
	},

	//在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。
	mounted: function () {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			console.log("ready..");
		});
	},

	//在开始销毁实例时调用。此时实例仍然有功能。
	beforeDestroy:function(){
		console.log("beforeDestroy..");
	},

	//在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，所有的子实例也已经被销毁。如果有离开过渡，destroyed 钩子在过渡完成之后调用。
	destroyed: function () {
		this.$nextTick(function () {
			console.log("destroyed..");
		});
	}
};