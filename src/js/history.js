module.exports = {
	data() {
		return {
			sets:[]
		}
	},
	created(){
		$("main").removeClass("h100");
		$("footer").removeClass("hidden");
		this.$http.jsonp(ResourcePath+'/getHistoryAction').then(function(res){
			if(res.body.success == 1){
				res = res.body.result;
				for(var k in res){
					res[k]["href"] = "/music-detail/"+res[k].id;
					this.sets.push(res[k]);
				}
			}else{
				$.toptip(res.body.flag, 'success');
			}
		},function(err){
			console.log(err);
		});
	}
};