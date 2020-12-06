"use strict";

var anchors = ['firstPage', 'lastPage'];

function onLeaveHandler() {
  $('.header__navigation-opened').children().removeClass('active_link');
  $('.header__navigation-opened').children().each(function () {
    if ($(this).data('menuanchor') == $('section.active').data('anchor')) {
      $(this).addClass('active_link');
    }
  });
}

if ($(window).width() > 768) {
  $('#fullpage').fullpage({
    anchors: anchors,
    slideSelector: '.page_slide',
    afterLoad: onLeaveHandler
  });
}

if ($(window).width() > 768) {
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 100,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}

var switcher = $('#switcher').children();
switcher.each(function (e) {
  $(this).on('click', function () {
    switcher.removeClass('active');
    $(this).addClass('active');
    switcher.each(function () {
      $($(this).data('target')).addClass('hidded');
    });
    $($(this).data('target')).removeClass('hidded');
  });
});