<template>
    <vue-html5-editor :content="editContent" :height="height" @change="updateData"></vue-html5-editor>
</template>
<script>
import Vue from 'vue'
import VueHtml5Editor from 'vue-html5-editor'

var option = {
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    showModuleName: true,

    // 配置图片模块
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        compress: {
            width: 800,
            height: 600,
            quality: 80
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    language: "zh-cn",

    // 隐藏不想要显示出来的模块
    hiddenModules: ['info'],

}

Vue.use(VueHtml5Editor, option)

export default {
    data: function() {
        return {

        }
    },
    props: ['editContent', 'height', 'token'],
    methods: {
        //更新编辑器内容回调接口，获取到内容更新时，将获取的值赋值给form表单的content字段
        updateData(content) {
            this.$emit("Callback-Content", content, this.token);
        }
    }

}
</script>
