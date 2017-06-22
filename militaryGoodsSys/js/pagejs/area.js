$(function(){
	var p = echarts.init(document.getElementById("echarts-gauge0-chart"));
	var l = echarts.init(document.getElementById("echarts-gauge1-chart"));
	var v = echarts.init(document.getElementById("echarts-gauge2-chart"));
    var n = {
        tooltip: {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        series: [{
            name: "温度",
            type: "gauge",
            min: 0,
            max: 220,
            splitNumber: 11,
            axisLine: {
                lineStyle: {
                    width: 10
                }
            },
            axisTick: {
                length: 15,
                lineStyle: {
                    color: "auto"
                }
            },
            splitLine: {
                length: 20,
                lineStyle: {
                    color: "auto"
                }
            },
            title: {
                textStyle: {
                    fontWeight: "bolder",
                    fontSize: 20,
                    fontStyle: "italic"
                }
            },
            detail: {
                textStyle: {
                    fontWeight: "bolder"
                }
            },
            data: [{
                value: 40,
                name: "°C"
            }]
        }]
    };
    p.setOption(n);
    l.setOption(n);
    v.setOption(n);
    $(window).resize(p.resize);
    $(window).resize(l.resize);
    $(window).resize(v.resize);
    var v = echarts.init(document.getElementById("echarts-line-chart"));
    var k = {
        title: {
            text: ""
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["最高温度", "最低温度","最高湿度","最低湿度"]
        },
        grid: {
            x: 40,
            x2: 40,
            y2: 24
        },
        calculable: false,
        xAxis: [{
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: "{value} °C"
            }
        }],
        series: [{
            name: "最高温度",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
                data: [{
                    type: "max",
                    name: "最大值"
                },
                {
                    type: "min",
                    name: "最小值"
                }]
            },
            markLine: {
                data: [{
                    type: "average",
                    name: "平均值"
                }]
            }
        },
        {
            name: "最高湿度",
            type: "line",
            data: [10, 13, 11, 14, 12, 3, 10],
            markPoint: {
                data: [{
                    type: "max",
                    name: "最大值"
                },
                {
                    type: "min",
                    name: "最小值"
                }]
            },
            markLine: {
                data: [{
                    type: "average",
                    name: "平均值"
                }]
            }
        },
        {
            name: "最低温度",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [{
                    name: "周最低",
                    value: -2,
                    xAxis: 1,
                    yAxis: -1.5
                }]
            },
            markLine: {
                data: [{
                    type: "average",
                    name: "平均值"
                }]
            }
        },
        {
            name: "最低湿度",
            type: "line",
            data: [1, -1, 3, 4, 5, 3, 2],
            markPoint: {
                data: [{
                    name: "周最低",
                    value: -2,
                    xAxis: 1,
                    yAxis: -1.5
                }]
            },
            markLine: {
                data: [{
                    type: "average",
                    name: "平均值"
                }]
            }
        }]
    };
    v.setOption(k);
    $(window).resize(v.resize);
})