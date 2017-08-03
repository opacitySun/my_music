module.exports = {
	data() {
		return {
			points:0
		}
	},
	created(){
		
	},
	methods:{
		//跳转到用户中心
		goUser:function(){
			this.$router.push({ path: '/user' });
		},
		//上传头像
		uploadImgFn:function(){

		},
		//提交
		submitFn:function(){
			
		}
	}
};