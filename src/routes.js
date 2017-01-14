/**
 * 创建vue路由
 *
 * Created by sunbowei on 17-1-7.
 */

import Index from './views/layout/index';
import MusicList from './views/music/list';
import MusicDetail from './views/music/detail';
import NotFound from './components/not-found';

const Routes = {
	//配置路由模式
	mode: 'hash',	//"hash" | "history" | "abstract"
	//应用的基路径
	base: __dirname,
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
			path: '*',
			component: NotFound
		},
	]
};

module.exports = Routes;