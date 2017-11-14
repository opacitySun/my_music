export const ADD_COLLECT = 'ADD_COLLECT';
export const CANCEL_COLLECT = 'CANCEL_COLLECT';
export const USER_SIGNIN = (state, uuid) => {
	window.localStorage.setItem('userUUID', JSON.stringify(uuid));
};
export const USER_SIGNOUT = (state) => {
	window.localStorage.removeItem('userUUID');
};