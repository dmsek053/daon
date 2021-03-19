$(function(){


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




                //방 상세내용
                function reser(){

                    var title,detail,tagList02='';

                    data.reservation.forEach(function(value){
                        title = value.title;
                        detail = value.detail;

                        tagList02 += "<li>";
                        tagList02 += "<strong>"+ title +"</strong>";
                        tagList02 += "<p>"+ detail +"</p>";
                        tagList02 += "</li>";
                    })
                    tagList02 += "<li>"
                    tagList02 += "<strong>[ 편의 시설 ]</strong>"
                    tagList02 += "<div class='cont_icon'>"
                    tagList02 += "<span>"
                    tagList02 += "<p>TV</p>"
                    tagList02 += "<p>에어컨</p>"
                    tagList02 += "<p>냉장고</p>"
                    tagList02 += "<p>조리도구</p>"
                    tagList02 += "</span>"
                    tagList02 += "<span>"
                    tagList02 += "<p>무선 인터넷</p>"
                    tagList02 += "<p>반려동물</p>"
                    tagList02 += "<p>무료 주차</p>"
                    tagList02 += "</span>"
                    tagList02 += "</div>"
                    tagList02 += "</li>"

                    $('.reservation_cont02').html(tagList02);
                }
                reser();


            }

        });



        // room 이미지 클릭시 팝업
        $('.visual_02_101 li, .visual_01_101 li').on('click',function(e){
            e.preventDefault();

            idx = $(this).index();

            var detail = $(this).children().attr('src');
            $('.pic img').eq(0).attr('src',detail);

            $('.poptrox-overlay').addClass('active');
        })


        //창 닫기
        $('.closer').on('click',function(){
            $('.poptrox-overlay').removeClass('active');
        })




        //예약창 스크롤시 따라오기

        var reserPos,reserCont,reserContHei,sideNum = 0;
        setTimeout(function(){
            reserPos = $('.reservation_window').offset().top; 
            reserCont = $('.reservation_cont').offset().top;
            reserContHei =  ($('.rooms').offset().top - 250) - ($(window).height()/2);
        
        },100)
        $(window).on('scroll',function(){  
            if(reserCont < $(this).scrollTop() && reserContHei > $(this).scrollTop()){
                sideNum =  $(this).scrollTop();
            }
            if(reserCont > $(this).scrollTop()){sideNum = reserCont-110}
            $('.reservation_window').css({top: sideNum +'px'});
        });
            


        // 예약창 금액 합산
        
 





})