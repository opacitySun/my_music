module.exports = {
	data() {
		return {
			points:0
		}
	},
	created(){
		$("main").addClass("h100");
		$("footer").addClass("hidden");
	},
	methods:{
		//返回
		goback:function(){
			this.$router.go(-1);
		},
		//上传头像
		uploadImgFn:function(){

		},
		//提交
		submitFn:function(){
			
		}
	}
};