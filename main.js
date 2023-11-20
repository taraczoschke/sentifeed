$(".sub-nav-container").hide(); 

$(".main-nav-container button").click(function() {
var targetId = $(this).data("target");
var targetContainer = $(`#${targetId}`);

if (targetContainer.is(":visible")) {
    targetContainer.slideUp(); 
} else {
    $(".sub-nav-container").hide(); 
    targetContainer.slideToggle(); 
}
});

$(".main-nav-container button").on("click", function() {
$(this).toggleClass("scaled primary");
$(".main-nav-container button").not(this).removeClass("scaled primary");
});


$("#sentiment button").each(function() {
$(this).on("mouseenter", function() {
    if (!$(this).hasClass("clicked")) {
        var bgColorClass = $(this).data("bgcolor-class");
        $(this).addClass(bgColorClass);
    }
}).on("mouseleave", function() {
    if (!$(this).hasClass("clicked")) {
        var bgColorClass = $(this).data("bgcolor-class");
        $(this).removeClass(bgColorClass);
    }
}).on("click", function() {
    $(this).toggleClass("clicked scaled");
}).on("dblclick", function() {
    $(this).removeClass("clicked scaled");
    var bgColorClass = $(this).data("bgcolor-class");
    $(this).removeClass(bgColorClass);
});
});

$("#country button, #topic button").each(function() {
    $(this).on("mouseenter", function() {
        if (!$(this).hasClass("clicked")) {
            $(this).addClass('accent');
        }
    }).on("mouseleave", function() {
        if (!$(this).hasClass("clicked")) {
            $(this).removeClass('accent');
        }
    }).on("click", function() {
        $(this).toggleClass("clicked scaled");
    }).on("dblclick", function() {
        $(this).removeClass("clicked scaled");
        $(this).removeClass('accent');
    });
    });

    $('.circle-button-container').hide()
    $('.rate-button').on("click", function () {
        $('.circle-button-container').slideToggle()
    })
    
// $(".tags").hide();

// const colors = [
//   'rgba(216, 30, 50, 1)',
//   'rgba(235, 100, 20, 1)',
//   'rgba(260, 200, 10, 1)',
//   'rgb(30, 190, 100, 1)',
// ];

// // button case 

// $('button')  .each(function () {
//     const buttonText = $(this).text();
//     const lowercased = buttonText.toLowerCase();
//     $(this).text(lowercased);
// });

// // nav buttons
// $("nav > button")
//   .on("mouseenter", function () {
//     $(this).addClass("primary");
//     $(this).css("transform", "scale(1.05)");
//     $(this).css("cursor", "pointer");
//   })
//   .on("mouseleave", function () {
//     if (!$(this).hasClass("clicked")) {
//       $(this).removeClass("primary");
//       $(this).css("transform", "scale(1)");
//     }
//   })
//   .on("click", function () {
//     $(this).toggleClass("clicked");
//     const associatedTags = $(this).next('.tags');
//     associatedTags.slideToggle();
//   })



// // tags buttons
// $(".tags > button").each(function (index) {
//   $(this).data('default-bg-color', colors[index -1]);

//   $(this).on("mouseenter", function () {
//     if (!$(this).hasClass("clicked")) {
//       $(this).css('backgroundColor', colors[index -1]);
//       $(this).css("transform", "scale(1.05)");
//       $(this).css("cursor", "pointer");
//     }
//   }).on("mouseleave", function () {
//     if (!$(this).hasClass("clicked")) {
//       $(this).css('backgroundColor', '');
//       $(this).css("transform", "scale(1)");
//     }
//   }).on("click", function () {
//     $(this).toggleClass("clicked");
//   });
// });

// // special tag
// $(".tags.hidden:eq(0) > button:first, .tags.hidden:eq(1) > button:first, .tags.hidden:eq(2) > button:first").addClass('accent');

// // card click and hover 
// $(".card").on("click", function () {
//   const href = $(this).find("a").attr("href");
//   window.location.href = href;
// }).hover(
//   function () {
//     $(this).css("transform", "scale(1.05)");
//     $(this).css("cursor", "pointer");
//   },
//   function () {
//     $(this).css("transform", "scale(1)");
//   }
// );

// // truncate 
// const truncateText = () => {
//     $(".truncate-text").each(function () {
//       const maxChars = $(this).data("max-chars");
//       const text = $(this).text();
  
//       if (text.length > maxChars) {
//         const truncatedText = `${text.substring(0, maxChars)}...`;
//         $(this).text(truncatedText);
//       }
//     });
//   };
  
//   truncateText();
