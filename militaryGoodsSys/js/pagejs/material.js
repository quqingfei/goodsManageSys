$(function(){

    $('input').on('ifClicked',function(e){
       var s = $(this).val();
        console.log(s);
        
        if(s=='list'){  
            $('.detials').hide();
            $('.lists').fadeIn(200);
        }else if(s=='detial'){
            $('.lists').hide();
            $('.detials').fadeIn(200);
        }
    })

})