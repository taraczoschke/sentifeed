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

function handleButtonHover(button) {
    var bgColorClass = button.data("bgcolor-class") || 'accent';
    button.on("mouseenter", function() {
        if (!$(this).hasClass("clicked")) {
            $(this).addClass(bgColorClass);
        }
    }).on("mouseleave", function() {
        if (!$(this).hasClass("clicked")) {
            $(this).removeClass(bgColorClass);
        }
    });
}

function handleButtonClick(button) {
    button.on("click", function() {
        $(this).toggleClass("clicked scaled");
        var bgColorClass = $(this).data("bgcolor-class") || 'accent';
        if ($(this).hasClass("clicked")) {
            $(this).addClass(bgColorClass);
        } else {
            $(this).removeClass(bgColorClass);
        }
    });
}

$(".main-nav-container button").on("click", function() {
    $(this).toggleClass("scaled primary");
    $(".main-nav-container button").not(this).removeClass("scaled primary");
});

$("#sentiment button, #country button, #topic button").each(function() {
    handleButtonHover($(this));
    handleButtonClick($(this));
});


    // $('.circle-button-container').hide()
    // $('.rate-button').on("click", function () {
    //     $('.circle-button-container').slideToggle()
    // })
    

// // card click and hover 
// $(".card").on("click", function () {
//   const href = $(this).find("a").attr("href");
//   window.location.href = href;
// })

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
