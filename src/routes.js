/**
 * 创建vue路由
 *
 * Created by sunbowei on 17-1-7.
 */

import Index from './views/index';
import MusicList from 'bundle?lazy!./views/music-list';
import MusicDetail from 'bundle?lazy!./views/music-detail';
import User from 'bundle?lazy!./views/user';
import UserInfo from 'bundle?lazy!./views/user-info';
import UserPwd from 'bundle?lazy!./views/user-pwd';
import Login from 'bundle?lazy!./views/login';
import Reg from 'bundle?lazy!./views/reg';
import History from 'bundle?lazy!./views/history';
import NotFound from './components/not-found';

const Routes = {
	//配置路由模式
	mode: 'history', //"hash" | "history" | "abstract"
	//base: __dirname, //应用的基路径
	routes: [
		{
			path: '/',
			component: Index
		},
		{
			path: '/music-list',
			name: 'music-list',
			component: MusicList
		},
		{
			path: '/music-detail/:id',
			name: 'music-detail',
			component: MusicDetail
		},
		{
			path: '/user',
			name: 'user',
			component: User
		},
		{
			path: '/user-info',
			name: 'user-info',
			component: UserInfo
		},
		{
			path: '/user-pwd',
			name: 'user-pwd',
			component: UserPwd
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/reg',
			name: 'reg',
			component: Reg
		},
		{
			path: '/history',
			name: 'history',
			component: History
		},
		{
			path: '*',
			component: NotFound
		}
	]
};

module.exports = Routes;