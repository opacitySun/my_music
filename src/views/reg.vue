<template>
    <div>
    	<div class="weui-page__head div-box">
    		<i class="fa fa-chevron-left" v-on:click="goback()"></i>
    		<h4 class="div-box-flex1">注册</h4>
    	</div>
    	<div class="weui-cells weui-cells_form">
			<div class="weui-cell weui-cell_vcode">
				<div class="weui-cell__hd">
					<label class="weui-label">手机号</label>
				</div>
				<div class="weui-cell__bd">
					<input id="reg-mobile" class="weui-input" type="tel" placeholder="请输入手机号">
				</div>
				<div class="weui-cell__ft">
					<button class="weui-vcode-btn" id="sendCodeBtn" v-on:click="sendCode()">获取验证码</button>
					<button class="weui-btn weui-btn_disabled weui-btn_default hidden" id="sendCodeSpaceBtn">60s</button>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">密码</label>
				</div>
				<div class="weui-cell__bd">
					<input id="reg-pwd" class="weui-input" type="password" placeholder="密码不少于6位">
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
				<div class="weui-cell__bd">
					<input id="reg-mcode" class="weui-input" type="number" placeholder="请输入验证码">
				</div>
			</div>
		</div>
		<div class="weui-cells__tips"></div>
	    <div class="weui-btn-area">
	        <a href="javascript:void(0)" class="weui-btn weui-btn_plain-primary" v-on:click="regFn()">注册</a>
	    </div>
    </div>
</template>

<script>
import Reg from '../js/reg';

export default Reg;
</script>