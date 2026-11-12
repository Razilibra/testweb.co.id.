/* ES5 + jQuery 1.12 for Internet Explorer and Firefox */
$(function () {

  $('#toggle').on('click', function (e) { e.preventDefault(); $('#menu').toggleClass('open'); });

  $('a[href^="#"]').not('.tab, #toggle, #prev, #next').on('click', function (e) {
    var id = $(this).attr('href');
    if (id.length > 1 && $(id).length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(id).offset().top }, 400);
    }
  });

  $('.tab').on('click', function (e) {
    e.preventDefault();
    $('.tab').removeClass('active');
    $('.panel').removeClass('active');
    $(this).addClass('active');
    $($(this).attr('href')).addClass('active');
  });

  /* Projects carousel */
  var index = 0;
  var total = $('#track .slide').length;
  function perView() { return $(window).width() < 768 ? 1 : 2; }

  function buildDots() {
    var n = total - perView() + 1, html = '', i;
    for (i = 0; i < n; i++) { html += '<span class="dot" data-i="' + i + '"></span>'; }
    $('#dots').html(html);
  }

  function render(animate) {
    var max = total - perView();
    index = Math.max(0, Math.min(index, max));
    var left = -(index * (100 / perView())) + '%';
    if (animate) { $('#track').stop(true).animate({ left: left }, 350); }
    else { $('#track').css('left', left); }
    $('.dot').removeClass('on').eq(index).addClass('on');
    $('#prev').toggleClass('off', index === 0);
    $('#next').toggleClass('off', index === max);
  }

  $('#next').on('click', function (e) { e.preventDefault(); index++; render(true); });
  $('#prev').on('click', function (e) { e.preventDefault(); index--; render(true); });
  $('#dots').on('click', '.dot', function () { index = parseInt($(this).attr('data-i'), 10); render(true); });
  $(window).on('resize', function () { buildDots(); render(false); });

  buildDots();
  render(false);
});
