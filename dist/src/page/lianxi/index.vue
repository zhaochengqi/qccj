<template>
  <div class="lianxi" v-loading="loading" element-loading-text="拼命加载中">
    <div class="container margin-top-50 padding-top-30">
      <el-row :gutter="40" class="">
        <el-col :xs="24" :sm="6" :md="6" :lg="6">
          <!-- <ul class="lianxi-nav font-140">
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#" class="active">联系我们</a></li>
                        <li><a href="#">新闻爆料</a></li>
                        <li><a href="#">加入我们</a></li>
                    </ul> -->
          <div class="lianxi-nav  font-140">
            <el-menu default-active="2" @select="handleSelect" :default-active="activeIndex" class="el-menu-vertical-demo margin-bottom-30">
              <el-menu-item index="1">关于我们</el-menu-item>
              <el-menu-item index="2">联系我们</el-menu-item>
              <el-menu-item index="3">新闻爆料</el-menu-item>
              <el-menu-item index="4">加入我们</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="24" :sm="18" :md="18" :lg="18">
          <div class="lianxi-main" ref="lianxi">
            <div class="margin-bottom-50 AA" v-for="item in tableData">
              <h2 class="font-150 no-margin margin-bottom-30 lianxititle">{{item.name}}</h2>
              <p class="margin-bottom-30" v-html="item.content">
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  activated() {
    console.log(0)
    this.activeIndex = this.$route.meta.id.toString();
    this.getData(this.$route.meta.id);
  },
  data() {
    return {
      loading: false,
      tableData: [],
      activeIndex: '1',
      luyou: ''
    };
  },
  watch: {
    '$route.meta.id': function(newValue, oldValue) {
      if (newValue) {
        let key = newValue.toString();
        this.activeIndex = key;
        this.setLinKA(key)
      }
    }
  },
  methods: {
    handleSelect(key) {
      this.setLinKA(key)
      this.$router.push({
        name: this.luyou
      })
    },
    //获取数据
    getData(val) {
      this.loading = true
      this.axios({
        method: 'post',
        url: this.API_ROOT + '/home_api/about/index',
        data: {
          _order: 'id',
          _sort: 'asc'
        }
      }).then((response) => {
        if (response.data.status.code !== 1001) {
          this.$message.error(response.data.data ? response.data.data : response.data.status.title)
        } else {
          this.tableData = response.data.data
        }
        this.loading = false
      }, (error) => {
        this.loading = false
        this.$emit('API-ERR');
      })
    },
    //存到数据仓库
    setLinKA(key) {
      console.log($('.AA').eq(2).children().scrollTop());
      switch (key) {
        case '1':
          this.$store.commit('setLinkA', {
            x: 0,
            y: this.$refs['lianxi'].children[0].offsetTop
          })
          this.luyou = 'guanyu';

          break;
        case '2':
          this.$store.commit('setLinkA', {
            x: 0,
            y: this.$refs['lianxi'].children[1].offsetTop
          })
          this.luyou = 'lianxi';
          break;
        case '3':
          this.luyou = 'baoliao';
          this.$store.commit('setLinkA', {
            x: 0,
            y: this.$refs['lianxi'].children[2].offsetTop
          })
          break;
        case '4':
          this.$store.commit('setLinkA', {
            x: 0,
            y: this.$refs['lianxi'].children[3].offsetTop
          })
          this.luyou = 'jiaru';
          break;
      }
    }
  },
}

</script>
<style scoped>
.lianxi {
  min-height: 470px;
}

.lianxi-nav {}

.lianxi-nav .el-menu {
  width: 100%;
  background-color: #e2534b;
}

.lianxi-nav li {
  list-style: none;
  text-align: center;
  color: #fff;
  line-height: 60px;
  font-size: 18px;
}

.lianxi-nav li:hover,
.lianxi-nav li.is-active {
  background-color: rgba(255, 255, 255, .5);
  color: #fff!important;
}

.lianxi-main {
  color: #817373;
  font-size: 15px;
}

.lianxi-main h2 {
  color: #501515;
}

</style>
