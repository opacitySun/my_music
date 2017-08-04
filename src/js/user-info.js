module.exports = {
	data() {
		return {
			points:0,
			uploadImgStyle:'background-image:url("'+ResourcePath+'/files/default.png")'
		}
	},
	created(){
		$("main").addClass("h100");
		$("footer").addClass("hidden");
	},
	mounted() {
		this.$nextTick(function () {
			this.uploadImgFn();
		});
	},
	methods:{
		//返回
		goback:function(){
			$("main").removeClass("h100");
			$("footer").removeClass("hidden");
			this.$router.go(-1);
		},
		//上传头像
		uploadImgFn:function(){
			var http = this.$http;
			$("#uploader-input").change(function(){
				var formData = new FormData($("#userinfo-form")[0]);
				http.post(ResourcePath+'/uploadHeadImgAction',formData).then(function(res){
					console.log(res);
				},function(err){
					console.log(err);
				});
			});
		},
		//提交
		submitFn:function(){
			
		}
	}
};