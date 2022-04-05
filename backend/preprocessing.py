import configparser
import itertools
import collections
import re

import pandas as pd
import tweepy
from tweepy.cursor import ItemIterator

from processing.utils import extract_mentions, extract_hastag, get_analysis, get_subjectivity, get_polarity


class Preprocessing:
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002500-\U00002BEF"  # chinese char
                               u"\U00002702-\U000027B0"
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               u"\U0001f926-\U0001f937"
                               u"\U00010000-\U0010ffff"
                               u"\u2640-\u2642"
                               u"\u2600-\u2B55"
                               u"\u200d"
                               u"\u23cf"
                               u"\u23e9"
                               u"\u231a"
                               u"\ufe0f"  # dingbats
                               u"\u3030"  # flags (iOS)
                               "]+", flags=re.UNICODE)

    def __init__(
            self
    ):
        config = configparser.ConfigParser()
        config.read("config.ini")

        api_key = config["twitter"]["api_key"]
        api_key_secret = config["twitter"]["api_key_secret"]

        auth = tweepy.OAuthHandler(api_key, api_key_secret)
        self.api = tweepy.API(auth, wait_on_rate_limit=True)
        self.words = []

    def __enter__(self):
        return self

    def __dir__(self):
        return self.__dict__.keys()

    def clean_txt(self, text: str) -> str:
        """Replace URLs, RT, HTML tags found in a text string with nothing

        Parameters
        ----------
        text : string
            A text string that you want to parse and remove urls.

        Returns
        -------
        The same txt string but cleaned
        """
        text = re.sub('@[A-Za-z0–9]+', '', text)  # Removing @mentions
        text = re.sub('#', '', text)  # Removing '#' hash tag
        text = re.sub('RT[\s]+', '', text)  # Removing RT
        text = re.sub('https?:\/\/\S+', '', text)
        text = re.sub("\n", "", text)  # Removing hyperlink
        text = re.sub(":", "", text)  # Removing hyperlink
        text = re.sub("_", "", text)  # Removing hyperlink
        text = re.sub("h(m)+", "", text)  # Removing the word 'hmm' and it's variants
        text = text.replace("&amp;", "&")  # Replace &amp; with &
        text = self.emoji_pattern.sub(r'', text)

        slang = {'luv': 'love', 'wud': 'would', 'lyk': 'like', 'wateva': 'whatever', 'ttyl': 'talk to you later',
                 'kul': 'cool', 'fyn': 'fine', 'omg': 'oh my god', 'fam': 'family', 'bruh': 'brother',
                 'cud': 'could', 'fud': 'food', 'lol': 'laughing out loud', 'rly': 'really'}  ## Need a huge dictionary
        text = text.split()
        reformed = [slang[word] if word in slang else word for word in text]
        text = " ".join(reformed)

        return text

    # TODO! Cache this function
    def preprocessing_data(self, word_query: str, number_of_tweets: int, function_option="",
                           lang_opt="en") -> pd.DataFrame:
        """Finds real-time tweets and finds polarity

        Parameters
        ----------
        word_query : string
            A text string for what to search.
        number_of_tweets : int
            A int for maximum number of tweets to collect.
        function_option : string
            A text for deciding API call to use.
        lang_opt : string
            Restricts tweets to the given language, given by an ISO 639-1 code. Language detection is best-effort.

        Returns
        -------
        pandas dataframe with the columns: Tweets, Date, Location, hastags, retweets, Subjectivity,
        Polarity, and Analysis
        """

        posts: ItemIterator
        # TODO! add start date of the search if needed and make a option for "-filter:.."
        if function_option.lower() == "username":
            posts = tweepy.Cursor(self.api.user_timeline, screen_name=word_query, count=200,
                                  tweet_mode="extended").items(
                number_of_tweets)
        else:
            posts = tweepy.Cursor(self.api.search_tweets, q=word_query + " -filter:retweets", count=200,
                                  lang=lang_opt,
                                  tweet_mode="extended").items(
                number_of_tweets)

        data = pd.DataFrame([[tweet.full_text, tweet.created_at, tweet.user.location, tweet.user.profile_image_url_https, tweet.user.screen_name] for tweet in posts],
                            columns=['tweets', 'date', "location", "profile_img", "screen_name"])  # tweet.user.location

        if data.empty:
            return data

        data["mentions"] = data["tweets"].apply(extract_mentions)
        data["hastags"] = data["tweets"].apply(extract_hastag)
        # data['links'] = data['tweets'].str.extract('(https?:\/\/\S+)', expand=False).str.strip()
        data['retweets'] = data['tweets'].str.extract('(RT[\s@[A-Za-z0–9\d\w]+)', expand=False).str.strip()

        data['tweets'] = data['tweets'].apply(self.clean_txt)
        discard = ["CNFTGiveaway", "GIVEAWAYPrizes", "Giveaway", "Airdrop", "GIVEAWAY", "makemoneyonline",
                   "affiliatemarketing", "FreeBitcoins"]
        data = data[~data["tweets"].str.contains('|'.join(discard))]

        data['subjectivity'] = data['tweets'].apply(get_subjectivity)
        data['polarity'] = data['tweets'].apply(get_polarity)

        data['analysis'] = data['polarity'].apply(get_analysis)

        # word counter for top 15
        # TODO! remove the word_query word sent by the user
        words = [tweet.lower().split() for tweet in data['tweets']]
        all_words = list(itertools.chain(*words))
        counts = collections.Counter(all_words)
        self.words = pd.DataFrame(counts.most_common(15),
                                  columns=['words', 'count'])

        return data
