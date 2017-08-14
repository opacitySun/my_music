module.exports = {
	data() {
		return {
			title:'',
			content:''
		}
	},
	created(){
		var id = this.$route.params.id;
		this.$http.jsonp(ResourcePath+'/getNoticeByIdActive?id='+id).then(function(res){
			if(res.body.success == 1){
				res = res.body.result[0];
				this.title = res.title;
				this.content = res.content;
			}else{
				$.toptip(res.body.flag, 'error');
			}
		},function(err){
			console.log(err);
		});
	}
};