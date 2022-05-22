import re

import pandas as pd
from textblob import TextBlob
from flair.models import TextClassifier
from flair.data import Sentence


def extract_mentions(text: str) -> list:
    return re.findall("(@[A-Za-z0–9\d\w]+)", text)


def extract_hastag(text: str) -> list:
    return re.findall("(#[A-Za-z0–9\d\w]+)", text)


def get_subjectivity(text: str) -> tuple:
    return TextBlob(text).sentiment.subjectivity


# Perform sentiment analysis with flair
def get_polarity_flair(text: str) -> tuple:
    classifier = TextClassifier.load('en-sentiment')
    sentence = Sentence(text)
    classifier.predict(sentence)
    value = text.labels[0].to_dict()['value']
    if value == 'POSITIVE':
        return round(sentence.labels[0].to_dict()['confidence'], 3)
    else:
        return round(-sentence.labels[0].to_dict()['confidence'], 3)


def get_analysis_flair(text: str) -> tuple:
    classifier = TextClassifier.load('en-sentiment')
    sentence = Sentence(text)
    classifier.predict(sentence)
    value = text.labels[0].to_dict()['value']
    if value == 'POSITIVE':
        return 'Positive'
    else:
        return 'Negative'


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
    return data["analysis"].value_counts().reset_index().sort_values(by="index", ascending=False)


def graph_pos_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['tweets'][data['analysis'] == "Positive"]])


def graph_neu_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['tweets'][data['analysis'] == "Neutral"]])


def graph_neg_words(data: pd.DataFrame) -> str:
    return ' '.join([word for word in data['tweets'][data['analysis'] == "Negative"]])
