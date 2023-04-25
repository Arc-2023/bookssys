<template>
    <div ref="graph1" style="width: 100%; height: 260px;"></div>
</template>
<script>
import * as echarts from 'echarts/core';
import 'echarts/theme/macarons.js'
export default {
    data() {
        return {}
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var myChart = echarts.init(this.$refs.graph1, 'macarons');
            var option = {
                title: {
                    text: '各国儿童年均阅读量',
                    top:"0%",
                    left:'0%',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right:30,
                    data: ['中国', '日本', '美国', '俄罗斯', '法国', '韩国','印度']
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '2%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [2016,2017,2018,2019,2020,2021,2022]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '中国',
                        type: 'line',
                        stack: 'Total',
                        data: [6, 7, 10, 10, 12, 15, 17]
                    },
                    {
                        name: '日本',
                        type: 'line',
                        stack: 'Total',
                        data: [10, 8, 9, 11, 12, 15, 16]
                    },
                    {
                        name: '美国',
                        type: 'line',
                        stack: 'Total',
                        data: [11, 12, 16, 15, 16, 20, 20]
                    },
                    {
                        name: '俄罗斯',
                        type: 'line',
                        stack: 'Total',
                        data: [10, 12, 9, 11, 15, 18, 16]
                    },
                    {
                        name: '法国',
                        type: 'line',
                        stack: 'Total',
                        data: [10, 12, 11, 12, 13, 15, 15]
                    },
                    {
                        name: '韩国',
                        type: 'line',
                        stack: 'Total',
                        data: [8, 8, 9, 10, 10, 11, 14]
                    },
                    {
                        name: '印度',
                        type: 'line',
                        stack: 'Total',
                        data: [7, 8, 9, 11, 10, 8, 9]
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
};
</script>