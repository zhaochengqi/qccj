<template></template>
<script>
export default {
    //子系统切换中转
    created: function() {
        //设置当前页面标题名称
        document.title = '账号登录跳转中'
        this.getSliderNav()
    },
    methods: {
        //生成左侧导航数据
        getSliderNav() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/node/treemenu',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$store.commit('setSliderNav', response.data.data);
                    this.$router.push({
                        name: "home"
                    });
                    window.location.reload()
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        }
    }
}
</script>
