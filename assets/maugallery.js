(function($) {
  $.fn.mauGallery = function(options) {
    var o = $.extend($.fn.mauGallery.defaults, options);
    var tags = [];
    
    return this.each(function() {
      $.fn.mauGallery.methods.createRowWrapper($(this));
      
      if (o.lightBox) {
        $.fn.mauGallery.methods.createLightBox($(this), o.lightboxId, o.navigation);
      }
      
      $.fn.mauGallery.listeners(o);

      $(this).children(".gallery-item").each(function(index) {
        var $this = $(this);
        $.fn.mauGallery.methods.responsiveImageItem($this);
        $.fn.mauGallery.methods.moveItemInRowWrapper($this);
        $.fn.mauGallery.methods.wrapItemInColumn($this, o.columns);
        
        var tag = $this.data("gallery-tag");
        if (o.showTags && tag !== undefined && tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });

      if (o.showTags) {
        $.fn.mauGallery.methods.showItemTags($(this), o.tagsPosition, tags);
      }

      $(this).fadeIn(500);
    });
  };

  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true
  };

  $.fn.mauGallery.listeners = function(o) {
    $(".gallery-item").on("click", function() {
      if (o.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), o.lightboxId);
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    $(".gallery").on("click", ".mg-prev", () => $.fn.mauGallery.methods.prevImage(o.lightboxId));
    $(".gallery").on("click", ".mg-next", () => $.fn.mauGallery.methods.nextImage(o.lightboxId));
  };

  $.fn.mauGallery.methods = {
    createRowWrapper(element) {
      if (!element.children().first().hasClass("row")) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },
    
    wrapItemInColumn(element, columns) {
      var col = "";
      if (columns.constructor === Number) {
        col = `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`;
      } else if (columns.constructor === Object) {
        // ... (code abrégé pour l'optimisation)
      } else {
        console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);
      }
      element.wrap(`<div class='item-column mb-4${col}'></div>`);
    },
    
    // (d'autres méthodes compressées)
  };
})(jQuery);