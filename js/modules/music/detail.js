

module.exports = {
	template: require('../../../views/music/detail.html'),
	data:function(){
		return {
			msg:{}
		};
	},
	created:function(){
		//获取params的参数ID
		var id = this.$route.params.id;
		id = Number(id);

		//根据获取的参数ID，返回不同的data对象（真实业务中，这里应该是Ajax获取数据）
		if(id === 1){
			this.msg = {
				"id":id,
				"name":"hello111",
				"age":24
			};
		}else{
			this.msg = {"id":id,"name":"hello111","age":24};
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			//console.log(this.$data);
		});
	}
};