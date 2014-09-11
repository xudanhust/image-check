'use strict';

(function($){

    var url = 'http://localhost:8888';

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
                        var oversize = (o.fileSize / 1024) > (testImg.width * testImg.height / 2250);
                        oversize && $('img[src="'+ o.url +'"]').addClass('oversize');
                    }
                })
            }
        });
    };

    $(function(){
        imageCheck();
    });

})(jQuery);
