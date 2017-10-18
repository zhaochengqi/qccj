<template>
    <div class="yq-link">
        <div class="yq-link-title margin-bottom-40">
            <p class="no-margin"></p>
            <span class="font-180">友情链接</span>
        </div>
        <div class="yq-link-main font-140">
            <span v-for="item in linkData" :key="item.id">
                    <a :href="item.link_url" target="_blank">{{item.link_name}}</a>
                </span>
        </div>
    </div>
</template>
<script>
export default {
    created: function() {
        this.getLink()
    },
    data() {
        return {
            linkData: [],
            loading: false
        }
    },
    methods: {
        getLink() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/link',
                data: {
                    listRows: 30,
                    _order: 'sort'
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.linkData = response.data.data
                }
            }, (error) => {
                this.$emit('API-ERR');
            })
        }
    }
}
</script>
