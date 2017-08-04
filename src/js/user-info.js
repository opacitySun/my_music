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
			var _this = this;
			$("#uploader-input").change(function(){
				var formData = new FormData($("#userinfo-form")[0]);
				_this.$http.post(ResourcePath+'/uploadHeadImgAction',formData).then(function(res){
					if(res.body.success == 1){
						$.toptip(res.body.flag, 'success');
						_this.uploadImgStyle = 'background-image:url("'+ResourcePath+res.body.img+'")';
					}else{
						$.toptip(res.body.flag, 'error');
					}
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