# side script
# title: sync neo4j nodes with mongodb collections
# this script syncronize the neo4j database with noe4j and updates the graph

from config import *
from py2neo import Graph, Node, Relationship
import json
from pymongo import MongoClient

print('connecting to mongodb...')
mongodb_connection_string = 'mongodb://{0}:{1}'.format(db_host, db_port)
if db_auth:
    mongodb_connection_string = 'mongodb://{0}:{1}@{2}:{3}'.format(db_user, db_pass, db_host, db_port)
client = MongoClient(mongodb_connection_string)
db = client[db_name]
print('conncted!')

print('connecting to neo4j....')
graph = Graph(password=nj_password)
print('connected!')

def person_exists(tw_id):
    result = graph.run('match (n:Person {tw_id: "'+ str(tw_id) +'"}) return count(n) as c')
    result.forward()
    return result.current()['c'] != 0

def follow_exists(tw_id_f, tw_id_t):
    result = graph.run('match (a:Person {tw_id: "'+ str(tw_id_f) +'"})-[b:Follow]->(c:Person {tw_id: "'+ str(tw_id_t) +'"}) return count(b) as c')
    result.forward()
    return result.current()['c'] != 0

person_count = 0
for person in db.person.find({}):
    result = graph.run('match (n:Person {tw_id: "'+ str(person['id']) +'"}) return count (n) as c')
    result.forward()
    if result.current()['c'] == 0:
        person_count += 1
        graph.run('create (n:Person {tw_id: "' + str(person['id']) + '", _id: "'+ str(person['_id']) +'", name: "'+ str(person['name']) +'", screen_name: "'+ str(person['screen_name']) +'"}) return n')
        # print('added new person')
print("{} person nodes added".format(person_count))

follow_count = 0
for follow in db.follow.find({}):
    from_exists = person_exists(follow['from_tw_id'])
    to_exists = person_exists(follow['to_tw_id'])
    if from_exists and to_exists:
        if not follow_exists(follow['from_tw_id'], follow['to_tw_id']):
            follow_count += 1
            graph.run('match (n:Person {tw_id: "'+ str(follow['from_tw_id']) +'"}),(b:Person {tw_id: "'+ str(follow['to_tw_id']) +'"}) create (n)-[c:Follow]->(b) return c')
        # print("follow edge added")
print("{} follow edges added".format(follow_count))