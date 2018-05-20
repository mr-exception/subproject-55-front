import tweepy
import json
from pymongo import MongoClient
from config import *
from time import time, sleep
from tweepy.error import RateLimitError, TweepError

print('conntecting to tweeter...')
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
print('connected!')

print('connecting to mongodb...')
mongodb_connection_string = 'mongodb://{0}:{1}'.format(db_host, db_port)
if db_auth:
    mongodb_connection_string = 'mongodb://{0}:{1}@{2}:{3}'.format(db_user, db_pass, db_host, db_port)
client = MongoClient(mongodb_connection_string)
db = client[db_name]
print('conncted!')
print('---------------------------')

try:
    timeline = api.home_timeline()
    print("got {} new statuses".format(len(timeline)))
    for tweet in timeline:
        tweet_json = tweet._json
        print(tweet_json['text'])
        if db.person.count({'tw_id': tweet_json['user']['id']}) != 0:
            print("person exists")
            person = db.person.find_one({'tw_id': tweet_json['user']['id']})
            
            db.person.update({'_id': person['_id']}, tweet_json['user'])
            db.queue.update({'_id': person['_id']}, {'$set': {'last_fetch_person': time()}})

            del tweet_json['user']
            tweet_json['person_id'] = person['_id']

            if db.tweet.count({'tw_id': tweet_json['id']}) != 0:
                db.tweet.update({'tw_id': tweet_json['id']}, tweet_json)
            else:
                db.tweet.insert({tweet_json})
            print('+new tweet inserted')
        else:
            print("person inserted")
            db.person.insert(tweet_json['user'])
            if db.queue.count({'tw_id': tweet_json['user']}) != 0:
                db.queue.update({'_id': person['_id']}, {'$set': {'last_fetch_person': time()}})
            else:
                db.queue.insert({
                    'tw_id': person_id,
                    'type': 'PERSON',
                    'last_fetch_person': time(),
                    'last_fetch_follow': 0,
                    'last_fetch_friend': 0,
                })
            print('+new tweet inserted')

except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)