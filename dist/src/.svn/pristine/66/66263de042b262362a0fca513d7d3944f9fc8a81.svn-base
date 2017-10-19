<template>
    <el-row v-loading="loading" element-loading-text="拼命加载中">
        <div class="index-title margin-bottom-40">
            <p class=""></p>
            <span class="font-150">精彩视频</span>
            <router-link :to="{name:'shipin'}" class="pull-right" style="border:0">
                <i class="el-icon-d-arrow-right"></i>
            </router-link>
        </div>
        <el-row class="margin-bottom-50">
            <el-col :xs="24" :sm="16" :md="16" :lg="16">
                <div class="index-video">
                    <video-player ref="videoPlayer" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">
                    </video-player>
                </div>
            </el-col>
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :offset="1">
                <a href="#" class="video-list clearfix" v-for="item in videoData" :key="item.id">
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12">
                            <div class="video-list-img">
                                <img :src="item.img?item.img+'!158x111':'./static/img/default.jpg'" alt="">
                                <a :href="url+item.id" target="_Blank">
                                </a>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12">
                            <div class="video-list-txt font-120">
                                <a :href="url+item.id" target="_Blank">
                                    {{item.title}}
                                </a>
                            </div>
                        </el-col>
                    </el-row>
                </a>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
export default {
    activated: function() {
        this.getVideo()
    },
    data() {
        return {
            playerOptions: {
                // component options
                start: 0,
                playsinline: false,
                // videojs options
                muted: true,
                language: 'zh-CN',
                height: '375px',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: "http://osaeqd83t.bkt.clouddn.com/video_20170609_u4wyk8pysx4r5~1.mp4"
                }],
                poster: "",
            },
            url :process.env.NODE_ENV == "production" ? this.WEB_ROOT+"/player-" : this.API_ROOT+'player-',
            videoData: [],
            loading: false
        }
    },
    mounted() {
        // console.log('this is current player instance object', this.player)
        setTimeout(() => {
            // console.log('dynamic change options', this)
            this.playerOptions.muted = false
        }, 2000)
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    methods: {
        //获取视频数据
        getVideo() {
            this.loading = true;
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/videos',
                data: {
                    listRows: 4
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.playerOptions.sources[0].src = response.data.data[0].video_file?response.data.data[0].video_file:"http://osaeqd83t.bkt.clouddn.com/video_20170609_u4wyk8pysx4r5~1.mp4"
                    this.playerOptions.poster = response.data.data[0].img
                    this.videoData = response.data.data
                    this.videoData.splice(0, 1)
                }
                this.loading = false;
            }, (error) => {
                this.loading = false;
                this.$emit('API-ERR')
            })
        },
        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },
        // player is ready
        playerReadied(player) {
            // console.log('example 01: the player is readied', player)
        }
    }
}
</script>
