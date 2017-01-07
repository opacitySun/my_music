

module.exports = {
	template: require('../../../views/layout/index.html'),
	data:function(){
		return {
			items:[
				{"id":1,"name":"hello11"},
				{"id":2,"name":"hello22"}
			]
		};
	},
	mounted: function () {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			
		});
	}
};