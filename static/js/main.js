"use strict";

$(document).ready(function () {
  var burger = $('.burger');

  if ($(window).width() > 768) {
    burger.on('click', function () {
      burger.toggleClass('closed');
      $('.header__navigation-opened').toggleClass('hidded');
      $('.header__navigation-closed').toggleClass('hidded');
    });
    $('.arrow_down ').on('click', function (e) {
      e.preventDefault();
      fullpage_api.moveSectionDown();
    });
    $('.goTofooter').on('click', function (e) {
      e.preventDefault();
      fullpage_api.moveTo(6);
    });
  } else {
    burger.on('click', function () {
      burger.toggleClass('closed');
      $('.header__navigation').toggleClass('transformed');
    });
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        try {
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        } catch (e) {
          console.error("Can't find element", e);
        }
      });
    });
  }
});