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
