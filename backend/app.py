import io
import json
import math
import time

import pandas as pd
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import (
    Flask,
    jsonify,
    render_template,
    send_from_directory,
    request,
    send_file,
)
from marshmallow import Schema, fields
from flask_cors import CORS
from requests import get
from flask_caching import Cache  # Import Cache from flask_caching module

from preprocessing import Preprocessing
from processing import utils

# https://github.com/marshmallow-code/apispec
app = Flask(__name__, template_folder="swagger/templates")
app.config.from_object(
    "config.Config"
)  # Set the configuration variables to the flask application
cache = Cache(app)  # Initialize Cache
CORS(app)

SITE_NAME = "https://pbs.twimg.com/"


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def proxy(path):
    tw_file = get(f"{SITE_NAME}{path}").content
    return send_file(io.BytesIO(tw_file), mimetype="image/jpeg")


class TimelineDataSchema(Schema):
    name = fields.Str()
    data = fields.List(fields.List(fields.Int()))


class TimelineResponseSchema(Schema):
    data = fields.List(fields.Nested(TimelineDataSchema))


class TimelineDataQueryNumOfPoints(Schema):
    number_of_points = fields.Int()


@app.route("/line/<word_query>", methods=["GET"])
# @cache.cached(timeout=60, query_string=True)  # THIS NEEDS TO BE UNCOMMENTED IN PRODUCTION
def timeline(word_query):
    """Get list of aggregated sentiment data at different points in a timespan
    ---
    get:
        description: Get list of aggregated sentiment data at different points in a timespan
        parameters:
        - in: path
          schema: RawDataParameter
        - in: query
          name: number_of_tweets
          schema: RawDataQueryNumOfTweets
        - in: query
          name: number_of_points
          schema: TimelineDataQueryNumOfPoints
        responses:
            200:
               content:
                  application/json:
                      schema: TimelineResponseSchema
    """
    args = request.args
    number_of_tweets = args.get("number_of_tweets")
    number_of_points = args.get("number_of_points")

    r = Preprocessing()
    data = r.preprocessing_data(
        word_query, int(number_of_tweets) if not (number_of_tweets is None) else 100
    )
    rows = json.loads(data.to_json(orient="records"))
    earliest = round((time.time() * 1000) + 1)
    newest = 0

    # Find the earliest and newest dates from the data
    for item in rows:
        d = item["date"]
        if d < earliest:
            earliest = d
        if d > newest:
            newest = d

    n = int(number_of_points) if (not number_of_points is None) else 10
    n = n if (n > 0) else 10

    timespan = newest - earliest
    interval = math.ceil(timespan / n) + 1
    results = utils.get_line_chart_data(rows, interval, earliest, n)

    return TimelineResponseSchema().dump({"data": results})


class WCResponseSchema(Schema):
    text = fields.Str()
    value = fields.Int()


class WCListResponseSchema(Schema):
    wc_data = fields.List(fields.Nested(WCResponseSchema))


@app.route('/wordcloud/<word_query>', methods=['GET'])
def wc_data(word_query):
    """Get List of words and counts for Tweets found with a given polarity
        ---
        get:
            description: Get List of words and counts for Tweets found with a given polarity
            parameters:
            - in: path
              schema: RawDataParameter
            - in: query
              name: number_of_tweets
              schema: RawDataQueryNumOfTweets
            - in: query
              name: function_option
              schema:
                type: enum
                items:
                  type: string
                  enum:
                    - positive
                    - neutral
                    - negative
            responses:
                200:
                  content:
                    application/json:
                      schema: WCListResponseSchema
        """
    args = request.args
    number_of_tweets = args.get('number_of_tweets')
    function_option = args.get('function_option')

    r = Preprocessing()
    data = r.preprocessing_data(word_query, int(number_of_tweets) if not (number_of_tweets is None) else 100, "", "en")

    word_cl: pd.DataFrame
    if function_option.lower() == "neutral":
        word_cl = utils.graph_neu_words(data)
    elif function_option.lower() == "negative":
        word_cl = utils.graph_neg_words(data)
    else:
        word_cl = utils.graph_pos_words(data)

    rows = json.loads(word_cl.to_json(orient="records"))
    return WCListResponseSchema().dump({"wc_data": rows})


class MapResponseSchema(Schema):
    tweets = fields.Str()
    location = fields.Str()
    place = fields.Dict()
    coordinates = fields.Dict()


class MapListResponseSchema(Schema):
    map_data = fields.List(fields.Nested(MapResponseSchema))


@app.route("/map/<word_query>", methods=["GET"])
# @cache.cached(timeout=60, query_string=True)  # THIS NEEDS TO BE UNCOMMENTED IN PRODUCTION
def map_data(word_query):
    """Get List of coordinates, place, or location for Tweets
    ---
    get:
        description: Get List of coordinates, place, or location for Tweets
        parameters:
        - in: path
          schema: RawDataParameter
        - in: query
          name: number_of_tweets
          schema: RawDataQueryNumOfTweets
        responses:
            200:
              content:
                application/json:
                  schema: MapListResponseSchema
    """
    args = request.args
    number_of_tweets = args.get("number_of_tweets")

    r = Preprocessing()
    data = r.preprocessing_data(
        word_query,
        int(number_of_tweets) if not (number_of_tweets is None) else 100,
        "",
        "en",
    )
    rows = json.loads(data.to_json(orient="records"))
    return MapListResponseSchema().dump({"map_data": rows})


class RawDataParameter(Schema):
    word_query = fields.Str()


class RawDataQueryNumOfTweets(Schema):
    number_of_tweets = fields.Int()


@app.route("/pie/<word_query>", methods=["GET"])
# @cache.cached(timeout=60, query_string=True)  # THIS NEEDS TO BE UNCOMMENTED IN PRODUCTION
def polarity(word_query):
    """Get List of Sentiments for Tweets
    ---
    get:
        description: Get List of Sentiments for Tweets
        parameters:
        - in: path
          schema: RawDataParameter
        - in: query
          name: number_of_tweets
          schema: RawDataQueryNumOfTweets
        responses:
            200:
              content:
                application/json:
                  schema: PolarityListResponseSchema
    """
    args = request.args
    number_of_tweets = args.get("number_of_tweets")

    r = Preprocessing()
    data = r.preprocessing_data(
        word_query,
        int(number_of_tweets) if not (number_of_tweets is None) else 100,
        "",
        "en",
    )
    get_graph_sentiment = utils.graph_sentiment(data)
    rows = json.loads(get_graph_sentiment.to_json(orient="records"))
    return PolarityListResponseSchema().dump({"polarity": rows})


class PolaritySchema(Schema):
    index = fields.Str()
    analysis = fields.Int()


class PolarityListResponseSchema(Schema):
    polarity = fields.List(fields.Nested(PolaritySchema))


@app.route("/raw_data/<word_query>", methods=["GET"])
# @cache.cached(timeout=60, query_string=True)  # THIS NEEDS TO BE UNCOMMENTED IN PRODUCTION
def raw_data(word_query):
    """Get List of Raw Tweets
    ---
    get:
        description: Get List of Raw Tweets
        parameters:
        - in: path
          schema: RawDataParameter
        - in: query
          name: number_of_tweets
          schema: RawDataQueryNumOfTweets
        - in: query
          name: function_option
          schema:
            type: array
            items:
              type: string
              enum:
                - username
        - in: query
          name: lang_opt
          schema:
            type: array
            items:
              type: string
              enum:
                - en
                - "no"
                - sv
                - da
        responses:
            200:
                description: Return a tweet list
                content:
                    application/json:
                        schema: RawDataListResponseSchema

    """
    args = request.args
    number_of_tweets = args.get("number_of_tweets")
    function_option = args.get("function_option")
    lang_opt = args.get("lang_opt")

    r = Preprocessing()
    data = r.preprocessing_data(
        word_query,
        int(number_of_tweets) if not (number_of_tweets is None) else 100,
        function_option if not (function_option is None) else "",
        lang_opt if not (function_option is None) else "en",
    )
    rows = json.loads(data.to_json(orient="records"))

    return RawDataListResponseSchema().dump({"raw_data": rows})


spec = APISpec(
    title="OSN-Dashboard-API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)


@app.route("/api/swagger.json")
def create_swagger_spec():
    return jsonify(spec.to_dict())


class RawDataResponseSchema(Schema):
    tweets = fields.Str()
    date = fields.Float()
    location = fields.Str()
    mentions = fields.List(fields.Str())
    hastags = fields.List(fields.Str())
    # retweets = fields.List(fields.Str())
    subjectivity = fields.Float()
    polarity = fields.Float()
    analysis = fields.Str()
    profile_img = fields.Str()
    screen_name = fields.Str()


class RawDataListResponseSchema(Schema):
    raw_data = fields.List(fields.Nested(RawDataResponseSchema))


# What to show on the docs page
with app.test_request_context():
    spec.path(view=raw_data)
    spec.path(view=polarity)
    spec.path(view=map_data)
    spec.path(view=wc_data)
    spec.path(view=timeline)


@app.route("/docs")
@app.route("/docs/<path:path>")
def swagger_docs(path=None):
    if not path or path == "index.html":
        return render_template("index.html", base_url="/docs")
    else:
        return send_from_directory("./swagger/static", path)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
