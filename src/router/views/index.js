export default [
    //首页
    {
        path: '/',
        redirect:'/wel/index'
    },
    {
        path: '/wel/index',
        name: '首页',
        component: () => import('@/views/wel/index')
    },
    //创建志愿页
    {
        path: '/createVolunteer',
        name: '创建志愿',
        component: () => import('@/views/createVolunteer/index.vue')
    },
    //创建组织页
    {
        path: '/createOrganization',
        name: '创建组织',
        component: () => import('@/views/createOrganization/index.vue')
    },
    //组织详情
    {
        path: '/organizationDetail',
        name: '组织详情',
        component: () => import('@/views/organizationDetail/index.vue')
    },
    // 微测试列表
    {
        path: '/miniTestList',
        name: '微测试列表',
        component: () => import('@/views/miniTestList/index.vue')
    },
    // 微测试详情
    {
        path: '/miniTest',
        name: '微测试',
        component: () => import('@/views/miniTest/index.vue'),
    },
    // 微测试结果
    {
        path: '/miniTestCorrect',
        name: '测试结果',
        component: () => import('@/views/miniTest/answer.vue'),
    },
    // 微测试学习
    {
        path: '/miniTestStudy',
        name: '微测试学习',
        component: () => import('@/views/miniTest/study.vue'),
    }
]
