<template>
    <div class="background">
        <div class="intro">
            <h2 style="text-align: center;">全民阅读 从儿童开始</h2>
        </div>
        <div class="lunbo"><!----轮播图---->
            <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item>
                    <h3 class="first" style="text-align: center;">
                        示例jhkdas
                    </h3>
                </el-carousel-item>
                <el-carousel-item>
                    <img style="width: 100%; height: 100%;"
                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQHaEo?w=300&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7">
                </el-carousel-item>
                <el-carousel-item>
                    <h3 class="third">3</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="graph">
            <div class="graph1">
                <el-card style="width: 90%;; margin-left: 20px;" shadow="hover">
                   <graph1></graph1>
                </el-card>
            </div>
            <div class="graph2">
                <el-card style="width: 90%; margin-left: 20px;" shadow="hover">
                   <graph2></graph2>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import graph1 from './graph1.vue'
import graph2 from './graph2.vue'
export default {
    components: {
    graph1,
    graph2
  },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style scoped>
 
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.background {
    width: 100%;
    height: 100%;
}

.intro {
    position: relative;
    height: 6%;
    width: 100%;
}

.lunbo {
    position: relative;
    height: 50%;
    width: 100%;
}

.graph {
    display: flex;
    position: relative;
    height: 40%;
    width: 100%;

}

.graph1 {
    display: flex;
    position: relative;
    height: 100%;
    width: 50%;
   
}

.graph2 {
    display: flex;
    position: relative;
    height: 100%;
    width: 50%;
}
</style>
