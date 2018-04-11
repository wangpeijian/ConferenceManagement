import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['../view/Login.vue'], resolve);
const Main = resolve => require(['../view/Main.vue'], resolve);
const MeetingList = resolve => require(['../view/Main/MeetingList.vue'], resolve);
const MeetingEdit = resolve => require(['../view/Main/MeetingEdit.vue'], resolve);
const ArticleEdit = resolve => require(['../view/Main/ArticleEdit.vue'], resolve);

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: '/',
                    component: MeetingList
                }, {
                    path: 'meeting/edit',
                    component: MeetingEdit
                }, {
                    path: 'article/edit',
                    component: ArticleEdit
                }
            ]
        }, {
            path: '/login',
            component: Login
        },{
            path: '*',
            component: Login
        }
    ]
})
