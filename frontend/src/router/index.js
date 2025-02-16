import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/home',
			component: Home
		},
		{
			path: '/hotels',
			name:'hotels' ,
			component: () => import('../views/Hotels.vue')
		},
		{
			path: '/form',
			name: 'form',
			component: () => import('../views/Form.vue')
		},
		{
			path: '/',
			name: 'login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/Register.vue')
		},
		{
			path: '/forget-password',
			name: 'forget-password',
			component: () => import('../views/ForgetPassword.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/'
		}
		
	],
})

export default router