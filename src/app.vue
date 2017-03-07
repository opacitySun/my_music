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
        <footer id="footer">
        	<div class="col-xs-4 col-sm-4 col-md-4 active" v-on:click="menuActive">
                <router-link to="/">
            		<i class="fa fa-2x fa-podcast"></i>
            		<p>发现音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4" v-on:click="menuActive">
                <router-link to="/music-list">
            		<i class="fa fa-2x fa-music"></i>
            		<p>我的音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4" v-on:click="menuActive">
                <router-link to="/user">
            		<i class="fa fa-2x fa-user"></i>
            		<p>帐号</p>
                </router-link>
        	</div>
        </footer>
    </div>
</template>

<script>
export default {
    el: '#footer',
    data: {
        
    },
    methods: {
        menuActive: function () {
            $("footer div").removeClass("active");
            $(this).addClass("active");
        }
    }
}
</script>