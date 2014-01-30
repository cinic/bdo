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
})
  // Гармошка документы
  $(document).ready(function(){
    $(".accordion .accordion_content").hide();
    $(".accordion .round-left").click(function(){
        $(".accordion_content").slideToggle("normal")
     });
  });