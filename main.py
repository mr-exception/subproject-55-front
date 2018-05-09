import tweepy
import json
from pymongo import MongoClient
from config import *
from time import time
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

# public_tweets = api.home_timeline()
# for tweet_object in public_tweets:
#     tweet = tweet_object._json
#     id = tweet['user']['id']
#     name = tweet['user']['url']
#     text = tweet['text']
#     print('{0}({1}): {2}'.format(name, id, text))


# print(api.friends_ids(13058682))

# print(api.trends_closest(35.6215718, 51.3946415))

# public_tweets = api.user_timeline(13058682)
# public_tweets = api.home_timeline()
# for tweet_object in public_tweets:
#     tweet = tweet_object._json
#     id = tweet['user']['id']
#     name = tweet['user']['name']
#     text = tweet['text']
#     print('{0}({1}): {2}'.format(name, id, text))
# print(time() - crawl_period)
try:
    queue = db.queue.find({'status': QUEUE_NOT_CRAWLED, 'last_fetch': {'$lt': time() - crawl_period}}).limit(10)
    for task in queue:
        print('task {0}'.format(task['_id']))
        print('crawling person -> {0}'.format(task['tw_id']))
        user = api.get_user(task['tw_id'])
        user_json = user._json
        print('crawled: {0}'.format(user.name))
        print('link: {0}'.format(user._json['url']))

        person_id = 0
        if db.person.count({"id": user_json["id"]}) == 0:
            person_id = db.person.insert(user_json)
        else:
            person_id = db.person.update({"id": user_json["id"]}, user_json)

        print('fetching all followers of {0} into queue...'.format(user_json['id']))
        
        try:
            followers = api.followers(user_json['id'])
            count = 0
            for follower in followers:
                count += 1
                # print('found {0}'.format(follower._json['id']))
                if db.queue.count({'tw_id': follower._json['id'], 'type': 'PERSON'}) == 0:
                    # print('+new task added')
                    db.queue.insert({
                        'tw_id': follower._json['id'],
                        'type': 'PERSON',
                        'last_fetch': 0,
                        'status': QUEUE_NOT_CRAWLED
                    })
            print('+{0} task added'.format(count))
            db.queue.update({'_id': task['_id']}, {'$set': {'status': QUEUE_CRAWLED, 'last_fetch': time()}})
            print('inserted in db -> {0}'.format(person_id))
            print('.........................')
        except TweepError as e:
            print(e)
            print("skipping the bunch of users")
except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)