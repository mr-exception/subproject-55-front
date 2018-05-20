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
    task_count = db.queue.count({'last_fetch_follow': {'$lt': time() - crawl_period}})
    print("total task numbers: {0}".format(task_count))
    queue = db.queue.find({'last_fetch_follow': {'$lt': time() - crawl_period}})
    count = 0
    for task in queue:
        print('task {0}'.format(task['_id']))
        print('crawling person -> {0} - followers'.format(task['tw_id']))
        
        users = []
        for i, user in enumerate(tweepy.Cursor(api.followers, id=task['tw_id'], count=200).pages()):
            users += user
            print('Getting page {} for followers, (total: {})'.format(i, len(users)))
            sleep(60)

        task_count = 0
        for user in users:
            user_json = user._json
            
            if db.person.count({"id": user_json["id"]}) == 0:
                person_id = db.person.insert(user_json)
            else:
                person_id = db.person.update({"id": user_json["id"]}, user_json)
            
            if db.queue.count({'tw_id': user_json['id'], 'type': 'PERSON'}) == 0:
                task_count += 1
                db.queue.insert({
                    'tw_id': user_json['id'],
                    'type': 'PERSON',
                    'last_fetch_person': time(),
                    'last_fetch_follow': 0,
                    'last_fetch_friend': 0
                })
            if db.follow.count({"from_tw_id": user_json['id'], "to_tw_id": task['tw_id']}) == 0:
                db.follow.insert({
                    "from_tw_id": user_json['id'],
                    "to_tw_id": task['tw_id']
                })

        print('+{} task added'.format(task_count))

        count += 1
        print("followers crawled (total: {}). waiting for another request...".format(count))
        db.queue.update({'_id': task['_id']}, {'$set': {'last_fetch_follow': time()}})
        

except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)