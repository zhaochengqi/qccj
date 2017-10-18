<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="6">
                    <el-input placeholder="检索：用户名 " icon="search" v-model="keys" @change="handleKeys">
                    </el-input>
                </el-col>
                <el-col :md="2" class="pad-lft">
                    <el-select v-model="value" placeholder="排序" clearable @change="selectOrder">
                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :md="16" class="log_button">
                    <el-button type="primary" @click="logExport"><i class="fa fa-cloud-upload"></i> 导出日志</el-button>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="add_time" label="添加时间" width="160" sortable>
                </el-table-column>
                <el-table-column prop="name" label="用户名" width="120">
                </el-table-column>
                <el-table-column prop="url" label="URL">
                </el-table-column>
                <el-table-column prop="ip" label="IP">
                </el-table-column>
                <el-table-column prop="postdata" label="数据"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
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
            options: [{
                label: '正序',
                value: 'asc'
            }, {
                label: '反序',
                value: 'desc'
            }]

        }
    },
    methods: {
        //排序
        handleKeys(val) {
            this.keys = val
            this.getData()
        },
        //删除日志
        handleDelete(index) {
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/log/delect',
                    data: {
                        id: index
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
                            message: '日志删除成功！',
                            type: 'success'
                        });
                    }
                    this.loading = false
                }, (error) => {
                    this.loading = false
                    this.$emit('API-ERR')
                })

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
        //当排序发生变化
        selectOrder(val) {
            this.value = val;
            this.getData();
        },
        //获取数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/log',
                data: {
                    page: this.currentPage,
                    listRows: this._PageSize,
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
