$(function(){

    $('header').load('inc.html header article');  
    $('footer').load('inc.html footer div'); 


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


    //스크롤 이벤트
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


    //rooms info - prev, next
    var ani04 = document.querySelector('.rooms_info figure p'); 
    var ani04Len = ani03.querySelectorAll('img').length; 
    var btnPre02 = document.querySelector('.rooms_info_btnL');
    var btnNext02 = document.querySelector('.rooms_info_btnR');
    var current02 = 0;

    function next02(){
        current02++;
        if(current02 == ani04Len) current02 = 0;
        ani04.style = 'transform:translateX('+ -100 * current02 + '%)';
    }

    function pre02(){
        current02--; 
        if(current02 == -1) current02 = ani04Len-1; // 0,1,2 번째
        ani04.style = 'transform:translateX('+ -100 * current02 + '%)';  // 100%, 200%, 300%
    }

    btnNext02.addEventListener('click',function(e){
        e.preventDefault();
        next02();
    });
    btnPre02.addEventListener('click',function(e){
        e.preventDefault();
        pre02();

    });




})