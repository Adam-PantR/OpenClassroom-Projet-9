(function($){$.fn.mauGallery=function(options){var options=$.extend($.fn.mauGallery.defaults,options);var tagsCollection=[];return this.each(function(){$.fn.mauGallery.methods.createRowWrapper($(this));if(options.lightBox){$.fn.mauGallery.methods.createLightBox($(this),options.lightboxId,options.navigation)}
$.fn.mauGallery.listeners(options);$(this).children(".gallery-item").each(function(index){$.fn.mauGallery.methods.responsiveImageItem($(this));$.fn.mauGallery.methods.moveItemInRowWrapper($(this));$.fn.mauGallery.methods.wrapItemInColumn($(this),options.columns);var theTag=$(this).data("gallery-tag");if(options.showTags&&theTag!==undefined&&tagsCollection.indexOf(theTag)===-1){tagsCollection.push(theTag)}});if(options.showTags){$.fn.mauGallery.methods.showItemTags($(this),options.tagsPosition,tagsCollection)}
$(this).fadeIn(500)})};$.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0};$.fn.mauGallery.listeners=function(options){$(".gallery-item").on("click",function(){if(options.lightBox&&$(this).prop("tagName")==="IMG"){$.fn.mauGallery.methods.openLightBox($(this),options.lightboxId)}else{return}});$(".gallery").on("click",".nav-link",$.fn.mauGallery.methods.filterByTag);$(".gallery").on("click",".mg-prev",()=>$.fn.mauGallery.methods.prevImage(options.lightboxId));$(".gallery").on("click",".mg-next",()=>$.fn.mauGallery.methods.nextImage(options.lightboxId))};$.fn.mauGallery.methods={createRowWrapper(element){if(!element.children().first().hasClass("row")){element.append('<div class="gallery-items-row row"></div>')}},wrapItemInColumn(element,columns){if(columns.constructor===Number){element.wrap(`<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`)}else if(columns.constructor===Object){var columnClasses="";if(columns.xs){columnClasses+=` col-${Math.ceil(12 / columns.xs)}`}
if(columns.sm){columnClasses+=` col-sm-${Math.ceil(12 / columns.sm)}`}
if(columns.md){columnClasses+=` col-md-${Math.ceil(12 / columns.md)}`}
if(columns.lg){columnClasses+=` col-lg-${Math.ceil(12 / columns.lg)}`}
if(columns.xl){columnClasses+=` col-xl-${Math.ceil(12 / columns.xl)}`}
element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`)}else{console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`)}},moveItemInRowWrapper(element){element.appendTo(".gallery-items-row")},responsiveImageItem(element){if(element.prop("tagName")==="IMG"){element.addClass("img-fluid")}},openLightBox(element,lightboxId){$(`#${lightboxId}`).find(".lightboxImage").attr("src",element.attr("src"));$(`#${lightboxId}`).modal("toggle")},prevImage(){let activeImage=null;$("img.gallery-item").each(function(){if($(this).attr("src")===$(".lightboxImage").attr("src")){activeImage=$(this)}});let activeTag=$(".tags-bar span.active-tag").data("images-toggle");let imagesCollection=[];if(activeTag==="all"){$(".item-column").each(function(){if($(this).children("img").length){imagesCollection.push($(this).children("img"))}})}else{$(".item-column").each(function(){if($(this).children("img").data("gallery-tag")===activeTag){imagesCollection.push($(this).children("img"))}})}
let index=0,next=null;$(imagesCollection).each(function(i){if($(activeImage).attr("src")===$(this).attr("src")){index=i-1}});next=imagesCollection[index]||imagesCollection[imagesCollection.length-1];$(".lightboxImage").attr("src",$(next).attr("src"))},nextImage(){let activeImage=null;$("img.gallery-item").each(function(){if($(this).attr("src")===$(".lightboxImage").attr("src")){activeImage=$(this)}});let activeTag=$(".tags-bar span.active-tag").data("images-toggle");let imagesCollection=[];if(activeTag==="all"){$(".item-column").each(function(){if($(this).children("img").length){imagesCollection.push($(this).children("img"))}})}else{$(".item-column").each(function(){if($(this).children("img").data("gallery-tag")===activeTag){imagesCollection.push($(this).children("img"))}})}
let index=0,next=null;$(imagesCollection).each(function(i){if($(activeImage).attr("src")===$(this).attr("src")){index=i+1}});next=imagesCollection[index]||imagesCollection[0];$(".lightboxImage").attr("src",$(next).attr("src"))},createLightBox(gallery,lightboxId,navigation){gallery.append(`<div class="modal fade" id="${
        lightboxId ? lightboxId : "galleryLightbox"
      }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              navigation
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              navigation
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`)},showItemTags(gallery,position,tags){var tagItems='<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';$.each(tags,function(index,value){tagItems+=`<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`});var tagsRow=`<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;if(position==="bottom"){gallery.append(tagsRow)}else if(position==="top"){gallery.prepend(tagsRow)}else{console.error(`Unknown tags position: ${position}`)}},filterByTag(){if($(this).hasClass("active-tag")){return}
$(".active.active-tag").removeClass("active active-tag");$(this).addClass("active-tag active");var tag=$(this).data("images-toggle");$(".gallery-item").each(function(){$(this).parents(".item-column").hide();if(tag==="all"){$(this).parents(".item-column").show(300)}else if($(this).data("gallery-tag")===tag){$(this).parents(".item-column").show(300)}})}}})(jQuery)

$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});

//Ajout du carrousel


// ----------------------------------------------------------------------------------------------------------------

// SLIDE

// ----------------------------------------------------------------------------------------------------------------

//On défini la slide de départ comme celle à la position 0
let currentSlide = 0;

//On récupère tous les éléments de l'HTML nécessaire
const container = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".banner-img");

//On défini la taille du carrousel et des images
const totalSlides = items.length;
const imageWidth = items[0].clientWidth;

//On donne la taille appliquée au décalage de l'axe X lors du slide
function positionCarrousel() {
	container.style.transform = `translateX(-${currentSlide * imageWidth}px)`;
  }

//On créer le bouton gauche
  const left = document.querySelector(".carousel-control-prev");
left.addEventListener("click", () => {
	//Décalage sur la gauche
  if (currentSlide > 0) {
    currentSlide--;
  } 
  //remise à la fin du carrousel si dépassé le début
  else {
    currentSlide = totalSlides - 1;
  }
  //On change la position du DOT actif (qui sera défini par la suite)
  setActiveDot();
  positionCarrousel();
});

//On créer le bouton droit
const right = document.querySelector(".carousel-control-next");
right.addEventListener("click", () => {
	//Décalage sur la droite
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } 
  //remise au départ du carrousel si arrivé au bout
  else {
    currentSlide = 0;
  }
   //On change la position du DOT actif (qui sera défini par la suite)
  setActiveDot();
  positionCarrousel();
});


// ----------------------------------------------------------------------------------------------------------------

// DOTS

// ----------------------------------------------------------------------------------------------------------------


const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.carousel-inner');

// On repprend tous les élement possédant la class dot
dots.forEach((dot, index) => {
  // On défini dot comme l'élément qui sera actif, et qui changera de slide visile au clique 
  dot.addEventListener('click', () => {
	// On défini l'index du dot sur lequel on clique, il est le même appelé plus haut lors des lide gauche et droit
    currentSlide = index;
    setActiveDot();
    setSliderPosition();
  });
});

// Fonction d'auto slide
function setActiveDot() {
  dots.forEach(dot => dot.classList.remove('dot_selected'));
  dots[currentSlide].classList.add('dot_selected');
}

function setSliderPosition() {
  slider.style.transform = `translateX(-${currentSlide * 100/3}%)`;
}
setActiveDot();
setSliderPosition();

// Délai de 5 secondes
function startAutoSlide() {
    setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        setActiveDot();
        positionCarrousel();
    }, 10000); 
}


startAutoSlide();