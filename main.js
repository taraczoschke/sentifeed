$('.sub-nav-container').hide();

$('.main-button').click(function() {
    var targetId = $(this).data("target");
    var targetContainer = $('#' + targetId);

    targetContainer.slideToggle();

    $(this).toggleClass('primary scaled');
    $(this).toggleClass('selected');

    })

    const radioButtons = document.querySelectorAll('#sentiment input[type="radio"], #category input[type="radio"], #country input[type="radio"]');

    let lastChecked = {}; // Object to keep track of the last checked radio button for each group

    radioButtons.forEach(radio => {
        // Initialize lastChecked for each group with the first radio button
        if (!lastChecked[radio.name]) {
            lastChecked[radio.name] = document.querySelector(`input[name="${radio.name}"]:checked`) || radio;
        }

        radio.addEventListener('click', function() {
            // Check if the clicked radio button is the currently selected one for its group
            if (lastChecked[this.name] === this) {
                // If yes, deselect it and select the first radio button of its group
                this.checked = false;
                const firstButtonOfGroup = document.querySelector(`input[name="${this.name}"]`);
                firstButtonOfGroup.checked = true;
                lastChecked[this.name] = firstButtonOfGroup;
            } else {
                // If no, update the lastChecked for its group to the currently selected radio button
                lastChecked[this.name] = this;
            }
        });
    });


    // Initialize lastChecked with the first radio button
    lastChecked = radioButtons[0];




const apiKey = 'c90bf5366948496b842fa35d8776398c'; 
const query = 'news'; 
const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${apiKey}`;
const sentimentClasses = ["pos", "neg", "neu", "very-neg"]; // Array of sentiment classes

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


                var articleHtml = `
                    <div class="card ${sentimentClass}-bg">
                        <img src="${article.urlToImage}">
                        <div class="card-details">
                            <p>${formattedDate}</p>
                            <a href="${article.url}">${article.source.name}</a>
                        </div>
                        <div class="card-content">
                            <h2 class="headline">${article.title}</h2>
                            <p>${article.description}</p>
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
    


