<template>
    <div class="music_player">
		<input type="file" id="file" accept="audio/mp3,audio/ogg" multiple>
	    <div id="music-player">
	        <div class="player_header">
	            <div class="playing_info div-box">
	            	<i class="fa fa-chevron-left" v-on:click="goback()"></i>
	                <marquee scrollamount="1" behavior="alternate" direction="left" class="div-box-flex1">
	                    <span class="songName">{{musicTitle}}</span>  <span class="singer" id="music-singer">作者：{{musicAuthor}}</span>
	                </marquee>
	            </div>
	        </div>
	        <div class="player_content">
	            <div class="panel cd" id="panel-cd">
	            	<div class="cd_this rotation" id="cd-this">
	            		<img src="" />
	            	</div>
	            	<div class="cd_img"></div>
	            </div>
	            <div class="panel lyric hidden" id="panel-lyric">
	            	<ul id="cd-lyric"></ul>
	            </div>
	            <div class="show_btn">
	            	<a href="javascript:void(0)" class="show_lyric" v-on:click="showLyric($event)"></a>
	            	<a href="javascript:void(0)" class="show_cd hidden" v-on:click="showCD($event)"></a>
	            </div>
	        </div>
	        <div class="player_footer">
	            <audio></audio>
	            <div id="playerProgress">
	                <div class="time currentTime" id="current-time">{{currentTime}}</div>
	                <div class="progressbar" v-on:click="progressClick($event)"><span class="bar" v-bind:style="progressBtnStyle"></span></div>
	                <div class="time totalTime" id="duration">{{duration}}</div>
	            </div>
	            <div id="playerCtrl">
	                <div>
	                    <a class="button loop" v-on:click="playerLoop($event)" title="顺序播放"></a>
	                    <a class="button random hidden" v-on:click="playerRandom($event)" title="随机播放"></a>
	                    <a class="button single hidden" v-on:click="playerSingle($event)" title="单曲循环"></a>
	                </div>
	                <div><a class="button prev" v-on:click="playerPre()"></a></div>
	                <div><a v-bind:class="playerIcon" v-on:click="musicControl()"></a></div>
	                <div><a class="button next" v-on:click="playerNext()"></a></div>
	                <div id="music-collect">
	                	<!-- {{collect}} -->
	                	<a class="button collect" v-on:click="addLikeMusic($event)" title="添加收藏"></a>
	                	<a class="button collected hidden" v-on:click="cancelLikeMusic($event)" title="取消收藏"></a>
	                </div>
	            </div>
	        </div>
	    </div>
    </div>
</template>

<script>
export default {
	data(){
		return {
			index:-1,
			musics:[],
			loop:true,
			timeId:function(){},
			timeDuration:function(){},
			isPlaying:true,
			player:{},
			playerIcon:"button pause",
			loopStatus:"loop",
			musicTitle:"",
			musicAuthor:"",
			playerPicSrc:"",
			duration:"00:00",
			currentTime:"00:00",
			progressBtnStyle:"width:0%",
			lyric:{},
			lyricNode:-1
		}
	},
	created(){
		$("main").addClass("h100");
		$("footer").addClass("hidden");
		// mapState({ collect: state => state.collect });
	},
	mounted() {
		this.$nextTick(function () {
			// 代码保证 this.$el 在 document 中
			this.player = this.$el.getElementsByTagName('audio')[0];
			this.init();
		});
	},
	methods: {
		//返回上一页
		goback:function(){
			clearInterval(this.timeDuration);
			this.$router.go(-1);
		},
		MusicQueue:function(){
			var musics = this.$data.musics;
			var index = this.$data.index;
			var loop = this.$data.loop;

			var setLoop = function(){
				loop = true;
			};

			var setRandom = function(){
				loop = false;
			};

			var addMusic = function(music){
				musics.push(music);
			};

			var addList = function(list){
				var length = list.length;

				for(var i = 0; i < length; i++) {
					addMusic(list[i]);
				}
			};

			var getMusic = function(){
				if(loop === true) {
					if(index >= musics.length - 1) {
						index = -1;
					}
					index += 1;
					return musics[index];
				} else {
					index = Math.floor(Math.random() * musics.length);
					return musics[index];
				}
			};

			var getPreMusic = function(){
				if(loop) {
					if(index === 0) {
						return musics[0];
					} else {
						index -= 1;
						return musics[index];
					}
				} else {
					return getMusic();
				}
			};

			var getIndexByName = function(name) {
				for(var i = 0; i < musics.length; i++) {
					if(musics[i].name === name) {
						return i;
					}
				}
			};

			var getMusicByName = function(name) {
				index = getIndexByName(name);
				return musics[index];
			};

			var getAllMusic = function() {
				return musics;
			};

			var pushMusics = function(ms) {
				musics = ms;
			};

			return {
				setLoop:setLoop,
				setRandom:setRandom,
				addMusic:addMusic,
				addList:addList,
				getMusic:getMusic,
				getPreMusic:getPreMusic,
				getMusicByName:getMusicByName,
				getIndexByName:getIndexByName,
				getAllMusic:getAllMusic,
				pushMusics:pushMusics
			};
		},
		init:function(){
			var id = this.$route.params.id;
			id = Number(id);
			this.$http.jsonp(ResourcePath+'/getMusicList?id='+id).then(function(res){
				res = res.body.result[0];
				var lyric = this.parseLyric(res.lyric);
				this.lyric = lyric;
				var musicQueue = new this.MusicQueue();
				var music = new this.Music(res.name,res.author,res.url);
				musicQueue.addMusic(music);
				this.musicTitle = music.name;
				this.musicAuthor = music.author;
				this.player.src = music.src;
				$("#cd-this").find("img").attr("src",res.img);
				this.timeDuration = setInterval(this.setDuration, 500);
				this.playerStart();
				this.setCollectByUuid();
			},function(err){
				console.log(err);
			});
		},
		musicControl:function(){
			if (this.isPlaying) {
				this.playerPause();
			} else {
				this.playerStart();
			}
		},
		playerStart:function(){
			this.player.play();
			this.isPlaying = true;
			clearInterval(this.timeId);
			this.timeId = setInterval(this.playerChange, 500);
			this.playerIcon = "button pause";
			this.setDuration();

			var cdThis = $("#cd-this");
			var deg = eval('this.get'+cdThis.css('transform'));//构造getmatrix函数,返回上次旋转度数
			var style = $("style");
			style.html('@-webkit-keyframes rotation {from {-webkit-transform: rotate('+deg+'deg);}to {-webkit-transform: rotate('+parseInt(deg+360)+'deg);}}');
			cdThis.addClass("rotation");
		},
		playerPause:function(){
			this.player.pause();
			this.isPlaying = false;
			clearInterval(this.timeId);
			this.playerIcon = "button play";
			
			var cdThis = $("#cd-this");
			var deg = eval('this.get'+cdThis.css('transform'));//构造getmatrix函数,返回上次旋转度数
			cdThis.css("-webkit-transform","rotate("+deg+"deg)");
			cdThis.removeClass("rotation");
		},
		playerChange:function(){
			this.setCurrentTime();
			var currentTime = this.player.currentTime,
				duration = this.player.duration;
			var progress = (currentTime / duration).toFixed(2) * 100;
			progress = progress <= 100 ? progress : 100;
			this.progressBtnStyle = "width:"+progress+"%";

			for(var key in this.lyric){
				if(parseInt(currentTime) == parseInt(key) && parseInt(currentTime) != this.lyricNode){
					this.lyricNode = parseInt(key);
					var li = '<li>'+this.lyric[key]+'</li>';
					$("#cd-lyric").append(li);
					var style = $("style");
					style.html('@-webkit-keyframes rotation {from {-webkit-transform: rotate(0deg);}to {-webkit-transform: rotate(360deg);}}');
				}
			}

			if(currentTime == duration){
				$("#cd-lyric").empty();
				var style = $("style");
				style.html('@-webkit-keyframes rotation {from {-webkit-transform: rotate(0deg);}to {-webkit-transform: rotate(360deg);}}');
				if(this.loopStatus == 'loop' || this.loopStatus == 'random'){
					var musicQueue = new this.MusicQueue();
					this.preparePlay(musicQueue.getMusic());
				}
			}
		},
		setDuration:function(){
			var total = this.player.duration;
			total = total ? total : 0;
			this.duration = this.timeFormat(total);
		},
		timeFormat:function(total){
			var minute = parseInt(total / 60),
				second = parseInt(total - minute * 60),
				result;

			second = (second >= 10) ? second : '0' + second;
			result = minute + ":" + second;
			return result;
		},
		setCurrentTime:function(){
			var total = this.player.currentTime;
			this.currentTime = this.timeFormat(total);
		},
		Music:function(name,author,src){
			return {
				"name":name,
				"author":author,
				"src":src
			};
		},
		playerLoop:function(event){
			this.player.loop = false;
			this.loopStatus = "random";
			var musicQueue = new this.MusicQueue();
			musicQueue.setRandom();
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.random").removeClass("hidden");
		},
		playerRandom:function(event){
			this.player.loop = true;
			this.loopStatus = "single";
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.single").removeClass("hidden");
		},
		playerSingle:function(event){
			this.player.loop = false;
			this.loopStatus = "loop";
			var musicQueue = new this.MusicQueue();
			musicQueue.setLoop();
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find("a.loop").removeClass("hidden");
		},
		playerNext:function(){
			var musicQueue = new this.MusicQueue();
			this.preparePlay(musicQueue.getMusic());
		},
		playerPre:function(){
			var musicQueue = new this.MusicQueue();
			this.preparePlay(musicQueue.getPreMusic());
		},
		preparePlay:function(music){
			this.musicTitle = music.name;
			this.musicAuthor = music.author;
			this.player.src = music.src;

			this.playerStart();
			// this.changeImage();
			this.setCurrentTime();

			this.player.play();
			setInterval(this.setDuration, 500);
			clearInterval(this.timeId);
			this.timeId = setInterval(this.playerChange, 500);

			var musicQueue = new this.MusicQueue();
			this.index = musicQueue.getIndexByName(music.name);
		},
		changeImage:function(){
			var num = parseInt(Math.random() * 16),
				src;

			num = (num > 0) ? num : num + 1;
			src = "raw/" + num + ".jpg";
			this.playerPicSrc = src;
		},
		progressClick:function(event){
			var screenWidth = $(window).width();
			var screenWidthprocess = screenWidth * 0.56;
			var t = (event.offsetX / screenWidthprocess).toFixed(2);
			var currentTime = this.player.duration * t;
			this.player.currentTime = currentTime;
			this.playerChange();
		},
		/* 
	     * 解析matrix矩阵，0°-360°，返回旋转角度 
	     * 当a=b||-a=b,0<=deg<=180 
	     * 当-a+b=180,180<=deg<=270 
	     * 当a+b=180,270<=deg<=360 
	     * 
	     * 当0<=deg<=180,deg=d; 
	     * 当180<deg<=270,deg=180+c; 
	     * 当270<deg<=360,deg=360-(c||d); 
	     * */
		getmatrix:function(a,b,c,d,e,f){
			var aa=Math.round(180*Math.asin(a)/ Math.PI);
	        var bb=Math.round(180*Math.acos(b)/ Math.PI);
	        var cc=Math.round(180*Math.asin(c)/ Math.PI);
	        var dd=Math.round(180*Math.acos(d)/ Math.PI);
	        var deg=0;
	        if(aa==bb||-aa==bb){
	            deg=dd;
	        }else if(-aa+bb==180){
	            deg=180+cc;
	        }else if(aa+bb==180){
	            deg=360-cc||360-dd;
	        }
	        return deg>=360?0:deg;
		},
		//添加收藏
		addLikeMusic:function(event){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				var id = this.$route.params.id;
				this.$http.jsonp(ResourcePath+'/addCollectMusic?uuid='+userUUID+'&music_id='+id).then(function(res){
					if(res.body.success == 1){
						var _this = event.target;
						$(_this).addClass("hidden");
						$(_this).parent().find("a.collected").removeClass("hidden");
					}else{
						$.alert(res.body.flag);
					}
				},function(err){
					console.log(err);
				});
			}else{
				this.$router.push({ path: '/login' });
			}
		},
		//取消收藏
		cancelLikeMusic:function(event){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				var id = this.$route.params.id;
				this.$http.jsonp(ResourcePath+'/cancelCollectMusic?uuid='+userUUID+'&music_id='+id).then(function(res){
					if(res.body.success == 1){
						var _this = event.target;
						$(_this).addClass("hidden");
						$(_this).parent().find("a.collect").removeClass("hidden");
					}else{
						$.alert(res.body.flag);
					}
				},function(err){
					console.log(err);
				});
			}else{
				this.$router.push({ path: '/login' });
			}	
		},
		//解析歌词
		parseLyric:function(lrc){
			var lyrics = lrc.split("\n");
		    var lrcObj = {};
		    for(var i=0;i<lyrics.length;i++){
		        var lyric = decodeURIComponent(lyrics[i]);
		        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		        var timeRegExpArr = lyric.match(timeReg);
		        if(!timeRegExpArr)continue;
		        var clause = lyric.replace(timeReg,'');
		        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
		            var t = timeRegExpArr[k];
		            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
		                sec = Number(String(t.match(/\:\d*/i)).slice(1));
		            var time = min * 60 + sec;
		            lrcObj[time] = clause;
		        }
		    }
		    return lrcObj;
		},
		showLyric:function(event){
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find(".show_cd").removeClass("hidden");
			$("#panel-cd").addClass("hidden");
			$("#panel-lyric").removeClass("hidden");
		},
		showCD:function(event){
			var _this = event.target;
			$(_this).addClass("hidden");
			$(_this).parent().find(".show_lyric").removeClass("hidden");
			$("#panel-lyric").addClass("hidden");
			$("#panel-cd").removeClass("hidden");
		},
		//查找uuid下是否有收藏该音乐
		setCollectByUuid:function(){
			var userUUID = window.localStorage.getItem("userUUID");
			if(userUUID){
				var id = this.$route.params.id;
				this.$http.jsonp(ResourcePath+'/confirmCollectMusic?uuid='+userUUID+'&music_id='+id).then(function(res){
					if(res.body.success == 1){
						$("#music-collect").find(".collect").addClass("hidden");
						$("#music-collect").find(".collected").removeClass("hidden");
					}
				},function(err){
					console.log(err);
				});
			}
		}
	}
}
</script>

<style>

</style>