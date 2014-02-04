jQuery.fn.extend({
  YaMap: function() {
    return this.each( function(index) {
      var $parent = $(this);
      $( '.link-branch', $parent).each(function(index2) {
        $parent.append( '<div id="map-' + index + '-' + index2 + '" class="branch-map"></div>' );
        $(this).on( 'click', function(e) {
          e.preventDefault();
          var elem = this;

          $( this ).toggleClass( 'active' );
          $( '#map-' + index + '-' + index2 ).slideToggle( 'slow', function() {
            if ( $( this ).has( 'ymaps' ).length > 0 ) {
              return;
            } else {
              var myMap, fullScreen = false;
              myMap = new ymaps.Map('map-' + index + '-' + index2, {
                center: [$(elem).attr('data-latitude'), $(elem).attr('data-long')],
                zoom: 15
      
              }),
              myPlacemark = new ymaps.Placemark([$(elem).attr('data-latitude'), $(elem).attr('data-long')], {
                  iconContent: '',
                  balloonContent: [$(elem).attr('alt')],
                  hintContent: [$(elem).attr('alt')],
              }, {
                  iconImageHref: '/assets/application/pages/icon-o.png',
                  iconImageSize: [37, 67],
                  iconImageOffset: [-22, -66]
              });
              myMap.geoObjects.add(myPlacemark);
            }
          });
        });
      });
    });
  }
});