<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="6">
                    <el-input placeholder="检索：用户名、URL、数据" icon="search" v-model="keys">
                    </el-input>
                </el-col>
                <el-col :md="18" class="text-right">
                    <el-button type="danger" icon="delete" v-if="authCheck(48)" @click="piliangDeleted">批量删除</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-table :data="tableData" border style="width: 100%" stripe @selection-change="selectChange" @sort-change="handleSort">
                <el-table-column type="selection" width="40"> </el-table-column>
                <el-table-column prop="add_time" label="添加时间" width="160" sortable='custom'>
                </el-table-column>
                <el-table-column prop="name" label="用户名" width="80">
                </el-table-column>
                <el-table-column prop="url" label="URL" width="140">
                </el-table-column>
                <el-table-column prop="ip" label="IP" width="120">
                </el-table-column>
                <el-table-column prop="postdata" label="数据"></el-table-column>
                <el-table-column label="操作" width="80" v-if="authCheck(48)">
                    <template scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
                            <i class="el-icon-delete"></i> 删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="clearfix">
            <template>
                <el-pagination class="margin-top-20 text-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="_PageSizes" :page-size="_PageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </div>
    </el-card>
</template>
<script>
export default {
    created: function() {
        this._order = 'add_time';
        this._sort = 'desc';
        this.getData();
    },
    data() {
        return {
            keys: '',
            loading: false,
            tableData: [],
            value: '',
            total: null,
            //当前页
            currentPage: 1,
            _order: '',
            _sort: '',
            listChange: []
        }
    },
    watch: {
        'keys': function(newvalue, oldvalue) {
            this.keys = newvalue;
            this.getData();
        }
    },
    methods: {
        //排序
        handleSort(val) {
            if (val.prop == null || !val.prop) {
                this._order = 'add_time';
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
        //批量删除
        piliangDeleted() {
            if (this.listChange.length == 0) {
                return this.$message({
                    type: 'warning',
                    message: '请选择需要删除的内容'
                })
            }
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (var i in this.listChange) {
                    this.listChange[i] = this.listChange[i].id
                }
                this.deleteData(this.listChange)
            }).catch(() => {})
        },
        selectChange(val) {
            this.listChange = val;
        },
        //删除用户
        handleDelete(id) {
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteData(id)
            }).catch(() => {})
        },
        //每页显示多少条
        handleSizeChange(val) {
            this.$store.commit("setPageSize", val);
            this.getData();
        },
        //页码发生改变
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData();
        },
        //删除数据
        deleteData(id) {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/log/delete',
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
                        message: '用户删除成功！',
                        type: 'success'
                    })
                    this.getData();
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        //获取数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/log',
                data: {
                    _order: this._order,
                    _sort: this._sort,
                    //第几页
                    page: this.currentPage,
                    //显示几条
                    listRows: this._PageSize,
                    //检索用户名
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
                    this.tableData = response.data.data
                    this.total = response.data.count;
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR')
            })
        },
    },
    computed: {
        //获取每页显示条数数组
        _PageSizes() {
            return this.$store.state.pageSizes;
        },
        //获取当前显示条数
        _PageSize() {
            return this.$store.state.pageSize
        }
    }

}
</script>
<style>
.el-table {
    font-size: 13px;
}

.log_button {
    text-align: right;
}
</style>
