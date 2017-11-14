module.exports = {
	data() {
		return {
			points:0,
			uploadImgStyle:'background-image:url("'+ResourcePath+'/files/default.png")',
			headImgPath:"",
			userinfoName:"",
			userinfoSex:0,
			uploadTxt:"正在上传",
			uploadImgClass:"weui-uploader__file"
		}
	},
	created(){
		$("main").addClass("h100");
		$("footer").addClass("hidden");
		this.getUserInfo();
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
			let _this = this;
			$("#uploader-input").change(function(){
				let formData = new FormData($("#userinfo-form")[0]);
				_this.uploadImgClass = "weui-uploader__file weui-uploader__file_status";
				_this.$http.post(ResourcePath+'/uploadHeadImgAction',formData).then(function(res){
					if(res.body.success == 1){
						$.toptip(res.body.flag, 'success');
						_this.uploadImgStyle = 'background-image:url("'+ResourcePath+res.body.img+'")';
						_this.headImgPath = res.body.img;
					}else{
						$.toptip(res.body.flag, 'error');
					}
					_this.uploadImgClass = "weui-uploader__file";
				},function(err){
					console.log(err);
				});
			});
		},
		//提交
		submitFn:function(){
			let userUUID = window.localStorage.getItem("userUUID"),
				name = this.userinfoName,
				sex = this.userinfoSex;
			let query = `uuid=${userUUID}`;
			query += `&name=${name}`;
			query += `&sex=${sex}`;
			if(this.headImgPath != ''){
				query += `&img=${this.headImgPath}`;
			}
			let requestUrl = `${ResourcePath}/saveUserInfoActive?${query}`;
			this.$http.jsonp(requestUrl).then(function(res){
				if(res.body.success == 1){
					$.toptip(res.body.flag, 'success');
					this.$router.push({ path: '/user' });
				}else{
					$.toptip(res.body.flag, 'error');
				}
			},function(err){
				console.log(err);
			});
		},
		//获取用户信息
		getUserInfo:function(){
			let userUUID = window.localStorage.getItem("userUUID");
			let requestUrl = `${ResourcePath}/getUserInfoAction?uuid=${userUUID}`;
			this.$http.jsonp(requestUrl).then(function(res){
				if(res.body.success == 1){
					res = res.body.result[0];
					this.userinfoName = res.name;
					this.points = res.points;
					this.uploadImgStyle = 'background-image:url("'+ResourcePath+res.img+'")';
					this.headImgPath = res.img;
					this.userinfoSex = res.sex;
				}else{
					$.toptip(res.body.flag, 'error');
				}
			},function(err){
				console.log(err);
			});
		}
	}
};