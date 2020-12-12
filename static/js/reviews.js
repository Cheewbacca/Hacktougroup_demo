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
    afterLoad: onLeaveHandler
  });
}

$('#add_comment').on('click', function (e) {
  e.preventDefault();
  $('#review').fadeIn();
});
$('#reviewCross').on('click', function () {
  $('#review').fadeOut();
});
$('#message_cross').on('click', function () {
  $('.message').fadeOut();
});
$('#addReview').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/backend/addReview",
    data: {
      name: $('#name').val(),
      comment: $('#comment').val()
    }
  }).done(function (response) {
    if (response.success == false) {
      $('.message').css('display', 'flex');
      $('.message .message__content p').text(response.errors);
    } else {
      $('.message .message__content').removeClass('danger').addClass('success');
      $('.message .message__content p').text(response.message);
      $('.message').css('display', 'flex');
      $('#review').fadeOut("slow");
    }
  });
});