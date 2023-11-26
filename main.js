    $('.sub-nav-container').hide();

    $('.main-button').click(function() {
        var targetId = $(this).data("target");
        var targetContainer = $('#' + targetId);
        targetContainer.slideToggle();
        $(this).toggleClass('primary scaled');
        $(this).toggleClass('selected');
    });

    $('.rate-button').click(function() {
        $(this).toggleClass('accent scaled');
        $(this).toggleClass('selected');
    })

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


    const apiKey = '13415200668243cda3e3f7b6833749e1'; 
    let apiUrl = ''; 


    function setInitialUrl() {
        apiUrl = `https://newsapi.org/v2/everything?q=us-news&language=en&apiKey=${apiKey}`;
    }


    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed");
        setInitialUrl(); 
        fetchArticles(); 
    });

    document.getElementById('navForm').addEventListener('submit', function(event) {
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

                    let fullSourceName = article.source.name.trim();
                    let modifiedSourceName = fullSourceName.split('.')[0].trim();
                
                    if (fullSourceName === 'BBC News') {
                        modifiedSourceName = 'BBC';
                    } else if (fullSourceName === 'The Wall Street Journal') {
                        modifiedSourceName = 'WSJ';
                    }
                
                    
                    if (article.urlToImage) {
                        const date = new Date(article.publishedAt);
                        const formattedDate = date.toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                        });

                        var articleHtml = `
                            <div class="card ${sentimentClass}-bg" onclick="openModal(this)" data-url="${article.url}">
                                <img src="${article.urlToImage}">
                                <div class="card-content-container">
                                <div class="card-details">
                                    <p>${formattedDate}</p>
                                    <a href="${article.url}" target="_blank">${modifiedSourceName}</a>
                                </div>
                                <div class="card-content">
                                    <h2 class="headline">${modifiedTitle}</h2>
                                    <p>${article.description}</p>
                                </div>
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
        var articleUrl = card.getAttribute('data-url'); 
        document.querySelector('.modal-content').innerHTML = modalContent.innerHTML;
    
        var additionalContent = `
        <div class=footer-container>
        <form id="ratingForm" class="rating-container">
        <button type="button" class="rate-button">rate me</button>
        <div class="circle-button-container">
          <label>
            <button type="submit" class="circle-button primary"></button>
            <input type="radio" name="sentiment-rating" value="Positive">
          </label>
          <label>
            <button type="submit" class="circle-button neutral"></button>
            <input type="radio" name="sentiment-rating" value="Neutral">
          </label>
          <label>
            <button type="submit" class="circle-button negative"></button>
            <input type="radio" name="sentiment-rating" value="Negative">
          </label>
          <label>
            <button type="submit" class="circle-button very-negative"></button>
            <input type="radio" name="sentiment-rating" value="Very Negative">
          </label>            
        </div>
      </form>
      <button class="read-more">read more</button>

      </div>
    `;
    
    document.querySelector('.modal-content').insertAdjacentHTML('beforeend', additionalContent);

    var readMoreButton = document.querySelector('.modal-content .read-more');
    readMoreButton.onclick = function() {
        window.open(articleUrl, '_blank');
};

        $('#articleModal').css('display', 'flex').animate({opacity: 1}, 100);

        
        $('header, main').addClass('blur-effect');

    }

    window.onclick = function(event) {
        var modal = $('#articleModal');
        if (event.target == modal.get(0)) {
            modal.animate({opacity: 0}, 100, function() {
                $(this).hide();
                $('header, main').removeClass('blur-effect');
            });
        }
    };
    

    $(document).on('click', '.rate-button', function() {
        const $circleButtonContainer = $(this).closest('#ratingForm').find('.circle-button-container');
    
        if ($circleButtonContainer.css('visibility') === 'visible') {
            $circleButtonContainer.animate({
                opacity: 0
            }, 250, function() {
                $circleButtonContainer.css({
                    'visibility': 'hidden',
                    'left': '-30px' 
                });
            });
        } else {
            $circleButtonContainer.css({
                'visibility': 'visible',
                'left': '-30px' 
            }).animate({
                left: '0px',
                opacity: 1 
            }, 500);
        }
    });

    $(document).on('submit', '#ratingForm', function(event) {
        var clickedButton = $(document.activeElement);

        event.preventDefault();

        $('.circle-button').not(clickedButton).hide();
            clickedButton.addClass('active');
    });
    
    $(document).on('click', '.rate-button', function() {
        $(this).toggleClass('selected');
    })
