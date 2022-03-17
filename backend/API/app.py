import json

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import Flask, jsonify, render_template, send_from_directory, request
from marshmallow import Schema, fields

from preprocessing import Preprocessing

# https://github.com/marshmallow-code/apispec
app = Flask(__name__, template_folder='swagger/templates')


class RawDataParameter(Schema):
    word_query = fields.Str()


class RawDataQueryNumOfTweets(Schema):
    number_of_tweets = fields.Int()

@app.route('/raw_data/<word_query>', methods=['GET'])
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
    number_of_tweets = args.get('number_of_tweets')
    function_option = args.get('function_option')
    lang_opt = args.get('lang_opt')

    r = Preprocessing()
    data = r.preprocessing_data(word_query, int(number_of_tweets) if not (number_of_tweets is None) else 100,
                                function_option if not (function_option is None) else "",
                                lang_opt if not (function_option is None) else "en")
    rows = json.loads(data.to_json(orient="records"))

    return RawDataListResponseSchema().dump({"raw_data": rows})


spec = APISpec(
    title="OSN-Dashboard-API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()]
)


@app.route("/api/swagger.json")
def create_swagger_spec():
    return jsonify(spec.to_dict())


class RawDataResponseSchema(Schema):
    Tweets = fields.Str()
    Date = fields.Float()
    Location = fields.Str()
    mentions = fields.List(fields.Str())
    hastags = fields.List(fields.Str())
    # retweets = fields.List(fields.Str())
    Subjectivity = fields.Float()
    Polarity = fields.Float()
    Analysis = fields.Str()


class RawDataListResponseSchema(Schema):
    raw_data = fields.List(fields.Nested(RawDataResponseSchema))


# What to show on the docs page
with app.test_request_context():
    spec.path(view=raw_data)


@app.route("/docs")
@app.route("/docs/<path:path>")
def swagger_docs(path=None):
    if not path or path == 'index.html':
        return render_template('index.html', base_url='/docs')
    else:
        return send_from_directory("./swagger/static", path)


if __name__ == '__main__':
    app.run(debug=True)
