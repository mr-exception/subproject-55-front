import tweepy
import json
from config import *

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# public_tweets = api.home_timeline()
# for tweet_object in public_tweets:
#     tweet = tweet_object._json
#     id = tweet['user']['id']
#     name = tweet['user']['name']
#     text = tweet['text']
#     print("{0}({1}): {2}".format(name, id, text))


# print(api.friends_ids(13058682))

# print(api.trends_closest(35.6215718, 51.3946415))

public_tweets = api.user_timeline(13058682)
# public_tweets = api.home_timeline()
for tweet_object in public_tweets:
    tweet = tweet_object._json
    id = tweet['user']['id']
    name = tweet['user']['name']
    text = tweet['text']
    print("{0}({1}): {2}".format(name, id, text))
