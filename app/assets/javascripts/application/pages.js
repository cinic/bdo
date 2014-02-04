$(function(){
  //Шапка
  var lastScrollTop = 0, delta = 5;
  $(window).scroll(function(e) {
      var t = $(this).scrollTop();
      if (Math.abs(lastScrollTop - t) <= delta)
          return;
      t > lastScrollTop ? $("header.header").queue(function() {
          $(this).addClass("min");
          $(this).dequeue()
      }) : $("header.header").queue(function() {
          $(this).removeClass("min");
          $(this).dequeue()
      });
      lastScrollTop = t;
      t <= 0 && $("header.header").removeClass("min")
  });
  $( "header.header" ).hover(function() {
    $(this).removeClass("min");
  });

  $('.no-touch  a[href^="#"]').on( 'click', function(e) {
      e.preventDefault();
      $('body').stop().scrollTo($(this).attr('href'), 800);
  });
  // Карты филиалов
  $('.js.no-touch .branch-list > li').YaMap();
  
  // филиалы фильтр
  var filter = $('input#filter');
    $('ul.branch-list').listfilter({
      'filter': filter,
      'alternate': true,
      'alternateclass': 'other'
  });
  //Переключатель Демо-счет
  $('.radio_check').change( function(){    
    switch ( $(this).val() ) {
      case '1':
        $('.reg-demo-default').fadeOut();
        $('.reg-demo-quik').fadeIn();
        $('.reg-demo-mt5').fadeOut();
        document.getElementById("new_prospect").setAttribute("onsubmit", "return !!(Uch_Fields() && gaqReturn('_trackEvent', 'Demo accounts', 'Submit', 'demo_quik'));");
      break;
      case '0':
        $('.reg-demo-default').fadeOut();
        $('.reg-demo-mt5').fadeIn();
        $('.reg-demo-quik').fadeOut();
        document.getElementById("new_prospect").setAttribute("onsubmit", "return !!(Uch_Fields() && gaqReturn('_trackEvent', 'Demo accounts', 'Submit', 'demo_mt5'));");
      break;
    }
  });
  // Placeholder IE
  $( '.ie .form-row' ).each( function() {
    if ($(this).children( 'input, textarea' ).length > 0 ) {
      $( this ).append('<label id="" class="placeholder">'+$(this).children( 'input, textarea' ).attr('placeholder')+'</label>');
    }
  });
  $('input, textarea').on('input propertychange textInput focus blur', function () {
    if ($(this).val().length > 0) {
      $('.placeholder[for="' + $(this).attr('id') + '"]').fadeOut();
    } else {
      $('.placeholder[for="' + $(this).attr('id') + '"]').fadeIn();
    }
  });
})
  // Гармошка документы
$(document).ready(function() {
  $('.accordion-link').click(function(){
    $(this).parent().parent().toggleClass('active').next().slideToggle();
  });
  $('.accordion-title').click(function(){
    $(this).toggleClass('active').next().slideToggle();
  });
});
