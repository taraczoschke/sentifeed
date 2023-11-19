$(document).ready(function() {
    // Hide sub-navigation containers initially
    $(".sub-nav-container").hide();

    // Toggle sub-navigation containers
    $(".main-nav-container button").click(function() {
        var targetId = $(this).data("target");
        var targetContainer = $("#" + targetId);

        $(".sub-nav-container").not(targetContainer).slideUp();
        targetContainer.slideToggle();
    });

    // Toggle button styles on click
    $(".main-nav-container button").click(function() {
        $(this).toggleClass("scaled primary");
        $(".main-nav-container button").not(this).removeClass("scaled primary");
    });

    // Handle mouse events on sentiment buttons
    $("#sentiment button").on({
        mouseenter: function() {
            if (!$(this).hasClass("clicked")) {
                $(this).addClass($(this).data("bgcolor-class"));
            }
        },
        mouseleave: function() {
            if (!$(this).hasClass("clicked")) {
                $(this).removeClass($(this).data("bgcolor-class"));
            }
        },
        click: function() {
            $(this).toggleClass("clicked scaled");
        },
        dblclick: function() {
            $(this).removeClass("clicked scaled").removeClass($(this).data("bgcolor-class"));
        }
    });

    
    // Generate and append articles
    $.each(articles, function(i, article) {
        var sentimentClass = "";
        switch (article.sentiment.toLowerCase()) {
            case "positive":
                sentimentClass = "pos";
                break;
            case "negative":
                sentimentClass = "neg";
                break;
            case "neutral":
                sentimentClass = "neu";
                break;
            // Add more cases here if there are other sentiments
        }

        var articleHtml = `
            <div class="card ${sentimentClass}-bg">
                <img src="${article.urlToImage}">
                <div class="card-details">
                    <p>${article.date}</p>
                    <a href="${article.url}">${article.source.name}</a>
                </div>
                <div class="card-content">
                    <h2 class="title">${article.headline}</h2>
                    <p class="truncate-text" data-max-chars="140">${article.content}</p>
                </div>
            </div>
        `;
        $(".card-container").append(articleHtml);
    });
});