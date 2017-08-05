module.exports = {
	data() {
		return {
			points:0,
			uploadImgStyle:'background-image:url("'+ResourcePath+'/files/default.png")',
			headImgPath:""
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
						_this.headImgPath = res.body.img;
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
			var userUUID = window.localStorage.getItem("userUUID");
			var name = $("#userinfo-name").val();
			var sex = $("input[name='userinfo-sex']:checked").val();
			var query = "uuid="+userUUID;
			query += '&name='+name;
			query += '&sex='+sex;
			if(this.headImgPath != ''){
				query += '&img='+this.headImgPath;
			}
			this.$http.jsonp(ResourcePath+'/saveUserInfoActive?'+query).then(function(res){
				if(res.body.success == 1){
					$.toptip(res.body.flag, 'success');
					this.$router.push({ path: '/user' });
				}else{
					$.toptip(res.body.flag, 'error');
				}
			},function(err){
				console.log(err);
			});
		}
	}
};