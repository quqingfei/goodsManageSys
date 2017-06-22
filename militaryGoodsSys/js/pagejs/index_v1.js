(function ($) {
  $(window.document).ready(function () {
    var dataCenter = $.getDataCenterIntance();
    var comming = $.getComming();
    var vm = new Vue({
        el:'#index_v1',
        data:{
            constructTime:'',
            streamTime:'',
            shutdownTime:'',
            storeroomNumber:'',
            membersNumber:'',
            esctpStoreroom:'',
            coveredArea:'',
            storeroomTotalArea:'',
            totalUseArea:'',
            alarmStoreroomNumber:'',
            esctpStoreroom:'',
            fixStoreroomNumber:'',
            nationalStoreroom:'',
            remainStoreroom:'',
            saturationStoreroom:'',
            storeroomTotal:'',
            totalUseRate:'',
            troubleStoreroomNumber:'',
            todos:[],
        },
        methods:{
            getManageInfo:function(){
                dataCenter.getIndex_v1Info(comming.getFatherQueryString('userid'),function(res){
                    var data = vm.$data;
                    data.constructTime = res.constructTime;
                    data.streamTime = res.streamTime;
                    data.shutdownTime = res.shutdownTime;
                    data.storeroomNumber = res.storeroomNumber;
                    data.membersNumber = res.membersNumber;
                    data.esctpStoreroom = res.esctpStoreroom;
                    data.coveredArea = res.coveredArea;
                    data.storeroomTotalArea = res.storeroomTotalArea;
                    data.totalUseArea = res.totalUseArea;
                },function(err){console.log(err)})
            }(),
            getRoomInfo: function(){
                dataCenter.getRoomInfo(comming.getFatherQueryString('userid'),function(res){
                    var data = vm.$data;
                    data.alarmStoreroomNumber = res.alarmStoreroomNumber;
                    data.esctpStoreroom = res.esctpStoreroom;
                    data.fixStoreroomNumber = res.fixStoreroomNumber;
                    data.nationalStoreroom = res.nationalStoreroom;
                    data.saturationStoreroom = res.saturationStoreroom;
                    data.storeroomTotal = res.storeroomTotal;
                    data.totalUseRate = res.totalUseRate;
                    data.troubleStoreroomNumber = res.troubleStoreroomNumber;
                    data.remainStoreroom = res.remainStoreroom;
                },function(err){console.log(err)})
            }(),
            getItemsInfo: function(){
                dataCenter.getItemsInfo(comming.getFatherQueryString('userid'),function(res){
                    var  pieName = [],pieData = [];
                    $.each(res,function(index,item){
                        vm.$data.todos.push(item);
                        var comb={                            
                            value:item.commodityCount,
                            name:item.commodityName
                        }
                        pieName.push(item.commodityName)
                        pieData.push(comb)
                    })
                    vm.$root.charPie(pieName,pieData);
                },function(err){console.log(err)})
            }(),
            charPie: function(data,ite){
                var h = echarts.init(document.getElementById("echarts-pie-chart"));
                var e = {
                    title: {
                        text: "物资概况",
//                        subtext: "纯属虚构",
                        x: "center"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}<br/>{b} : {c} {d}%"
                    },
                    legend: {
                        orient: "vertical",
                        x: "left",
                        data: data
                    },
                    calculable: true,
                    series: [{
                        name: "物资占比",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: ite
                    }]
                };
                h.setOption(e);
                $(window).resize(h.resize);
            }
        }
    });
  })
})(jQuery);
