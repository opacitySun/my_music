module.exports = {
	data() {
		return {
			notices:[]
		}
	},
	created(){
		this.$http.jsonp(ResourcePath+'/getNoticeListActive').then(function(res){
			res = res.body.result;
			for(var k in res){
				res[k]["href"] = "/notice-detail/"+res[k].id;
				this.notices.push(res[k]);
			}
		},function(err){
			console.log(err);
		});
	}
};