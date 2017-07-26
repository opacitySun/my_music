<template>
    <div class="music_player">
		<input type="file" id="file" accept="audio/mp3,audio/ogg" multiple>
	    <div id="music-player">
	        <div class="player_header">
	            <div class="playing_info">
	            	<i class="fa fa-chevron-left" v-on:click="goback()"></i>
	                <marquee scrollamount="1" behavior="alternate" direction= left width="100%" height="20px">
	                    <span class="songName">{{musicTitle}}</span>  <span class="singer" id="music-singer">作者：{{musicAuthor}}</span>
	                </marquee>
	            </div>
	        </div>
	        <div class="content">
	            <div class="panelGroup">
	                <div class="panel playlist">
	                    <ul class="music_list" id="music_list">
	                        <li style="text-align: center;display: block;">加载音乐列表...</li>
	                    </ul>
	                </div>
	                <div class="panel lyric">
	                    <div class="lyric_wrap">
	                        <ul id="lyric">
	                            <li>HTML5 music player</li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="panel album">
	                    <div class="album_art">
	                        <img class="cover"/>
	                    </div>
	                    <div class="music_info"></div>
	                </div>
	            </div>
	        </div>
	        <div class="player_footer">
	            <audio></audio>
	            <div id="playerProgress">
	                <div class="time currentTime" id="current-time">00:00</div>
	                <div class="progressbar" id="music-progress"><span class="bar" id="music-progress-btn"></span></div>
	                <div class="time totalTime" id="duration">00:00</div>
	            </div>
	            <div id="playerCtrl">
	                <div>
	                    <a class="button loop" id="play-style-loop" title="顺序播放"></a>
	                    <a class="button random hidden" id="play-style-random" title="随机播放"></a>
	                </div>
	                <div id="music-pre"><a class="button prev"></a></div>
	                <div v-on:click="musicControl()"><a v-bind:class="playerIcon"></a></div>
	                <div id="music-next"><a class="button next"></a></div>
	                <div><a class="button collect"></a></div>
	            </div>
	        </div>
	    </div>

	    <ul class="hidden" id="musics"></ul>


        <!-- <h1>Music Detail</h1>
		<hr/>

		<p>Hello Detail page!</p>

		<p>id:{{msg.id}}</p>
		<p>name:{{msg.name}}</p>
		<p>age:{{msg.age}}</p> -->
    </div>
</template>

<script>
export default {
	data(){
		return {
			msg:{},
			index:0,
			timeId:function(){},
			isPlaying:true,
			player:{},
			playerIcon:"button pause",
			durationElement:$("#duration"),
			currentTimeElement:$("#current-time"),
			progressElement:$("#music-progress"),
			progressBtnElement:$("#music-progress-btn"),
			fileElement:$("#file"),
			musicTitle:"",
			musicAuthor:"",
			albumPicElment:$("#picture"),
			musicPlayer:$("#music-player"),
			musicUL:$("#musics"),
			liElementsCache:[]
		}
	},
	created(){
		//获取params的参数ID
		var id = this.$route.params.id;
		id = Number(id);

		//根据获取的参数ID，返回不同的data对象（真实业务中，这里应该是Ajax获取数据）
		if(id === 1){
			this.msg = {
				"id":id,
				"name":"hello111",
				"age":24
			};
		}else{
			this.msg = {"id":id,"name":"hello222","age":28};
		}

		$("main").addClass("h100");
		$("footer").addClass("hidden");
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
			$("main").removeClass("h100");
			$("footer").removeClass("hidden");
			this.$router.push({ path: '/' });
		},
		MusicQueue:function(){
			var musics = [];
			var index = -1;
			var loop = true;

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
					return this.getMusic();
				}
			};

			var getMusicByName = function(name) {
				index = this.getIndexByName(name);
				return musics[index];
			};

			var getIndexByName = function(name) {
				for(var i = 0; i < musics.length; i++) {
					if(musics[i].name === name) {
						return i;
					}
				}
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
			var musicQueue = new this.MusicQueue();
			var music = new this.Music("风筝误", "未知","http://www.sunbowei.com:3111/files/fly.ogg");
			musicQueue.addMusic(music);
			this.musicTitle = music.name;
			this.musicAuthor = music.author;
			this.player.src = music.src;
			setTimeout(this.setDuration, 500);
			this.appendMusicToDOM(music.name);
			this.setSelected(this.index);
			this.playerStart();
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
			this.timeId = setTimeout(this.playerChange(), 500);
			this.playerIcon = "button pause";
			this.setDuration();
		},
		playerPause:function(){
			this.player.pause();
			this.isPlaying = false;
			clearTimeout(this.timeId);
			this.playerIcon = "button play";
		},
		playerChange:function(){
			this.setCurrentTime();
			var currentTime = this.player.currentTime,
				duration = this.player.duration;

			var progress = (currentTime / duration).toFixed(2) * 100;
			progress = progress <= 100 ? progress : 100;
			this.progressBtnElement.css("width",progress+"%");

			//this.timeId = setTimeout(this.playerChange(), 500);
		},
		setDuration:function(){
			var total = this.player.duration;
			total = total ? total : 0;
			this.durationElement.html(this.timeFormat(total));
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
			this.currentTimeElement.html(this.timeFormat(total));
		},
		appendMusicToDOM:function(name){
			var li = document.createElement("li");
			var text = document.createTextNode(name);
			li.appendChild(text);
			this.liElementsCache.push(li);
			this.musicUL.append(li);
		},
		setSelected:function(index){
			this.liElementsCache[index].classList.add("selected");
			this.liElementsCache[index].scrollIntoView(false);
		},
		removeSelected:function(index){
			this.liElementsCache[index].removeClass("selected");
		},
		Music:function(name,author,src){
			return {
				"name":name,
				"author":author,
				"src":src
			};
		}
	}
}
</script>

<style>

</style>