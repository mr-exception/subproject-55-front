# side script
# title: connect follow units to person object id
# this script uses relations in follow collection and checks if one of users are crawled from tweeter
# adds the person ObjectId to follow
import json
from pymongo import MongoClient
from config import *

print('connecting to mongodb...')
mongodb_connection_string = 'mongodb://{0}:{1}'.format(db_host, db_port)
if db_auth:
    mongodb_connection_string = 'mongodb://{0}:{1}@{2}:{3}'.format(db_user, db_pass, db_host, db_port)
client = MongoClient(mongodb_connection_string)
db = client[db_name]
print('conncted!')

for follow in db.follow.find({}):
    if not ('from_id' in follow):
        if db.person.count({'id': follow['from_tw_id']}) == 1:
            person = db.person.find({'id': follow['from_tw_id']})[0]
            follow['from_id'] = person['_id']
    if not ('to_id' in follow):
        if db.person.count({'id': follow['to_tw_id']}) == 1:
            person = db.person.find({'id': follow['to_tw_id']})[0]
            follow['to_id'] = person['_id']
    db.follow.update({'_id': follow['_id']}, follow)
    print(follow)