<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="4">
                    <el-input placeholder="检索：节点名称" v-model="filterText"> </el-input>
                </el-col>
                <el-col :md="20" :xs="20" :sm="20" class="text-right">
                    <el-button type='primary' v-if="authCheck(45)" @click="handleADD">
                        <i class="ti-plus"></i> 添加一级节点
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+'px'}">
            <el-tree :data="tableData" :expand-on-click-node="false" :props="defaultProps" node-key="id" highlight-current :render-content="renderContent" default-expand-all ref="tree" :filter-node-method="filterNode">
            </el-tree>
        </div>
        <categoryAdd :dialogStatus="dialog" :tijid="tijid" @CB-dialogStatus="CB_dialogStatus"></categoryAdd>
        <categoryZilei :dialogState="dialogState" :tjdata="tjdata" @CB-dialogState="CB_dialogState"></categoryZilei>
        <categoryEdit :dialogSta="dialogSta" :tjid="tjid" @CB-dialogSta="CB_dialogSta"></categoryEdit>
    </el-card>
</template>
<script>
import categoryAdd from '@/page/system/categoty_add'
import categoryZilei from '@/page/system/category_zilei'
import categoryEdit from '@/page/system/category_edit'

export default {
    //切换keep时，触发该方法
    activated: function() {
        this.getData();
    },
    data() {
        return {
            loading: false,
            tableData: [],
            dialog: false,
            dialogState: false,
            dialogSta: false,
            tjdata: '',
            tijid: '',
            tjid: {},
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            filterText: ''
        }
    },
    watch: {
        'filterText': function(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.title.indexOf(value) !== -1;
        },
        //重新渲染节点
        renderContent: function(createElement, {
            node,
            data,
            store
        }) {
            var self = this;
            return createElement('span', [
                createElement('span', node.label),
                createElement('span', {
                    attrs: {
                        class: 'pull-right margin-right-20'
                    }
                }, [createElement('div', {
                        attrs: {
                            class: "el-button-group"
                        }
                    }, [
                        createElement('el-button', {
                            attrs: {
                                size: "small",
                                type: 'info',
                                icon: 'plus'
                            },
                            on: {
                                click: function() {
                                    self.tjdata = data
                                    self.dialogState = true
                                }
                            }
                        }, "添加子类"),
                        createElement('el-button', {
                            attrs: {
                                size: "small",
                                type: 'primary',
                                icon: 'edit'
                            },
                            on: {
                                click: function() {
                                    if (data.pid == 0) {
                                        self.tijid = data.id
                                        self.dialog = true
                                    } else {
                                        self.tjid = data.id
                                        self.dialogSta = true
                                    }
                                }
                            }
                        }, "编辑"),
                        createElement('el-button', {
                            attrs: {
                                size: "small",
                                type: 'danger',
                                icon: 'delete2'
                            },
                            on: {
                                click: function() {
                                    self.$confirm('确定要删除吗？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        self.axios({
                                            method: 'post',
                                            url: self.API_ROOT + '/api/category/delete',
                                            data: {
                                                id: data.id
                                            },
                                            headers: self.$store.getters.Request_Head
                                        }).then((response) => {
                                            if (response.data.status.code !== 1001) {
                                                self.$message.error(response.data.data ? response.data.data : response.data.status.title)
                                                if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                                                    self.lockout()
                                                }
                                            } else {
                                                self.$message({
                                                    type: 'success',
                                                    message: '删除成功'
                                                })
                                                self.getData()
                                            }
                                        }, (error) => {
                                            self.$emit('API-ERR')
                                        })
                                    }).catch(() => {

                                    })
                                }
                            }
                        }, "删除")
                    ])

                ]),
                //显示路由名称
                createElement('span', {
                    attrs: {
                        class: 'pull-right margin-right-20',
                        style: 'width:200px'
                    }
                }, data.router_name),
                //显示接口名称
                createElement('span', {
                    attrs: {
                        class: 'pull-right margin-right-20',
                        style: 'width:200px'
                    }
                }, data.api_name)
            ])
        },
        //添加
        handleADD() {
            this.tijid = ''
            this.dialog = true
        },
        //获取主数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/category/tree',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.tableData = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.$emit('API-ERR')
                this.loading = false
            })
        },
        CB_dialogStatus(val) {
            if (val == 1) {
                this.getData()
            }
            this.tijid = ''
            this.dialog = false
        },
        CB_dialogState(val) {
            if (val == 1) {
                this.getData()
            }
            this.tjdata = ''
            this.dialogState = false
        },
        CB_dialogSta(val) {
            if (val == 1) {
                this.getData()
            }
            this.tjid = {}
            this.dialogSta = false
        }
    },
    components: {
        categoryAdd,
        categoryZilei,
        categoryEdit
    }
}
</script>
