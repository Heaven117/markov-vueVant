export default [
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
]
