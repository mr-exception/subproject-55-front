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

delays = {
    'followers': 0,
    'friends': 0,
    'persons': 0
}

def wait_for(op):
    global delays
    mydelay = delays
    if mydelay[op] < time() - 60:
        mydelay[op] = time()
        # print(mydelay)
        return
    else:
        print('waiting {} seconds for {}'.format((61-(time()-mydelay[op])), op))
        sleep(61 - (time() - mydelay[op]))
        mydelay[op] = time()
        # print(delays)
    delays = mydelay

def get_and_save_all_followers(user_id):
    users = []
    for i, user in enumerate(tweepy.Cursor(api.followers, id=user_id, count=200).pages()):
        users += user
        print('Getting page {} for followers, (total: {})'.format(i, len(users)))
        wait_for('followers')

    count = 0
    for user in users:
        user_json = user._json
        
        if db.person.count({"id": user_json["id"]}) == 0:
            person_id = db.person.insert(user_json)
        else:
            person_id = db.person.update({"id": user_json["id"]}, user_json)
        
        if db.queue.count({'tw_id': user_json['id'], 'type': 'PERSON'}) == 0:
            count += 1
            db.queue.insert({
                'tw_id': user_json['id'],
                'type': 'PERSON',
                'last_fetch': 0,
                'status': QUEUE_NOT_CRAWLED
            })
        if db.follow.count({"from_tw_id": user_json['id'], "to_tw_id": user_id}) == 0:
            db.follow.insert({
                "from_tw_id": user_json['id'],
                "to_tw_id": user_id
            })

    print('+{} task added'.format(count))

def get_and_save_all_friends(user_id):
    ids = api.friends_ids(user_id)
    wait_for('friends')
    count = 0
    for person_id in ids:
        count += 1
        if db.queue.count({'tw_id': person_id, 'type': 'PERSON'}) == 0:
            db.queue.insert({
                'tw_id': person_id,
                'type': 'PERSON',
                'last_fetch': 0,
                'status': QUEUE_NOT_CRAWLED
            })
        if db.follow.count({"to_tw_id": user_json['id'], "from_tw_id": user_id}) == 0:
            db.follow.insert({
                "to_tw_id": user_json['id'],
                "from_tw_id": user_id
            })
    print("+{} task added".format(count))

try:
    queue = db.queue.find({'status': QUEUE_NOT_CRAWLED, 'last_fetch': {'$lt': time() - crawl_period}}).limit(10)
    for task in queue:
        print('task {0}'.format(task['_id']))
        print('crawling person -> {0}'.format(task['tw_id']))
        user = api.get_user(task['tw_id'])
        wait_for('persons')
        user_json = user._json
        print('crawled: {0}'.format(user.name))
        print('link: {0}'.format(user._json['url']))

        person_id = 0
        if db.person.count({"id": user_json["id"]}) == 0:
            person_id = db.person.insert(user_json)
        else:
            person_id = db.person.update({"id": user_json["id"]}, user_json)

        print('fetching all F&F of {0} into queue...'.format(user_json['id']))
        
        get_and_save_all_followers(user_json['id'])
        get_and_save_all_friends(user_json['id'])

        db.queue.update({'_id': task['_id']}, {'$set': {'status': QUEUE_CRAWLED, 'last_fetch': time()}})

except RateLimitError as e:
    # print("Request Queue is full now!")
    print(e)
except TweepError as e:
    # print("Auth error!")
    print(e)