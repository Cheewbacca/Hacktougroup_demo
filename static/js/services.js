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
  var mySwiper = new Swiper('.swiper1', {
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

var isCaptchaComplete = false;

function getCaptcha() {
  $.ajax({
    method: "POST",
    url: "https://google.com/recaptcha/api/siteverify",
    data: {
      secret: "6LdsqgMaAAAAAJUXWK0YGbAAqJ9d6DGUGoSPE-_U",
      response: $('#g-recaptcha-response').val()
    }
  }).done(function (msg) {
    if (msg.success) {
      isCaptchaComplete = true;
    }
  });
}

function getError(formElement) {
  $('.message').css('display', 'flex');
  $('.message .message__content p').text(formElement.substring(1).charAt(0).toUpperCase() + formElement.slice(2) + ' is required');
}

function validateForm() {
  var requiredFormElements = ['#email', '#url', '#info'];

  for (var _i = 0, _requiredFormElements = requiredFormElements; _i < _requiredFormElements.length; _i++) {
    var formElement = _requiredFormElements[_i];
    var value = $('' + formElement + '').val();

    if (value.trim() == '' || !value || value.length == 0) {
      getError(formElement);
    } else {
      return true;
    }
  }
}

$('.order').on('click', function (e) {
  e.preventDefault();
  $('#order').css('display', 'flex');
  var mySwiperPopUp = new Swiper('.swiper2', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 100,
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination2',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2'
    }
  });
  $('.realTarget').text($(this).siblings('h4').text());
});
$('#order_cross').on('click', function () {
  $('#order').fadeOut();
});
$('#message_cross').on('click', function () {
  $('.message').fadeOut();
});
$('#order_form').on('submit', function (e) {
  e.preventDefault();
  var isFormValid = validateForm();

  if (isFormValid && isCaptchaComplete) {
    $.ajax({
      method: "POST",
      url: "/backend/addOrder",
      data: {
        email: $('#email').val(),
        url: $('#url').val(),
        telegram: $('#telegramForm').val(),
        info: $('#info').val(),
        target: $('.realTarget').text()
      }
    }).done(function (response) {
      if (response.success == false) {
        $('.message').css('display', 'flex');
        $('.message .message__content p').text(response.errors);
      } else {
        $('.message .message__content').removeClass('danger').addClass('success');
        $('.message .message__content p').text(response.message);
        $('.message').css('display', 'flex');
        $('#order').fadeOut("slow");
      }
    });
  }
});
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