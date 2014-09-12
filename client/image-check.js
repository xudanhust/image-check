'use strict';

(function($){

    var url = 'http://localhost:8888';
    var SIZE_COEFFICIENT = 2000;

    var imageCheck = function(){
        var images = $('img');
        images.each(function(){
            var src = $(this).attr('src'),
                testImg = new Image();
            testImg.src = src;
            testImg.onload = function(){
                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    data: {
                        url: src
                    }
                })
                .done(function(o) {
                    if(o.fileSize){
                        var oversize = o.fileSize / 1024 / (testImg.width * testImg.height / SIZE_COEFFICIENT),
                            thisImg = $('img[src="'+ o.url +'"]');

                        thisImg.closest('li').find('.resolution').text(testImg.width + 'x' + testImg.height);
                        thisImg.closest('li').find('.size').text(getSize(o.fileSize));

                        if(oversize > 3){
                            thisImg.addClass('oversize-3');
                        }else if(oversize > 2){
                            thisImg.addClass('oversize-2');
                        }else if(oversize > 1){
                            thisImg.addClass('oversize-1');
                        }else{
                            thisImg.addClass('ok');
                        }

                        if(oversize > 1){
                            thisImg.closest('li').find('.suggestion').show().find('.sug-size').text(getSize(testImg.width * testImg.height * 1024 / SIZE_COEFFICIENT));
                        }
                    }
                })
            }
        });
    };

    function getSize(num){
        var num = (num / 1024).toFixed(2);
        return num.toLocaleString() + 'KB';
    }

    $(function(){
        imageCheck();
    });

})(jQuery);
