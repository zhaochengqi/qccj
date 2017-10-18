<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row :gutter="20">
                <el-col :md="6">
                    <el-input placeholder="检索：用户名、姓名" icon="search" @change="keysChange" v-model="keys">
                    </el-input>
                </el-col>
                <el-col :md="5">
                    <el-select v-model="rulesZU" style="width:100%;" @change="rulesChange" clearable placeholder="不限角色组">
                        <el-option v-for="item in rules_juesezu" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :md="13" class="text-right">
                    <el-button-group v-if="authCheck(113)||authCheck(114)">
                        <el-button type="primary" class="daochu_xiangmu" v-if="authCheck(113)" @click="addAdmin('')"><i class="fa fa-user-plus"></i> 添加管理员</el-button>
                        <el-button type="danger" icon="delete2" class="daochu_xiangmu" v-if="authCheck(114)" @click="AllDelete">批量删除</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-table :data="tableData" border style="width: 100%" @sort-change="handleSort" @selection-change="handleSelectionChange" :default-sort="{prop: 'add_time', order: 'descending'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="account" label="用户名" show-overflow-tooltip min-width="130">
                </el-table-column>
                <el-table-column prop="nickname" label="姓名" show-overflow-tooltip min-width="100">
                </el-table-column>
                <el-table-column prop="group_title" label="角色组" show-overflow-tooltip min-width="150">
                </el-table-column>
                <el-table-column prop="phone" label="手机" min-width="110">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" show-overflow-tooltip min-width="140">
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="90" :filters="[{ text: '正常', value: 1 }, { text: '禁用', value: 2 }]" :filter-method="filterTag">
                    <template scope="scope">
                        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" close-transition>
                            {{scope.row.status === 1 ? '正常' : '禁用'}}
                        </el-tag>
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column label="操作" v-if="authCheck(115)||authCheck(119)||authCheck(118)||authCheck(114)" fixed="right" width="275">
                    <template scope="scope">
                        <el-button-group>
                            <el-button size="small" class="jsGroupButton" v-if="authCheck(115)&&scope.row.status==1" type='warning' @click="handleStop(scope.row,2)">
                                <i class="ti-lock mini"></i>禁用
                            </el-button>
                            <el-button size="small" class="jsGroupButton" v-if="authCheck(115)&&scope.row.status==2" type='info' @click="handleStop(scope.row,1)">
                                <i class="ti-unlock mini"></i>启用
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type="success" v-if="authCheck(118)" @click="gaimiAdmin(scope.row.id)">
                                <i class="ti-key"></i> 改密
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type="primary" v-if="authCheck(119)" @click="addAdmin(scope.row.id)">
                                <i class="ti-pencil-alt"></i> 编辑
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type="danger" v-if="authCheck(114)" @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete2"></i> 删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="clearfix">
            <template>
                <el-pagination class="margin-top-20 text-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="_pageSizes" :page-size="_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </div>
        <UsersAdd :dialogFormVisible="dialogFormVisible" :id="id" @CB-dialogFormVisible="CB_dialogFormVisible"></UsersAdd>
    </el-card>
</template>
<script>
import UsersAdd from './users_add.vue'
export default {
    activated: function() {
        this._order = 'add_time';
        this._sort = 'desc';
        this.getData()
    },
    data() {
        return {
            keys: '',
            rulesZU: '',
            loading: false,
            tableData: [],
            multipleSelection: [],
            currentPage: 1,
            total: 0,
            _order: '',
            _sort: "",
            dialogFormVisible: false,
            id: -1
        }
    },
    methods: {
        //排序
        handleSort(val) {
            if (val.prop == null || !val.prop) {
                this._order = "add_time";
                this._sort = 'desc';
            } else {
                this._order = val.prop
                if (val.order == "ascending") {
                    this._sort = "asc"
                } else if (val.order == "descending") {
                    this._sort = "desc"
                }
            }
            this.getData();
        },
        //搜索
        keysChange(val) {
            this.keys = val;
            this.getData();
        },
        //选择角色组
        rulesChange(val) {
            this.rulesZU = val;
            this.getData()
        },
        //禁用启用
        handleStop(row, val) {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/user/disabled',
                data: {
                    id: row.id,
                    status: val
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$message.success('数据保存成功');
                    this.getData()
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        //改密
        gaimiAdmin(val) {
            this.$confirm('您确定要重置密码吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/user/reset',
                    data: {
                        id: val
                    },
                    headers: this.$store.getters.Request_Head
                }).then((response) => {
                    if (response.data.status.code !== 1001) {
                        this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                        if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                            this.lockout()
                        }
                    } else {
                        this.$message.success('密码重置成功，默认密码为：111111');
                    }
                    this.loading = false
                }, (error) => {
                    this.loading = false
                    this.$emit('API-ERR')
                })
            }).catch(() => {

            });
        },
        //添加
        addAdmin(val) {
            this.id = val
            this.dialogFormVisible = true
        },
        //多选框
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        filterTag(value, row) {
            return row.status === value;
        },
        //删除
        handleDelete(id) {
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteData(id)
            }).catch(() => {

            });
        },
        //批量删除
        AllDelete() {
            if (this.multipleSelection.length == 0) {
                return this.$message.warning('请选择您要删除的内容')
            }
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    this.multipleSelection[i] = this.multipleSelection[i].id
                }
                this.multipleSelection = this.multipleSelection.join(",")
                this.deleteData(this.multipleSelection)
            }).catch(() => {

            });
        },
        handleSizeChange(val) {
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData()
        },
        //获取数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/user',
                data: {
                    _order: this._order,
                    _sort: this._sort,
                    group_id: this.$route.params.id,
                    page: this.currentPage,
                    listRows: this._pageSize,
                    id: this.rulesZU,
                    keys: this.keys
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.tableData = response.data.data;
                    this.total = response.data.count
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR')
            })
        },
        //给子组件调用的函数
        CB_dialogFormVisible() {
            this.dialogFormVisible = false
            this.id = -1
            this.getData();
        },
        //删除
        deleteData(id) {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/user/delete',
                data: {
                    id: id
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
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.multipleSelection = [];
                    this.getData()
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR')
            })
        }
    },
    computed: {
        //定义“computed”属性，当store中的相应值变动时，当前页面中在此处定义的所有变量将自动更新
        _pageSize: function() {
            return this.$store.state.pageSize
        },
        _pageSizes: function() {
            return this.$store.state.pageSizes
        },
        rules_juesezu: function() {
            return this.$store.state.rules_juesezu
        }
    },
    components: {
        UsersAdd
    }

}
</script>
<style>
.el-table {
    font-size: 13px;
}

.daochu_xiangmu {
    height: 36.5px;
}
</style>
