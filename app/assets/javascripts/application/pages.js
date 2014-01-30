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
  // Карты филиалов
  $('.link-branch').click(function(e) {
    e.preventDefault();
    var elem = this;
    if ( $(this).hasClass( 'active' ) ) {
      return;
    }
      $('#map').slideToggle('slow', function() {$(this).detach()});
      $(this).parent().parent().parent().append('<div id="map" class="branch-map"></div>');
      $('#map').slideToggle('slow', function() { 
        var myMap, fullScreen = false;
        myMap = new ymaps.Map('map', {
          center: [$(elem).attr('data-latitude'), $(elem).attr('data-long')],
          zoom: 15

        }),
        myPlacemark = new ymaps.Placemark([$(elem).attr('data-latitude'), $(elem).attr('data-long')], {
            iconContent: 'O',
            balloonContent: [$(elem).attr('alt')],
            hintContent: [$(elem).attr('alt')]
        }, {
            preset: 'twirl#blueIcon'
        });
        myMap.geoObjects
          .add(myPlacemark)
      });
      $(this).toggleClass('active');
  });
  // филиалы фильтр
  var filter = $('input#filter');
    $('ul.branch-list').listfilter({
      'filter': filter,
      'alternate': true,
      'alternateclass': 'other'
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
