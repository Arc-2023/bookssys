
<template>
    <div id = "container">
        <img src="@/assets/image/home.png" width="100%" height="100%">
        <div id="links">
            <el-row>
              <!-- <el-col :span="4"></el-col> -->
              <el-col :span="24">
                  <el-row>
                    <el-col :span="8" class="link">
                        <div>
                            <div>
                                <div class="el-icon-s-cooperation link-icon"></div>
                            </div>
                            <br>
                            <router-link to="/index/detail" >
                                <el-link ><font color="black" size="5" face ="微软雅黑">成长路径</font></el-link>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="8" class="link">
                        <div>
                            <div>
                                <div class="el-icon-s-cooperation link-icon"></div>
                            </div>
                            <br>
                            <router-link to="/personal/detail" >
                                <el-link ><font color="black" size="5" face ="微软雅黑">个性化推荐</font></el-link>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="8" class="link">
                        <div>
                            <div>
                                <div class="el-icon-s-cooperation link-icon"></div>
                            </div>
                            <br>
                            <router-link to="/index/background" >
                                <el-link ><font color="black" size="5" face ="微软雅黑">背景与意义</font></el-link>
                            </router-link>
                        </div>
                    </el-col>
                  </el-row>
              </el-col>
              <!-- <el-col :span="4"></el-col> -->
            </el-row>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/common/topBar'
import bottomBar from '@/components/common/bottomBar'
export default {
  components: {
    topBar,
    bottomBar
  }
}
</script>
<style scoped>
#container {
    height: 71%;
    width: 100%;
}
#links {
    height: 44%;
    width: 100%;
    background-color: cadetblue;
    margin-top: -1%;
}
.el-row, .el-col {
    height: 100%;
}
.link {
    height: 100%;
    vertical-align:middle;
    text-align: center;
}
.link>div {
    position: relative;
    top: 15%;
    text-align: center;
}
.link>div>div {
    font-size: 50px;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    background-color: white;
    position: relative;
    left: calc(50% - 50px);
}
.link-icon {
    position: relative;
    top: 15px;
}
.desc {
    font-size: 24px;
}

a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}

</style>
