(function ($) {
  $(window.document).ready(function () {
    $('.wid50-detale div').click(function(){
        $(this).addClass('wids').siblings().removeClass('wids');
    })
    $('.showuserlist').click(function(){
        if($(this).attr('data-v')==0){
            $(this).attr('data-v',1);
            $('.adminlist').slideDown();
        }else{
            $(this).attr('data-v',0);
            $('.adminlist').slideUp();
        }
    })
    $('.closeser').click(function(){
        $('.adminlist').slideUp();
        $('.showuserlist').attr('data-v',0);
    });
    $('#kufangjiegou').click(function(){        
        $('.kufangjiegou').fadeIn(200);
        $('.duoweitu').hide();
    })
    $('#duoweitu').click(function(){        
        $('.duoweitu').fadeIn(200);
        $('.kufangjiegou').hide();
    })
  
    var dataCenter = $.getDataCenterIntance();
    var comming = $.getComming();
    var vm = new Vue({
        el:'#list',
        data:{
            todos:[],
            options:[],
            storeroomId:'',
            storeroomCategory:'',
            safeStoreRange:'',
            coveredArea:'',
            useArea:'',
            useRate:'',
            geologicStructure:'',
            bushWay:'',
            lwh:'',
            antiThunder:'',
            facilityStatus:'',
            useTime:'',
            completedTime:'',
            constructionTime:'',
            remarks:'',
            message:'(必填)数字1,2,3...类型',
            titles:'(必填)文本类型',
            alg: false,
            als:false
        },
        methods:{
            getStromsInfo:function(){
                var list = {
                    storeroomId:1,
                    pageIndex:1,
                    pageSize:20
                }
                dataCenter.getStromsInfo(list,function(res){
                    $.each(res,function(index,item){
                        vm.$data.todos.push(item);
                        vm.$data.options.push(item.storeroomId);
                        vm.$root.inputRadio();
                    })
                },function(err){
                    console.log(err);
                })
            }(),
            inputRadio:function(){
                setTimeout(function(){
                    $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
                    });
                },10) 
                setTimeout(function(){                    
                  $('input').on('ifClicked',function(e){
                   var s = $(this).val();
                    if(s=='list'){  
                        $('.detials').hide();
                        $('.lists').fadeIn(200);
                    }else if(s=='detial'){
                        $('.lists').hide();
                        $('.detials').fadeIn(200);
                    }
                })
                },20)
            },
            openAddCK: function(){
                $('#listPor').hide();
                $('#addCK').fadeIn(200);
                $('#addCK').css('left',0);
            },
            cencleCK: function(){
                $('#addCK').hide();
                $('#addCK').css('left','-100%');
                $('#listPor').show();
            },
            submitCK: function(){
                if(!vm.$data.storeroomId){
                    vm.$data.message = '仓库号码不能为空';
                    vm.$data.alg = true;                      
                    return false;
                }else if(!comming.isPositiveNum(vm.$data.storeroomId)){
                    vm.$data.message = '仓库号码只能为数字';
                    vm.$data.alg = true;
                    return false;
                }else if(!vm.$data.storeroomCategory){
                    vm.$data.titles = '仓库类型不能为空';
                    vm.$data.als = true;
                    return false;
                }
                vm.$data.useTime = $('.usedate').html();
                vm.$data.completedTime = $('.enddate').html();
                vm.$data.constructionTime = $('.startdate').html();
                dataCenter.addStromsInfo(vm.$data,function(res){
                    if(res.statusCode == 5){
                        alert('添加成功');
                        vm.$root.cencleCK();
                        vm.$root.getStromsInfo();
                    }else if(res.statusCode == 7){
                        alert('添加失败');
                    }
                },function(err){console.log(err)})
            },
            focusCkNum: function(){
                vm.$data.message = '(必填)数字1,2,3...类型';
                vm.$data.alg = false;
            },
            focusCkWum: function(){
                vm.$data.titles = '(必填)文本类型';
                vm.$data.als = false;
            }
        }
    });
  })
})(jQuery);
