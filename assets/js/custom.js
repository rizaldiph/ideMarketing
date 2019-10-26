jQuery(document).ready(function ($) {

  $(window).on('load', function () {
    $('#preloader').delay(500).fadeOut('slow', function () {
      $(this).hide();
    });
  });
  
  new WOW().init();

  $(".crossRotate").click(function () {
    $(this).toggleClass('flip');
  });

  $(document).on("click", ".flip-container", function () {
    $(this).toggleClass('hover');
  });

  $('#ClickedJs').on('submit', function (e) {
    e.preventDefault();
    $('#preloader').show();
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).hide();
    });
    $.ajax({
      type: 'POST',
      url: 'StructureWeb/prosesInputData.php',
      data: $(this).serialize(),
    }).done(function (data) {
      console.log(data);
      $("#ClickedJs")[0].reset();
      $("#iziToastJS").html(data);
    });
  });

  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  $("#flip").flip();

  $(".fullscreen-toggle").on("click", function () {
    $('#matakuliah').toggleClass("fullscreen");
    $('#matakuliah-wrapper-height').toggleClass("noscroll");
    $('.far').toggleClass("fa-window-maximize fa-window-close");
    $('body').toggleClass("noscroll");
  });

  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 91,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems
        .parent().removeClass("menu-active")
        .end().filter("[href='#" + id + "']").parent().addClass("menu-active");
    }
  });

  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  $('.Scrollable-href a').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {

        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }

        return false;
      }
    }
  });

  $(window).scroll(function () {
    var hT = $('#hero').offset().top,
        hH = $('#hero').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    if (wS > (hT+hH-wH)){
      $('.arrows').addClass("hiddenpath");
    }else{
      $('.arrows').removeClass("hiddenpath");
    }
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
      // $('.arrows').toggleClass("hiddenpath");
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

});