<template>
    <div class="user_login">
    	<div class="weui-cells__title">
    		<h2 class="weui-page__title">登录</h2>
    	</div>
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
	            <div class="weui-cell__ft"></div>
	        </div>
	    </div>
	    <div class="weui-cells__tips"></div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary">登录</a>
	    </div>
	    <a href="javascript:void(0)">没账户，去注册</a>
    </div>
</template>

<script>
import Login from '../js/login';

export default Login;
</script>