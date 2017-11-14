module.exports = {
	data() {
		return {
			notices:[]
		}
	},
	created(){
		let requestUrl = `${ResourcePath}/getNoticeListActive`;
		this.$http.jsonp(requestUrl).then(function(res){
			res = res.body.result;
			for(let k in res){
				res[k]["href"] = `/notice-detail/${res[k].id}`;
				this.notices.push(res[k]);
			}
		},function(err){
			console.log(err);
		});
	}
};