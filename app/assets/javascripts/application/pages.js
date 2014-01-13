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
  $("header.header").hover(function() {
    $(this).removeClass("min");
  });

  $('.no-touch  a[href^="#"]').on( 'click', function(e) {
      e.preventDefault();
      $('body').stop().scrollTo($(this).attr('href'), 800);
  });
  // Плавное появление суб меню
  /*$( window ).scroll( function() {
    if( $(window).scrollTop() > 101 ) {
      $( 'body' ).addClass( 'sub-nav-fixed' );
      $( '.sub-nav' ).addClass( 'fixed' );
      $( '.sub-nav' ).animate({ top: 0 }, 600 );
    } else if ( $(window).scrollTop() < 56 ) {
      $( '.sub-nav' ).removeClass( 'fixed' );
      $( '.sub-nav' ).css( 'top', '-46px' );
      $( 'body' ).removeClass( 'sub-nav-fixed' );
    }
  })*/
})