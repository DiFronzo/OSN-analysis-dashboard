import io
import json
import time

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

from preprocessing import Preprocessing
from processing import utils

# https://github.com/marshmallow-code/apispec
app = Flask(__name__, template_folder="swagger/templates")
CORS(app)

SITE_NAME = "https://pbs.twimg.com/"


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def proxy(path):
    tw_file = get(f"{SITE_NAME}{path}").content
    return send_file(io.BytesIO(tw_file), mimetype="image/jpeg")


class TimelineValuesSchema(Schema):
    name = fields.Str()
    data = fields.List(fields.Number)


class TimelineResponseSchema(Schema):
    pos = fields.List(fields.Nested(TimelineValuesSchema))
    neu = fields.List(fields.Nested(TimelineValuesSchema))
    neg = fields.List(fields.Nested(TimelineValuesSchema))
    dates = fields.List(fields.Date)


# TODO: Change function to only return earliest and latest date, together with the tweets.
@app.route("/line/<word_query>", methods=["GET"])
def timeline(word_query):
    """ """
    args = request.args
    number_of_tweets = args.get("number_of_tweets")

    r = Preprocessing()
    data = r.preprocessing_data(
        word_query, int(number_of_tweets) if not (number_of_tweets is None) else 100
    )
    date_counts = {}
    rows = json.loads(data.to_json(orient="records"))
    for item in rows:
        date = time.strftime("%Y-%m-%d", time.localtime(item["date"] / 1000))
        if date not in date_counts:
            date_counts[date] = {"pos": 0, "neu": 0, "neg": 0}
        a = item["analysis"]
        val = "neu"
        if a == "Positive":
            val = "pos"
        elif a == "Negative":
            val = "neg"
        date_counts[date][val] += 1
    dates = []
    for k in date_counts:
        print(k)
        dates.append(k)
    print(dates)
    dates.sort()
    pos = []
    neu = []
    neg = []
    for date in dates:
        current = date_counts[date]
        pos.append(current["pos"])
        neu.append(current["neu"])
        neg.append(current["neg"])
    return {
        "data": [
            {"name": "Positive", "data": pos},
            {"name": "Neutral", "data": neu},
            {"name": "Negative", "data": neg},
        ],
        "dates": dates,
    }


class MapResponseSchema(Schema):
    tweets = fields.Str()
    location = fields.Str()
    place = fields.Dict()
    coordinates = fields.Dict()


class MapListResponseSchema(Schema):
    map_data = fields.List(fields.Nested(MapResponseSchema))


@app.route("/map/<word_query>", methods=["GET"])
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


@app.route("/docs")
@app.route("/docs/<path:path>")
def swagger_docs(path=None):
    if not path or path == "index.html":
        return render_template("index.html", base_url="/docs")
    else:
        return send_from_directory("./swagger/static", path)


if __name__ == "__main__":
    app.run(debug=True)
