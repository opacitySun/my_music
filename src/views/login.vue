<template>
    <div>
    	<div class="weui-page__head div-box">
    		<i class="fa fa-chevron-left" v-on:click="goback()"></i>
    		<h4 class="div-box-flex1">登录</h4>
    	</div>
		<div class="weui-cells weui-cells_form">
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">账户</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="tel" id="login-name" class="weui-input" placeholder="手机号码"/></div>
	        </div>
	        <div class="weui-cell">
	            <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="password" id="login-pwd" class="weui-input" /></div>
	        </div>
	        <div class="weui-cell weui-cell_vcode">
	            <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
	            <div class="weui-cell__bd weui-cell_primary"><input type="text" id="login-vcode" class="weui-input" maxlength="4"></div>
	            <div class="weui-cell__ft" v-html="codeImg" v-on:click="getCodeFn()">{{codeImg}}</div>
	        </div>
	    </div>
	    <div class="weui-cells__tips">提示：如验证码失效，点击验证码图片，即可重新生成验证码</div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_primary" v-on:click="loginFn()">登录</a>
	    </div>
	    <a href="javascript:void(0)" class="weui-btn-noborder" v-on:click="goRegister()">没账户，去注册</a>
    </div>
</template>

<script>
import Login from '../js/login';

export default Login;
</script>