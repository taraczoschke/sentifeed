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


const apiKey = '13415200668243cda3e3f7b6833749e1'; 
const query = 'news'; // You can change this query dynamically
const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
const sentimentClasses = ["very-pos", "pos", "neg", "neu", "very-neg"]; // Array of sentiment classes

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
            const randomIndex = Math.floor(Math.random() * sentimentClasses.length);
            const sentimentClass = sentimentClasses[randomIndex];

            if (article.urlToImage) {
                const date = new Date(article.publishedAt);
                const formattedDate = date.toLocaleString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                });

                var articleHtml = `
                    <div class="card ${sentimentClass}-bg">
                        <img src="${article.urlToImage}">
                        <div class="card-details">
                            <p>${formattedDate}</p>
                            <a href="${article.url}">${article.source.name}</a>
                        </div>
                        <div class="card-content">
                            <h2 class="headline">${article.title}</h2>
                            <p>${article.description || article.content}</p>
                        </div>
                    </div>
                `;
                $(".card-container").append(articleHtml);
            }
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });



    // $('.circle-button-container').hide()
    // $('.rate-button').on("click", function () {
    //     $('.circle-button-container').slideToggle()
    // })
    
                // var sentimentClass = "";
                // switch (article.sentiment?.toLowerCase()) {
                //     case "positive":
                //         sentimentClass = "pos";
                //         break;
                //     case "negative":
                //         sentimentClass = "neg";
                //         break;
                //     case "neutral":
                //         sentimentClass = "neu";
                //         break;
                //     case "very-negative":
                //         sentimentClass = "very-neg";
                //         break;
                // }


