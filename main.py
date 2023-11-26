import os
import joblib
import json
from fastapi import FastAPI, HTTPException, Form, Depends
from pydantic import BaseModel, Field
from datetime import datetime
from newsapi import NewsApiClient
from typing import Optional, List
from fastapi.responses import RedirectResponse
from starlette.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Load the trained sentiment analysis model
base_directory = os.path.dirname(os.path.abspath(__file__))
model_filename = os.path.join(base_directory, "sentiment_model.pkl")
model = joblib.load(model_filename)

# Initialize NewsAPI client
NEWS_API_KEY = "c90bf5366948496b842fa35d8776398c"
newsapi = NewsApiClient(api_key=NEWS_API_KEY)

class UserRequest(BaseModel):
    country: Optional[str] = Field(None, example="us")
    category: Optional[str] = Field(None, example="sports")
    sentiment: Optional[str] = Field(None, example="Negative")

# Sentiment analysis functions
def calculate_sentiment(title: str) -> float:
    probs = model.predict_proba([title])
    sentiment_value = 0 * probs[0][0] + 4 * probs[0][1]
    return sentiment_value

def sentiment_to_category(sentiment_value: float) -> str:
    if sentiment_value <= 0.5:
        return "Very Negative"
    elif sentiment_value <= 1.5:
        return "Negative"
    elif sentiment_value <= 2.5:
        return "Neutral"
    elif sentiment_value <= 3.5:
        return "Positive"
    else:
        return "Very Positive"

# API endpoint

# Redirect to the /docs endpoint when accessing the root URL
@app.get('/', include_in_schema=False)
async def redirect_to_docs():
    return RedirectResponse(url='/docs')

# Simplified root endpoint
@app.get('/docs', include_in_schema=False)
async def root():
    return {'message': 'Go to /docs for API documentation'}

@app.post("/articles/", operation_id="create_articles")
async def create_articles(request: UserRequest = Depends()):
    country_code = request.country if request.country else None  # Use None for a default "all" behavior
    category_code = request.category if request.category else "general"  # Default to "general" if not provided
    sentiment = request.sentiment  # Directly use sentiment from request

    # If country code is an empty string, don't pass it to the NewsAPI client
    params = {
        "language": 'en',
        "page_size": 100
    }
    if country_code:
        params["country"] = country_code
    if category_code:
        params["category"] = category_code

    response = newsapi.get_top_headlines(**params)

    articles = response.get("articles", [])
    filtered_articles = []

    for article in articles:
        sentiment_value = calculate_sentiment(article["title"])
        article_sentiment = sentiment_to_category(sentiment_value)

        # Filter by sentiment if provided
        if sentiment and article_sentiment != sentiment:
            continue

        article_info = {
            "headline": article["title"],
            "date": datetime.strptime(article["publishedAt"], "%Y-%m-%dT%H:%M:%SZ").strftime("%b %d, %Y %H:%M:%S"),
            "author": article.get("author"),
            "source_name": article["source"]["name"] if article.get("source") else None,
            "content": article.get("content"),
            "url": article["url"],
            "urlToImage": article.get("urlToImage"),
            "sentiment": article_sentiment
        }

        filtered_articles.append(article_info)

    # Write to JSON file
    with open("articles.json", "w") as file:
        json.dump(filtered_articles, file)

    # Return the JSON response
    return JSONResponse(content={"articles": filtered_articles})

@app.get("/articles/", operation_id="get_articles")
async def get_articles(
    country: Optional[str] = None,  # Use query parameters, not Form
    category: Optional[str] = None,
    sentiment: Optional[str] = None
):
    # The logic here will be similar to the POST endpoint,
    # but adapted to use query parameters instead of form data.
    country_code = country if country else None  # Use None for a default "all" behavior
    category_code = category if category else "general"  # Default to "general" if not provided

    # If country code is an empty string, don't pass it to the NewsAPI client
    params = {
        "language": 'en',
        "page_size": 100
    }
    if country_code:
        params["country"] = country_code
    if category_code:
        params["category"] = category_code

    response = newsapi.get_top_headlines(**params)

    articles = response.get("articles", [])
    filtered_articles = []

    for article in articles:
        sentiment_value = calculate_sentiment(article["title"])
        article_sentiment = sentiment_to_category(sentiment_value)

        # Filter by sentiment if provided
        if sentiment and article_sentiment != sentiment:
            continue

        article_info = {
            "headline": article["title"],
            "date": datetime.strptime(article["publishedAt"], "%Y-%m-%dT%H:%M:%SZ").strftime("%b %d, %Y %H:%M:%S"),
            "author": article.get("author"),
            "source_name": article["source"]["name"] if article.get("source") else None,
            "content": article.get("content"),
            "url": article["url"],
            "urlToImage": article.get("urlToImage"),
            "sentiment": article_sentiment
        }

        filtered_articles.append(article_info)

    # No need to write to a JSON file unless you specifically need it
    # Simply return the filtered articles as a JSON response
    return JSONResponse(content={"articles": filtered_articles})

# Run the application locally to test:
# uvicorn main:app --host 127.0.0.1 --port 8003 --reload
