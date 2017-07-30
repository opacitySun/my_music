<template>
    <div>
		<div class="page grid js_show">
		    <div class="page__hd">
		        <h1 class="page__title">个人中心</h1>
		        <p class="page__desc">{{user.name}}</p>
		    </div>
		    <div class="weui-grids">
		        <a href="javascript:void(0);" class="weui-grid" v-on:click="goLogin()">
		            <div class="weui-grid__icon">
		                <img src="../images/user_login.png" alt="登录">
		            </div>
		            <p class="weui-grid__label">登录</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_reg.png" alt="注册">
		            </div>
		            <p class="weui-grid__label">注册</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_reg.png" alt="密码修改">
		            </div>
		            <p class="weui-grid__label">密码修改</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_history.png" alt="播放历史">
		            </div>
		            <p class="weui-grid__label">播放历史</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_info.png" alt="个人信息">
		            </div>
		            <p class="weui-grid__label">个人信息</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_notice.png" alt="系统通知">
		            </div>
		            <p class="weui-grid__label">系统通知</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_signin.png" alt="签到">
		            </div>
		            <p class="weui-grid__label">签到</p>
		        </a>
		        <a href="javascript:;" class="weui-grid">
		            <div class="weui-grid__icon">
		                <img src="../images/user_points.png" alt="积分">
		            </div>
		            <p class="weui-grid__label">积分</p>
		        </a>
		    </div>
		</div>
    </div>
</template>

<script>
import User from '../js/user';

export default User;
</script>