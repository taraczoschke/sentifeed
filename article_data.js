
// // Loop through the articles and generate HTML for each
// for (var i = 0; i < articles.length; i++) {
//     var article = articles[i];

//     var articleHtml = `
//         <div class="article">
//             <div class="headline">${article.headline}</div>
//             <div class="date">${article.date}</div>
//             <div class="author">${article.author}</div>
//             <div class="source-name">${article.source.name}</div>
//             <div class="content">${article.content}</div>
//             <div class="url">${article.url}</div>
//             <div class="url-to-image">${article.urlToImage}</div>
//             <div class="sentiment">${article.sentiment}</div>
//         </div>
//     `;

//     // Append the generated HTML to a container (e.g., a div with id "article-container")
//     document.getElementById("article-container").innerHTML += articleHtml;
// }


var articles = [
    {
        headline: "Sunny Skies Forecasted for the Weekend",
        date: "2023-11-19",
        author: "Weather Wizard",
        source: {
            name: "Weather Channel"
        },
        content: "A perfect weekend ahead with clear skies and warm temperatures.",
        url: "https://weatherchannel.com/weekend-forecast",
        urlToImage: "https://weatherchannel.com/images/sunny-weekend.jpg",
        sentiment: "Positive"
    },
    {
        headline: "Innovative Tech Start-Up Receives Funding",
        date: "2023-11-20",
        author: "Tech Guru",
        source: {
            name: "TechCrunch"
        },
        content: "XYZ Tech, a cutting-edge start-up, secures $10 million in funding for its revolutionary product.",
        url: "https://techcrunch.com/xyz-tech-funding",
        urlToImage: "https://techcrunch.com/images/xyz-tech.jpg",
        sentiment: "Positive"
    },
    {
        headline: "Controversial Decision Sparks Public Debate",
        date: "2023-11-21",
        author: "Opinion Columnist",
        source: {
            name: "Daily Debate"
        },
        content: "A recent government decision has ignited heated discussions across the nation.",
        url: "https://dailydebate.com/controversial-decision",
        urlToImage: "https://dailydebate.com/images/protest.jpg",
        sentiment: "Negative"
    },
    {
        headline: "Discover the Secrets of Ancient Egypt",
        date: "2023-11-22",
        author: "History Enthusiast",
        source: {
            name: "History Today"
        },
        content: "Unearth the mysteries of the pharaohs in this fascinating archaeological exploration.",
        url: "https://historytoday.com/secrets-of-ancient-egypt",
        urlToImage: "https://historytoday.com/images/pyramids.jpg",
        sentiment: "Positive"
    },
    {
        headline: "Stock Market Volatility Continues",
        date: "2023-11-23",
        author: "Financial Analyst",
        source: {
            name: "Financial Times"
        },
        content: "Investors remain cautious as stock prices fluctuate amid economic uncertainty.",
        url: "https://financialtimes.com/stock-market-volatility",
        urlToImage: "https://financialtimes.com/images/stock-market.jpg",
        sentiment: "Neutral"
    },
    {
        headline: "New Environmental Policies Announced",
        date: "2023-11-24",
        author: "Environmental Advocate",
        source: {
            name: "Green Planet News"
        },
        content: "Government unveils ambitious plans to combat climate change and protect ecosystems.",
        url: "https://greenplanetnews.com/environmental-policies",
        urlToImage: "https://greenplanetnews.com/images/green-earth.jpg",
        sentiment: "Positive"
    },
    {
        headline: "Healthcare System Faces Unprecedented Challenges",
        date: "2023-11-25",
        author: "Medical Expert",
        source: {
            name: "Health Journal"
        },
        content: "Overwhelmed hospitals and supply shortages pose major obstacles to healthcare providers.",
        url: "https://healthjournal.com/healthcare-challenges",
        urlToImage: "https://healthjournal.com/images/hospital.jpg",
        sentiment: "Negative"
    },
    {
        headline: "Upcoming Film Festival Celebrates Diversity",
        date: "2023-11-26",
        author: "Film Critic",
        source: {
            name: "Cinema Today"
        },
        content: "A showcase of films from around the world promises a vibrant celebration of cultures.",
        url: "https://cinematoday.com/diversity-film-festival",
        urlToImage: "https://cinematoday.com/images/film-festival.jpg",
        sentiment: "Positive"
    }
    // Additional objects with sentiment data can be included here
];
