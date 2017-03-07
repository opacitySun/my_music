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
        	<div class="col-sm-4 col-md-4 active">
        		<i class="fa fa-music"></i>
        		<p>发现音乐</p>
        	</div>
        	<div class="col-sm-4 col-md-4">
        		<i class="fa fa-music"></i>
        		<p>我的音乐</p>
        	</div>
        	<div class="col-sm-4 col-md-4">
        		<i class="fa fa-user"></i>
        		<p>帐号</p>
        	</div>
        </footer>
    </div>
</template>