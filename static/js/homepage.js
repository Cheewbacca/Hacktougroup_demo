"use strict";

var anchors = ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fivesPage', 'lastPage'];

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

var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 100,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  on: {
    slideChangeTransitionStart: function slideChangeTransitionStart() {
      $('.progress-line_animated').animate({
        width: '100%'
      }, 3000, function () {
        $('.progress-line_animated').css('width', '0%');
      });
      $('.progress_item_start').text($('.swiper-pagination-bullet-active').data('index'));
      var next_value = parseInt($('.swiper-pagination-bullet-active').data('index')) + 1;
      var current_value = parseInt($('.swiper-pagination-bullet-active').data('index'));
      $('.progress_item_end').text(next_value < $('.swiper-pagination').children().length + 1 ? '0' + next_value : $('.swiper-pagination').children().first().data('index'));
      $('.swiper-pagination').children().removeClass('before_active');
      $('.swiper-pagination').children().each(function (index) {
        if (index + 1 < current_value) {
          $(this).addClass('before_active');
        }
      });
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});
var sliderDotsHeadings = [];

function createHeading(sliderDotsHeading) {
  var newHeading = $('<p class="small_font dots_headings">' + sliderDotsHeading + '</p>');
  return newHeading;
}

$('.swiper-wrapper').children().each(function (index) {
  sliderDotsHeadings.push($(this).data('heading'));
});
$('.swiper-pagination').children().each(function (index) {
  $(this).addClass('main_font');
  $(this).attr('id', 'dot-' + index);
  $(this).attr('data-index', index + 1 < 10 ? "0" + (index + 1) : index + 1);
  $(this).on('click', function () {
    $('.progress-line_animated').finish();
  });
  $(this).append(createHeading(sliderDotsHeadings[index + 1]));

  if (index == $('.swiper-pagination').children().length - 1) {
    $(this).addClass('disabled-line');
  }
});

function getPositionAtCenter(element) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      left = _element$getBoundingC.left,
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height;

  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

function getDistanceBetweenElements(a, b) {
  var aPosition = getPositionAtCenter(a);
  var bPosition = getPositionAtCenter(b);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

var distance = getDistanceBetweenElements(document.getElementById("dot-1"), document.getElementById("dot-2"));
$('.swiper-pagination').children().append('<style>span:before{height:' + (distance - 85) + 'px }</style>');
var play = $('#play');
play.on('click', function () {
  $(this).parent().remove();
  $(this).fadeOut();
  $('#video').removeClass('hidded').fadeIn();
});