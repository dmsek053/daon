$(function(){
    


    //클릭 시 스크롤 상단으로 이동.
    $('.top_btn').on('click',function(){
        $('html').animate({ scrollTop : 0 });
    })


    //메인 슬라이드
    var ani03 = document.querySelector('.slide span'); 
    var ani03Len = ani03.querySelectorAll('img').length; 
    var btnPre = document.querySelector('.btn_left');
    var btnNext = document.querySelector('.btn_right');
    var current = 0;

    function next(){
        current++;
        if(current == ani03Len) current = 0;
        ani03.style = 'transform:translateX('+ -100 * current + '%)';
    }

    function pre(){
        current--;  // -1, -2, -3
        if(current == -1) current = ani03Len-1; // 0,1,2 번째
        ani03.style = 'transform:translateX('+ -100 * current + '%)';  // 100%, 200%, 300%
    }

    btnNext.addEventListener('click',next);
    btnPre.addEventListener('click',pre);



    //main 무한반복
    setInterval(interval,6000); 

    var num = 0;
    function interval(){
        num++;  
        if(num == ani03Len) num = 0; 
        ani03.style = 'transform:translateX('+ -100 * num + '%)'; // 1번째 실행 : -100% / 2번째 실행 : -200% / 3번째 실행 : -300%
    }




    //explan01,02 스크롤시 글자 위로
    var winHei,scrPos,imgPos;
    $(window).on('scroll',function(){
        winHei = $(window).height();
        scrPos = $(this).scrollTop();

        $('.explan01, .explan02').each(function(i){
            imgPos = $('.explan01, .explan02').eq(i).offset().top;

            if(imgPos - winHei < scrPos){
                $('.explan01, .explan02').eq(i).addClass('active');
            }
        });

    });
})