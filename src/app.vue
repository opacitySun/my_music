<template>
    <div class="body-main">
        <header></header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
        	<div class="col-xs-4 col-sm-4 col-md-4 active" v-on:click.self="footerBtnClickFn($event)">
                <router-link to="/">
            		<i class="fa fa-2x fa-podcast"></i>
            		<p>发现音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4" v-on:click.self="footerBtnClickFn($event)">
                <router-link to="/music-list">
            		<i class="fa fa-2x fa-music"></i>
            		<p>我的音乐</p>
                </router-link>
        	</div>
        	<div class="col-xs-4 col-sm-4 col-md-4" v-on:click.self="footerBtnClickFn($event)">
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
    data(){
        return {

        }
    },
    created(){
        
    },
    methods: {
        footerBtnClickFn:function(event){
            var _this = event.target;
            $(_this).parent().children("div").removeClass("active");
            $(_this).addClass("active");
        }
    }
}
</script>