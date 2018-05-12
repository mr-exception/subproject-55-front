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
    queue = db.queue.find({'status': QUEUE_NOT_CRAWLED, 'last_fetch_person': {'$lt': time() - crawl_period}}).limit(10)
    for task in queue:
        print('task {0}'.format(task['_id']))
        print('crawling person -> {0}'.format(task['tw_id']))
        user = api.get_user(task['tw_id'])
        user_json = user._json
        print('crawled: {0}'.format(user.name))
        print('link: {0}'.format(user._json['url']))
        print('screen name: {0}'.format(user._json['screen_name']))
        person_id = 0
        if db.person.count({"id": user_json["id"]}) == 0:
            person_id = db.person.insert(user_json)
        else:
            person_id = db.person.update({"id": user_json["id"]}, user_json)

        db.queue.update({'_id': task['_id']}, {'$set': {'status': QUEUE_CRAWLED, 'last_fetch_person': time()}})
        print("person crawled. waiting for another request...")
        sleep(60)

except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)