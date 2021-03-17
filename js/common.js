$(function(){

    $('header').load('inc.html header article');  
    $('footer').load('inc.html footer div'); 


    // rooms info json불러오기
    $.ajax({
        url:'data.json',
        success:function(data){
            var href,imgSrc,title,detail,tagList='',num=0;

            function dataFun(ty){

                data.roomsInfo.forEach(function(value, key){
                    
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




    //explan01,02 스크롤시 글자 위로
    var winHei,scrPos,imgPos;
    $(window).on('scroll',function(){
        winHei = $(window).height();
        scrPos = $(this).scrollTop();

        $('.explan01, .explan02').each(function(i){
            imgPos = $('.explan01, .explan02, .rooms_info figure').eq(i).offset().top;

            if(imgPos - winHei < scrPos){
                $('.explan01, .explan02, .rooms_info figure').eq(i).addClass('active');

            }
        });

    });





})