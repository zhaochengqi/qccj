<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="6" :sm="6" class="pad-rgt">
                    <el-input placeholder="检索：专题名称、专题标签" icon="search" v-model="keys" @change="KeysChange">
                    </el-input>
                </el-col>
                <el-col :md="6" :sm="6" class="pad-rgt">
                    <el-select v-model="label" placeholder="不限专题" clearable @change="handleChange" style="width:100%">
                        <el-option v-for="(item,index) in ztbiaoqian" :label="item" :value="item" :key="index"></el-option>
                    </el-select>
                </el-col>
                <el-col :md="12" :sm="12" class="text-right">
                    <el-button-group v-if="authCheck(11)&&authCheck(53)">
                        <el-button type="primary" icon="plus" @click="addZhuanti">添加专题</el-button>
                        <el-button type="danger" icon="delete2" @click="piliangDeleted">批量删除</el-button>
                    </el-button-group>
                    <div v-else>
                        <el-button type="primary" icon="plus" v-if="authCheck(11)" @click="addZhuanti">添加专题</el-button>
                        <el-button type="danger" v-if="authCheck(53)" icon="delete2" @click="piliangDeleted">批量删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-table :data="tableData" stripe highlight-current-row border style="width: 100%" @selection-change="handleSelectionChange" :default-sort="{prop: 'add_time', order: 'descending'}" @sort-change="handleSort">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column prop="title" min-width="280" show-overflow-tooltip label="专题名称">
                    <template scope="scope">
                        <a :href="scope.row.link" target="_Blank" class="text-primary">{{scope.row.title}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="label" min-width="150" label="专题标签" show-overflow-tooltip></el-table-column>
                <el-table-column prop="link" min-width="240" label="链接地址" show-overflow-tooltip>
                    <template scope="scope">
                        {{scope.row.link}}
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" width="150" sortable="custom">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="150" align="center" v-if="authCheck(12)||authCheck(53)">
                    <template scope="scope">
                        <el-button-group>
                            <el-button size="small" type='primary' v-if="authCheck(12)" @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                            <el-button size="small" v-if="authCheck(53)" type="danger" @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete2"></i> 删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="clearfix">
            <el-pagination class="margin-top-20 text-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="_pageSizes" :page-size="_pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>
<script>
//导入vuex辅助函数
import {
    mapState
} from 'vuex'

export default {
    activated: function() {
        this._order = 'add_time';
        this._sort = 'desc';
        this.getData();
    },
    data() {
        return {
            total: 0,
            loading: false,
            currentPage: 1,
            keys: "",
            tableData: [],
            multipleSelection: [],
            _order: '',
            _sort: '',
            label: ''
        }

    },
    methods: {
        KeysChange(val) {
            this.keys = val.replace(/[\'\"]/g, '')
            this.getData();
        },
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
        //下拉搜索
        handleChange(val) {
            this.label = val
            this.getData()
        },
        //多选框
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        //跳转至添加新闻页面
        addZhuanti() {
            this.$router.push({
                name: 'addZhuanti'
            })
        },
        //跳编辑页面，开发时注册此处先验证一下id必须为大于0的整形后再执行跳转，否则抛出非法参数请求的消息
        handleEdit(id) {
            this.$router.push({
                name: 'editZhuanti',
                params: {
                    id: id
                }
            })
        },

        //删除数据记录
        handleDelete(id) {
            this.$confirm('确定要删除数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteData(id)
            }).catch(() => {});
        },
        //批量删除
        piliangDeleted() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: 'warning',
                    message: '请选择需要删除的内容'
                });
                return
            }
            this.$confirm('确定要删除数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (var i in this.multipleSelection) {
                    this.multipleSelection[i] = this.multipleSelection[i].id
                }
                this.deleteData(this.multipleSelection)
            }).catch(() => {

            });
        },
        handleSizeChange(val) {
            this.$store.commit('setPageSize', val);
            this.getData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData();
        },
        getData() {
            //请求数据
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/zhuanti',
                data: {
                    _order: this._order,
                    _sort: this._sort,
                    keys: this.keys,
                    page: this.currentPage,
                    listRows: this._pageSize,
                    label: this.label
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
        deleteData(id) {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/zhuanti/delete',
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
                        message: '数据删除成功！',
                        type: 'success'
                    });
                    this.multipleSelection = []
                    this.getData()
                }
            }, (error) => {
                this.$emit('API-ERR');
            })
        },
        //打开发布通知公告页面
        pushNotice() {
            this.$router.push({
                name: 'pushNotice'
            })
        }
    },
    computed: mapState({
        _pageSize: state => state.pageSize,
        _pageSizes: state => state.pageSizes,
        ztbiaoqian: state => state.ztbiaoqian
    })
}
</script>
