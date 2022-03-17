import re

import pandas as pd
from textblob import TextBlob


def extract_mentions(text: str) -> list:
    return re.findall("(@[A-Za-z0–9\d\w]+)", text)


def extract_hastag(text: str) -> list:
    return re.findall("(#[A-Za-z0–9\d\w]+)", text)


def get_subjectivity(text: str) -> tuple:
    return TextBlob(text).sentiment.subjectivity


# Create a function to get the polarity
def get_polarity(text: str) -> tuple:
    return TextBlob(text).sentiment.polarity


def get_analysis(score: float) -> str:
    if score < 0:
        return 'Negative'
    elif score == 0:
        return 'Neutral'
    else:
        return 'Positive'


def graph_sentiment(data: pd.DataFrame) -> pd.DataFrame:
    return data["Analysis"].value_counts().reset_index().sort_values(by="index", ascending=False)


def graph_pos_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['Tweets'][data['Analysis'] == "Positive"]])


def graph_neu_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['Tweets'][data['Analysis'] == "Neutral"]])


def graph_neg_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['Tweets'][data['Analysis'] == "Negative"]])
