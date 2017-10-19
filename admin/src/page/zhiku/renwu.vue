<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="6" :sm="6" class="pad-rgt">
                    <el-input placeholder="检索：姓名" icon="search" v-model="keys" @change='KeysChange'>
                    </el-input>
                </el-col>
                <el-col :md="6" :sm="6">
                    <el-select v-model="cid" placeholder="不限人物类型" clearable @change="handleChange" style="width:100%">
                        <el-option v-for="item in zkleixing" :label="item.title" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :md="12" :sm="12" class="text-right">
                    <el-button-group v-if="authCheck(88)&&authCheck(131)">
                        <el-button type="primary" icon="plus" @click="addProject">添加人物</el-button>
                        <el-button type="danger" icon="delete2" @click="piliangDeleted">批量删除</el-button>
                    </el-button-group>
                    <div v-else>
                        <el-button type="primary" v-if="authCheck(88)" icon="plus" @click="addProject">添加人物</el-button>
                        <el-button type="danger" v-if="authCheck(131)" icon="delete2" @click="piliangDeleted">批量删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-table :data="tableData" stripe border highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="name" min-width="80" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column min-width="100" prop="zhiwei" label="职位" show-overflow-tooltip></el-table-column>
                <el-table-column min-width="100" label="人物类型" prop="cid">
                    <template scope="scope">
                        {{zhikulx(scope.row.cid)}}
                    </template>
                </el-table-column>
                <el-table-column min-width="150" prop="scly" label="擅长领域" show-overflow-tooltip></el-table-column>
                <el-table-column width="160" label="操作" align="center" v-if="authCheck(89)||authCheck(131)">
                    <template scope="scope">
                        <el-button-group>
                            <el-button size="small" icon="edit" type='primary' v-if="authCheck(89)" @click="handleEdit(scope.row.id)">
                                编辑
                            </el-button>
                            <el-button size="small" icon="delete2" type='danger' v-if="authCheck(131)" @click="handleDelete(scope.row.id)">
                                删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="clearfix">
            <template>
                <el-pagination class="margin-top-20 text-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="_pageSizes" :page-size="_pageSize" layout="total,sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </div>
    </el-card>
</template>
<script>
//导入vuex辅助函数
import {
    mapState
} from 'vuex'
export default {
    //切换keep时，触发该方法
    activated: function() {
        this.getData();
    },
    data() {
        return {
            total: 0,
            loading: false,
            currentPage: 1,
            keys: '',
            tableData: [],
            multipleSelection: [],
            pid: '',
            cid: ''
        }
    },
    methods: {
        KeysChange(val) {
            this.keys = val.replace(/[\'\"]/g, '')
            this.getData();
        },
        //下拉筛选
        handleChange(val) {
            this.cid = val
            this.getData()
        },
        //跳转至添加或编辑项目页面
        addProject() {
            this.$router.push({
                name: 'zhikuadd'
            })
        },
        //跳编辑页面
        handleEdit(id) {
            this.$router.push({
                name: 'zhikuedit',
                params: {
                    id: id
                }
            })
        },
        //多选
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        //删除数据记录
        handleDelete(id) {
            this.$confirm('是否确认删除？删除后将不可恢复!', '系统提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((response) => {
                this.pid = id;
                this.deleteData();
            }).catch(() => {

            })
        },
        //批量删除
        piliangDeleted() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: 'warning',
                    message: '请选择需要删除的内容'
                })
                return
            }
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (var i in this.multipleSelection) {
                    this.multipleSelection[i] = this.multipleSelection[i].id
                }
                this.pid = this.multipleSelection.join(',')
                this.deleteData()
            }).catch(() => {});
        },
        //显示页条数
        handleSizeChange(val) {
            this.$store.commit('setPageSize', val);
            this.getData();
        },
        //监听当前页数
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData();
        },
        //获取主数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/zhiku/',
                data: {
                    keys: this.keys,
                    page: this.currentPage,
                    listRows: this._pageSize,
                    cid: this.cid
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.tableData = response.data.data
                    this.total = response.data.count
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        },
        deleteData() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/zhiku/delete',
                data: {
                    id: this.pid
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$message({
                        message: '数据删除成功！',
                        type: 'success'
                    });
                    this.getData();
                    this.multipleSelection = []
                }
            }, (error) => {
                this.$emit('API-ERR');
            })
        },
        zhikulx(value) {
            if (!value)
                return
            value = value.split(',')
            let val = [],
                x = 0;
            for (var i = 0; i < this.zkleixing.length; i++) {
                for (var j = 0; j < value.length; j++) {
                    if (value[j] == this.zkleixing[i].id) {
                        val[x] = this.zkleixing[i].title
                        x++
                    }
                }

            }
            return val.join(",")
        }
    },
    computed: mapState({
        _pageSize: state => state.pageSize,
        _pageSizes: state => state.pageSizes,
        zkleixing: state => state.zkleixing
    })
}
</script>
