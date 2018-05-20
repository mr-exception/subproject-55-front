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
    task_count = db.queue.count({, 'last_fetch_friend': {'$lt': time() - crawl_period}})
    print("total task numbers: {0}".format(task_count))
    queue = db.queue.find({, 'last_fetch_friend': {'$lt': time() - crawl_period}})
    for task in queue:
        print('task {0}'.format(task['_id']))
        print('crawling person -> {0}'.format(task['tw_id']))
        
        ids = api.friends_ids(task['tw_id'])
        count = 0
        for person_id in ids:
            count += 1
            if db.queue.count({'tw_id': person_id, 'type': 'PERSON'}) == 0:
                db.queue.insert({
                    'tw_id': person_id,
                    'type': 'PERSON',
                    'last_fetch_person': time(),
                    'last_fetch_follow': 0,
                    'last_fetch_friend': 0,
                    
                })
            if db.follow.count({"to_tw_id": person_id, "from_tw_id": task['tw_id']}) == 0:
                db.follow.insert({
                    "to_tw_id": person_id,
                    "from_tw_id": task['tw_id']
                })
        print("+{} task added".format(count))
        sleep(60)
        db.queue.update({'_id': task['_id']}, {'$set': {'last_fetch_friend': time()}})

except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)