import math
import re
import time

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


def get_interval(earliest: int, newest: int, number_of_points: int) -> int:
    timespan = newest - earliest
    return math.ceil(timespan / number_of_points) + 1


def get_interval_counts(earliest: int, interval: int, number_of_points: int) -> dict:
    interval_counts = {}
    current_point = earliest
    for _ in range(number_of_points):
        interval_counts[current_point] = 0
        current_point += interval
    return interval_counts


def get_line_chart_data(data: list, interval: int, interval_counts: dict):
    line_chart_data = []
    aggregated_data = {}
    for item in data:
        d = item["date"]
        a = item["analysis"]
        for k in interval_counts.keys():
            if d >= k + interval:
                continue
            if a not in aggregated_data:
                aggregated_data[a] = dict(interval_counts)
            aggregated_data[a][k] += 1
            break

    for a, c in aggregated_data.items():
        line = {}
        line["name"] = a
        line["data"] = []
        for k, v in c.items():
            line["data"].append([k, v])
        line_chart_data.append(line)
    return line_chart_data
