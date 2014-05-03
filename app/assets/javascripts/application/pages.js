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
      $( this ).append('<label for="'+$(this).children( 'input, textarea' ).attr('id')+'" class="placeholder">'+$(this).children( 'input, textarea' ).attr('placeholder')+'</label>');
      $('.actions .placeholder').fadeOut();
    } else if ($( '.ie .form-row' ).children( 'input, textarea' ).val() != undefined && $( '.ie .form-row' ).children( 'input, textarea' ).val().length > 0) {
      $('label.placeholder').hide();
    }
  });
  $('input, textarea').on('input propertychange textInput focus blur', function () {
    if ($(this).val().length > 0) {
      $('.placeholder[for="' + $(this).attr('id') + '"]').fadeOut();
    } else {
      $('.placeholder[for="' + $(this).attr('id') + '"]').fadeIn();
    }
  });

  // Suggestions in forms
  if (typeof $.fn.autocomplete == "function") {
    //$( 'input[name*="first_name"], input[name*="last_name"], input[name*="patronymic"]').parent().hide();
    var parentClassName = $( 'input[name*="first_name"], input[name*="last_name"], input[name*="patronymic"]').parent().attr( 'class' );
    

    $("#fullname").autocomplete({
      serviceUrl: 'https://dadata.ru/api/v1/suggest',
      dataType: 'jsonp',
      autoSelectFirst: true,
      params: {
          service: "fio-suggestions"
      },
      // Вызывается, когда пользователь выбирает одну из подсказок
      onSelect: function(suggestion) {
          console.log(suggestion);
      }
    });
  }
  //Input Mask
  if( typeof $.fn.inputmask == 'function' ) {
    $( "#prospect_mobile" ).inputmask("+7 (999) 999 99 99",{ showMaskOnFocus: true, showMaskOnHover: false, clearMaskOnLostFocus: true});
  }
  //Проверка форм
  
})
  // Гармошка документы
$(document).ready(function() {
  $('.accordion-link').click(function(){
    $(this).parent().parent().toggleClass('active').next().slideToggle();
  });
  $('.accordion-title').click(function(){
    $(this).toggleClass('active').next().slideToggle();
  });
  //Гармошка структурный продукт
  $( '.existing-products .actions a:first-child' ).click(function(){
    $(this).parent().prev().slideToggle();
    $(this).parent().parent().prev().children( '.hidden' ).slideToggle();
  });
  //Выбрать файл
  $('#file').customFileInput();
  //IE8 Checkbox
  $( '.input-checkbox' ).on( 'click', function(){
    if( $( this ).next().hasClass( 'checked') ) {
      $( this ).next().removeClass( 'checked' );
    } else {
      $( this ).next().addClass( 'checked' );
    }
  });
 // Гармошка Д/У
 $( '.strategy .item .btn' ).click(function(){
  $this = $(this)
  $this.prev( 'div' ).slideToggle("slow", function() {
    if ($(this).css('display') == 'none'){
      $this.text('Подробнее');
    }else{
      $this.text('Скрыть');
    }
  });
 });
  // Гармошка  ПИФЫ
 $( '.description .actions .round-left' ).click(function(){
  $this = $(this)
  $this.parent().prev( 'div.info' ).slideToggle("slow", function() {
    if ($(this).css('display') == 'none'){
      $this.text('Подробнее');
    }else{
      $this.text('Скрыть');
    }
  });
 });
  //Лицензии  Fancybox
  $(".fancybox-effects1").fancybox({
     wrapCSS    : 'fancybox-custom',
  closeClick : true,
  padding: 0,
  maxWidth : 600, 
  fitToView : false,
        autoCenter: true,
        fixed: false,
        title: 'Лицензия ФСФР РФ на осуществление брокерской деятельности',
    helpers : {
    title : {
    type : 'inside'
  },
  overlay : {
    css : {
       'background-color' : '#eee'
    },
  }
    }
 });
 $(".fancybox-effects2").fancybox({
     wrapCSS    : 'fancybox-custom',
  closeClick : true,
  padding: 0,
  maxWidth : 600, 
  fitToView : false,
        fixed: false,
        title: 'Лицензия ФСФР РФ на осуществление дилерской деятельности',
    helpers : {
    title : {
    type : 'inside'
  },
  overlay : {
    css : {
       'background-color' : '#eee'
    },
  }
    }
 });
 $(".fancybox-effects3").fancybox({
     wrapCSS    : 'fancybox-custom',
  closeClick : true,
  padding: 0,
  maxWidth : 600, 
  fitToView : false,
        fixed: false,
        title: 'Лицензия ФСФР РФ на осуществление деятельности по управлению ценными бумагами',
    helpers : {
    title : {
    type : 'inside'
  },
  overlay : {
    css : {
       'background-color' : '#eee'
    },
  }
    }
 });
 $(".fancybox-effects4").fancybox({
     wrapCSS    : 'fancybox-custom',
  closeClick : true,
  padding: 0,
  maxWidth : 600, 
  fitToView : false,
        fixed: false,
        title: 'Лицензия ФСФР РФ на осуществление депозитарной деятельности',
    helpers : {
    title : {
    type : 'inside'
  },
  overlay : {
    css : {
       'background-color' : '#eee'
    },
  }
    }
 });
var x_click = 0;
var y_click = 0;
var r = 0;
function defPosition(el, event) {
  var event = event || window.event;
// Получаем координаты клика по странице, то есть абсолютные координаты клика.
  if (document.attachEvent != null) { // Internet Explorer & Opera
  x_click = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  y_click = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else if (!document.attachEvent && document.addEventListener) { // Gecko
  x_click = event.clientX+ window.scrollX;
  y_click = event.clientY+ window.scrollY;
} 
  r = { x: $('#right_content').offset().left,y: $(el).offset().top};
 /* if (el.offsetParent) {
  var tmp = getAbsolutePosition(el.offsetParent);
  r.x += tmp.x;
  r.y += tmp.y;
  }*/
}  
function getAbsolutePosition(el) {
  var r = { x: el.offsetLeft, y: el.offsetTop };
  if (el.offsetParent) {
   var tmp = getAbsolutePosition(el.offsetParent);
   r.x += tmp.x;
   r.y += tmp.y; 
}
return r;
}
});