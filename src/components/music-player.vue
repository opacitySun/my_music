<template>
    <div>
        <h1>Music Detail</h1>
		<hr/>

		<p>Hello Detail page!</p>

		<p>id:{{msg.id}}</p>
		<p>name:{{msg.name}}</p>
		<p>age:{{msg.age}}</p>
    </div>
</template>

<script>
export default {
	data(){
		return {
			msg:{}
		};
	},
	created(){
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
			this.msg = {"id":id,"name":"hello222","age":28};
		}
	},
	mounted() {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			//console.log(this.$data);
		});
	}
}
</script>