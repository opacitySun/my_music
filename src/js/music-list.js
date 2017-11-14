

module.exports = {
	data(){
		return {
			myMusics:[]
		};
	},
	created(){
		$("main").removeClass("h100");
		$("footer").removeClass("hidden");
		this.getListAsUuid();
	},
	methods:{
		//根据uuid获取列表数据
		getListAsUuid:function(){
			let userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				let requestUrl = `${ResourcePath}/getUserMusicList?uuid=${userUUID}`;
				this.$http.jsonp(requestUrl).then(function(res){
					if(res.body.success == 1){
						res = res.body.result;
						for(let k in res){
							res[k]["href"] = `/music-detail/${res[k].id}`;
							this.myMusics.push(res[k]);
						}
					}else{
						$.toptip(res.body.flag, 'success');
					}
				},function(err){
					console.log(err);
				});
			}else{
				this.$router.push({ path: '/login' });
			}
		}
	}
};