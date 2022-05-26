import re
from datetime import datetime

import pandas as pd
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


def extract_mentions(text: str) -> list:
    return re.findall("(@[A-Za-z0–9\d\w]+)", text)


def extract_hastag(text: str) -> list:
    return re.findall("(#[A-Za-z0–9\d\w]+)", text)


def get_subjectivity(text: str) -> tuple:
    return TextBlob(text).sentiment.subjectivity


# Retrieve polarity using vader
def get_polarity_vader(text: str) -> tuple:
    sid_obj = SentimentIntensityAnalyzer()
    sentiment_dict = sid_obj.polarity_scores(text)
    return sentiment_dict["compound"]


def get_analysis_vader(score: float) -> str:
    if score >= 0.05:
        return "Positive"
    elif score <= -0.05:
        return "Negative"
    else:
        return "Neutral"


# Create a function to get the polarity
def get_polarity(text: str) -> tuple:
    return TextBlob(text).sentiment.polarity


def get_analysis(score: float) -> str:
    if score < 0:
        return "Negative"
    elif score == 0:
        return "Neutral"
    else:
        return "Positive"


def graph_sentiment(data: pd.DataFrame) -> pd.DataFrame:
    return (
        data["analysis"]
        .value_counts()
        .reset_index()
        .sort_values(by="index", ascending=False)
    )


def graph_pos_words(data: pd.DataFrame) -> str:
    return " ".join([word for word in data["tweets"][data["analysis"] == "Positive"]])


def graph_neu_words(data: pd.DataFrame) -> str:
    return " ".join([word for word in data["tweets"][data["analysis"] == "Neutral"]])


def graph_neg_words(data: pd.DataFrame) -> str:
    return " ".join([word for word in data["tweets"][data["analysis"] == "Negative"]])


def is_date_format(value: str):
    date_format = "%Y-%m-%d"
    try:
        datetime.strptime(value, date_format)
        return True
    except ValueError:
        return False


def get_line_chart_data(
    data: list, interval: int, earliest: int, number_of_points: int
) -> list:
    time_point_counts = {}
    current_point = earliest
    for _ in range(number_of_points):
        time_point_counts[current_point] = [0, 0, 0]
        current_point += interval

    for item in data:
        a = item["analysis"]
        d = item["date"]

        i = 0
        if a == "Neutral":
            i = 1
        elif a == "Negative":
            i = 2

        for tp in time_point_counts:
            if d >= tp + interval:
                continue
            time_point_counts[tp][i] += 1
            break

    pos = []
    neu = []
    neg = []

    for k, a in time_point_counts.items():
        pos.append([k, a[0]])
        neu.append([k, a[1]])
        neg.append([k, a[2]])

    return [
        {"name": "Positive", "data": pos},
        {"name": "Neutral", "data": neu},
        {"name": "Negative", "data": neg},
    ]
