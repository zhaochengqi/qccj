<template>
    <li class="dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
            <i class="demo-pli-bell"></i>
            <span class="badge badge-header badge-danger"></span>
        </a>
        <!--菜单开始-->
        <div class="dropdown-menu dropdown-menu-md">
            <div class="pad-all bord-btm">
                <p class="text-semibold text-main mar-no">您有 9 条未读消息</p>
            </div>
            <div class="nano scrollable">
                <div class="nano-content">
                    <ul class="head-list">
                        <li>
                            <a class="media" href="#">
                                <div class="media-left">
                                    <i class="demo-pli-add-user-plus-star icon-2x"></i>
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">New User Registered</div>
                                    <small class="text-muted">4 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <!-- Dropdown list-->
                        <li>
                            <a class="media" href="#">
                                <div class="media-left">
                                    <img class="img-circle img-xs" alt="Profile Picture" src="../../assets/img/profile-photos/9.png">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Lucy sent you a message</div>
                                    <small class="text-muted">30 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <!-- Dropdown list-->
                        <li>
                            <a class="media" href="#">
                                <div class="media-left">
                                    <img class="img-circle img-xs" alt="Profile Picture" src="../../assets/img/profile-photos/3.png">
                                </div>
                                <div class="media-body">
                                    <div class="text-nowrap">Jackson sent you a message</div>
                                    <small class="text-muted">40 minutes ago</small>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!--Dropdown footer-->
            <div class="pad-all bord-top">
                <a href="#" class="btn-link text-dark box-block">
                    <i class="fa fa-angle-right fa-lg pull-right"></i> 查看所有系统通知消息！
                </a>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    data: function() {
        return {

        }
    }
}
</script>
