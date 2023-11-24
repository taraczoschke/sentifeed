    $('.sub-nav-container').hide();

    $('.main-button').click(function() {
        var targetId = $(this).data("target");
        var targetContainer = $('#' + targetId);
        targetContainer.slideToggle();
        $(this).toggleClass('primary scaled');
        $(this).toggleClass('selected');
    });

    const radioButtons = document.querySelectorAll('#sentiment input[type="radio"], #category input[type="radio"], #country input[type="radio"]');
    let lastChecked = {};

    radioButtons.forEach(radio => {
        if (!lastChecked[radio.name]) {
            lastChecked[radio.name] = document.querySelector(`input[name="${radio.name}"]:checked`) || radio;
        }

        radio.addEventListener('click', function() {
            if (lastChecked[this.name] === this) {
                this.checked = false;
                const firstButtonOfGroup = document.querySelector(`input[name="${this.name}"]`);
                firstButtonOfGroup.checked = true;
                lastChecked[this.name] = firstButtonOfGroup;
            } else {
                lastChecked[this.name] = this;
            }
        });
    });


    const apiKey = 'c90bf5366948496b842fa35d8776398c'; 
    let apiUrl = ''; 


    function setInitialUrl() {
        apiUrl = `https://newsapi.org/v2/everything?q=us-news&language=en&apiKey=${apiKey}`;
    }


    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed");
        setInitialUrl(); 
        fetchArticles(); 
    });

    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        fetchArticles();
    });

    function fetchArticles() {
        const sentimentClasses = ["pos", "neu", "neg", "very-neg"];
        const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
        apiUrl = selectedCategory ? `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&language=en&apiKey=${apiKey}` : apiUrl;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.querySelector('.card-container').innerHTML = '';
                const articles = data.articles;
                articles.forEach(article => {
                    const randomIndex = Math.floor(Math.random() * sentimentClasses.length);
                    const sentimentClass = sentimentClasses[randomIndex];
                    const modifiedTitle = article.title.replace(/ - .*/, '').trim();
                    const modifiedSourceName = article.source.name.split('.')[0].trim();
                    if (article.urlToImage) {
                        const date = new Date(article.publishedAt);
                        const formattedDate = date.toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                        });

                        var articleHtml = `
                            <div class="card ${sentimentClass}-bg" onclick="openModal(this)">
                                <img src="${article.urlToImage}">
                                <div class="card-details">
                                    <p>${formattedDate}</p>
                                    <a href="${article.url}">${modifiedSourceName}</a>
                                </div>
                                <div class="card-content">
                                    <h2 class="headline">${modifiedTitle}</h2>
                                    <p>${article.description}</p>
                                </div>
                            </div>
                        `;
                        document.querySelector(".card-container").insertAdjacentHTML('beforeend', articleHtml);
                    }
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // Modal functionality
    window.openModal = function(card) {
        var modalContent = card.cloneNode(true);
        document.querySelector('.modal-content').innerHTML = modalContent.innerHTML;
        document.getElementById('articleModal').style.display = 'flex';

            $('header, main').addClass('blur-effect');

    }

    window.onclick = function(event) {
        var modal = document.getElementById('articleModal');
        if (event.target == modal) {
            modal.style.display = 'none';
            $('header, main').removeClass('blur-effect');

        }

        

    }
