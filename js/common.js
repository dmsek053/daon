$(function(){


    $('header').load('inc.html header article',function(){

        // nav a 클릭시 스크롤
        var scrollPos;

        $('.sub a').eq(0).on('click',function(e){
            e.preventDefault();
            scrollPos = $("#about").offset().top;
            $('html').animate({
                scrollTop: scrollPos
            }, 1000);
        })
        $('.sub a').eq(1).on('click',function(e){
            e.preventDefault();
            scrollPos = $("#rooms").offset().top;
            $('html').animate({
                scrollTop: scrollPos
            }, 1000);
        })
        $('.sub a').eq(2).on('click',function(e){
            e.preventDefault();
            scrollPos = $("#facilities").offset().top;
            $('html').animate({
                scrollTop: scrollPos
            }, 1000);
        })
        $('.sub a').eq(3).on('click',function(e){
            e.preventDefault();
            scrollPos = $("#direction").offset().top;
            $('html').animate({
                scrollTop: scrollPos
            }, 1000);
        })
    
        // header 스크롤시 active 효과
        var aboutScrTop = $("#about").offset().top;

        $(window).on('scroll', function(){

            if($(window).scrollTop() >= aboutScrTop){
                $('header article nav div a, header article .slash, .menu-trigger span').addClass('active'); 
                $('header h1 a').css({display:'none'})
            }else{
                $('header article nav div a, header article .slash, .menu-trigger span').removeClass('active'); 
                $('header h1 a').css({display:'inline-block'})
            }
          });
    }); 
    
    
    $('footer').load('inc.html footer div'); 





    // rooms info,reservation json불러오기
    $.ajax({
        url:'data.json',
        success:function(data){
            var href,imgSrc,title,detail,tagList='';

            function dataFun(){

                data.roomsInfo.forEach(function(value){
                    
                        href = value.href;
                        imgSrc = value.imgSrc;
                        title = value.title;
                        detail = value.detail;

                        var imgTag = '';

                        imgSrc.forEach(function(img){
                            imgTag += "<img src="+ img +" alt=''>";
                        });

                        tagList += "<figure class='info01'>";
                        tagList += "<a href="+ href +">";
                        tagList += "<div>";
                        tagList += imgTag;
                        tagList += "</div>"
                        tagList += "<button type='button' class='rooms_info_btnL'></button>";
                        tagList += "<button type='button' class='rooms_info_btnR'></button></a>";
                        tagList += "<figcaption>";
                        tagList += "<a href="+ href +"><strong>"+title+"</strong>";
                        tagList += "<p>"+detail+"</p></a>";
                        tagList += "</figcaption>";
                        tagList += "</figure>";
                    
                })
                $('.rooms_info').html(tagList);
            }
            dataFun();


            // main rooms info - prev, next
            var roomArr = [];
            function roomNum(){
                this.x = 0;
            }
            roomNum.prototype = {
                update:function(n){
                    if(n==2) {
                        if(this.x < 3) this.x += 1;
                    }else{
                        if(this.x > 0) this.x -= 1;
                    }
                }
            }

            $('.info01').each(function(i){
                var $this = $(this);
                roomArr.push(new roomNum());

                $this.find('button').on('click',function(e){
                    e.preventDefault();
                    roomArr[i].update( $(this).index() );
                   
                    $this.find('div').css({
                        transform:'translateX('+ -100 * roomArr[i].x + '%)'
                    });
                });
            });

        }

    })




    //클릭 시 스크롤 상단으로 이동.
    $('.top_btn').on('click',function(){
        $('html').animate({ scrollTop : 0 },1500);
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
    setInterval(interval,8000); 

    var num = 0;
    function interval(){
        num++;  
        if(num == ani03Len) num = 0; 
        ani03.style = 'transform:translateX('+ -100 * num + '%)'; // 1번째 실행 : -100% / 2번째 실행 : -200% / 3번째 실행 : -300%
    }

    

    //explan01,02 스크롤시 효과
    var winHei,scrPos,imgPos;
    $(window).on('scroll',function(){
        winHei = $(window).height();
        scrPos = $(this).scrollTop();

        $('.explan01, .explan02, .rooms_info figure').each(function(i){
            imgPos = $('.explan01, .explan02, .rooms_info figure').eq(i).offset().top;

            if(imgPos - winHei < scrPos){
                $('.explan01, .explan02, .rooms_info figure').eq(i).addClass('active');
            }
        });


        // direction 애니메이션 효과
        direc = $('.way_to_come').offset().top;

        if($(window).scrollTop() >= direc-5){
            $('.way_to_come iframe, .way_to_come figure figcaption, .way_to_come h2').addClass('active');
        }
    });



    //한 화면씩 스크롤되는 효과
    var elm = ".pagescroll";
    $(elm).each(function (index) {

        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
            var moveTop = $(window).scrollTop();
            var elmSelecter = $(elm).eq(index);

            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(elmSelecter).next() != undefined) {
                    try{
                        moveTop = $(elmSelecter).next().offset().top;
                    }catch(e){}
                }

            // 마우스휠을 아래에서 위로
            } else {
                if ($(elmSelecter).prev() != undefined) {
                    try{
                        moveTop = $(elmSelecter).prev().offset().top;
                    }catch(e){}
                }
            }
             
            // 화면 이동 0.8초(800)
            $("html,body").stop().animate({
                scrollTop: moveTop + 'px'
            }, {
                duration: 700, complete: function () {
                }
            });
        });
    });











})