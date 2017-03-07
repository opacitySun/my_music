<template>
    <div>
    	<!--
        <div>
            <router-link to="/music-list">music-list</router-link>
        </div>
        -->
        <header></header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
        	<div class="col-xs-4 col-sm-4 col-md-4 active">
                <router-link to="/">
            		<i class="fa fa-2x fa-podcast"></i>
            		<p>发现音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4">
                <router-link to="/music-list">
            		<i class="fa fa-2x fa-music"></i>
            		<p>我的音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4">
        		<i class="fa fa-2x fa-user"></i>
        		<p>帐号</p>
        	</div>
        </footer>
    </div>
</template>

<script>
    $("footer").on("click","div",function(){
        $("footer div").removeClass("active");
        $(this).addClass("active");
    });
</script>