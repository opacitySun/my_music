<template>
    <div>
    	<h2 class="weui-page__title">登录</h2>
		<div class="weui-cells weui-cells_form">
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">账户</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="tel" class="weui-input" placeholder="手机号码"/></div>
	        </div>
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="password" class="weui-input" placeholder="不少于6位"/></div>
	        </div>
	        <div class="weui-cell weui-cell_vcode">
	            <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="number" class="weui-input"></div>
	            <div class="weui-cell__ft"><img class="weui-vcode-img" src="" /></div>
	        </div>
	    </div>
	    <div class="weui-cells__tips"></div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary">登录</a>
	    </div>
	    <a href="javascript:void(0)" class="weui-btn-noborder" v-on:click="goRegister()">没账户，去注册</a>
    </div>
</template>

<script>
import Login from '../js/login';

export default Login;
</script>

<style>
	h2.weui-page__title{padding:2rem 0;}

	.weui-btn-noborder{
		font-size:1.6rem;
		display:block;
		text-align:center;
		margin:1rem 0;
	}
</style>