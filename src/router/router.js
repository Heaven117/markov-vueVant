import Vue from "vue";
import VueRouter from 'vue-router'
import ViewsRouter from './views/index'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [...ViewsRouter]
})

export default router;
