<template>
    <transition>
        <router-view></router-view>
    </transition>
</template>
<script>
import Vue from 'vue'
import Element from 'element-ui'
import Bootstrap from 'bootstrap'

import 'element-ui/lib/theme-default/index.css'

//当前组件下引用适用全局的样式表，其他组件按需引用 
import '@/assets/css/nifty-demo.min.css'
import '@/assets/css/base.css'
import '@/assets/plugins/pace/pace.min.css'
import '@/assets/css/nifty-demo-icons.min.css'
import '@/assets/css/themify-icons.min.css'
import '@/assets/css/premium-line-icons.min.css'
import '@/assets/css/font-awesome.min.css'

import '@/assets/plugins/pace/pace.min.js'
import '@/assets/js/nifty-demo.js'

Vue.use(Element)

export default {
    name: 'app'
}
</script>
