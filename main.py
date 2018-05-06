import tweepy
import json
from pymongo import MongoClient
from config import *
from time import time

print("conntecting to tweeter...")
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
print("connected!")

print("connecting to mongodb...")
mongodb_connection_string = 'mongodb://{0}:{1}'.format(db_host, db_port)
if db_auth:
    mongodb_connection_string = 'mongodb://{0}:{1}@{2}:{3}'.format(db_user, db_pass, db_host, db_port)
client = MongoClient(mongodb_connection_string)
db = client[db_name]
print("conncted!")
print("---------------------------")

# public_tweets = api.home_timeline()
# for tweet_object in public_tweets:
#     tweet = tweet_object._json
#     id = tweet['user']['id']
#     name = tweet['user']['url']
#     text = tweet['text']
#     print("{0}({1}): {2}".format(name, id, text))


# print(api.friends_ids(13058682))

# print(api.trends_closest(35.6215718, 51.3946415))

# public_tweets = api.user_timeline(13058682)
# public_tweets = api.home_timeline()
# for tweet_object in public_tweets:
#     tweet = tweet_object._json
#     id = tweet['user']['id']
#     name = tweet['user']['name']
#     text = tweet['text']
#     print("{0}({1}): {2}".format(name, id, text))

queue = db.queue.find({"status": QUEUE_NOT_CRAWLED}).limit(10)
for task in queue:
    print("task {0}".format(task['_id']))
    print("crawling person -> {0}".format(task['tw_id']))
    user = api.get_user(task['tw_id'])
    user_json = user._json
    print("crawled: {0}".format(user.name))
    person_id = db.person.insert(user_json)
    print("inserted in db -> {0}".format(person_id))