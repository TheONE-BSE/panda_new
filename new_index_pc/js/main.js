$('#nextPage').on('click touchstart', function() {
  $("html,body").animate({
      scrollTop: $(".m-feature").offset().top
  }, 1000, 'swing');
  $('.tips').fadeIn(2000)
})

$(document).on('scroll', function() {
  var that = $(this)
  var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
  var debounce = setTimeout(function() {
    if (that.scrollTop() > screenHeight) {
      $('.tips').fadeIn(400)
    } else {
      $('.tips').fadeOut(400)
    }
    clearTimeout(debounce);
    debounce = null;
  }, 100)
})

$('.tips .test').on('click', function() {
  if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17)
    }
  }
  function backTop (rate) {
    var doc = document.body.scrollTop ? document.body : document.documentElement
    var scrollTop = doc.scrollTop

    function top() {
      scrollTop = scrollTop + (0 - scrollTop) / (rate || 2)
      if (scrollTop < 1) {
        doc.scrollTop = 0
        return
      }
      doc.scrollTop = scrollTop
      requestAnimationFrame(top)
    }
    top()
  }
  backTop(8)
})
//弹出注册框
$('#signup').click(function(){
  $('.signin-popup').fadeIn(400);
})

//关闭注册框
$('.mask').click(function(){
  $('.signin-popup').fadeOut(400);
})

//发送验证码
$(function () {
    var setValidTime = function (second) {
        if (second < 0) {
            $("#captcha").removeClass('btn-disabled')
                          .removeAttr('disabled')
                          .text('获取验证码');
            return;
        }

        setTimeout(function(){
            $("#captcha").text('剩余' + second + '秒');
            second --;
            setValidTime(second);
        }, 1050);
    };

    $("#captcha").click(function (e) {
        e.preventDefault()
        kalert('发送成功', function(){
            alert('callback')
        },'消息')
        var mobile = $("#mobile").val();
        //请求的url
        var url = 'url';
        //请求的参数
        var params = {
            mobile: mobile
        }

        $.post(url, params, function (res) {
            var res = JSON.parse(res);
            if (res.code == 0) {
                $("#captcha").addClass('btn-disabled')
                              .attr('disabled', 'disabled');
                setValidTime(60);
            } else {
                kalert (res.message);
            }
        });
    });
});

//注册swiper
$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    //noSwiping : true,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
    }
  }) 
})

function kalert(content, callback, title) {
  content = content || ''
  callback = callback || function(){}
  title = '提示'

  var html = '<div class="k-alert"><div class="alert-container"><div class="title">'+ title +'</div><div class="content">'+ content +'</div><button class="btn confirm">确定</button></div></div>'

  $('body').append(html)

  $('.k-alert').fadeIn(300)

  $('body').on('click','.k-alert .confirm',function(e){
    $(this).parents('.k-alert').fadeOut(300,function(){
      this.remove()
      callback()
    })
  })
}