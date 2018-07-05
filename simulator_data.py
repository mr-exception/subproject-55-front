from random import random as rnd
from pymongo import MongoClient
client = MongoClient()
db = client.tina

materials = {
    'm0': 100.00,
    'm1': 120.00,
    'm2': 80.00,
    'm3': 90.00,
}

units = {
    'u0': 20.00,
    'u1': 18.00,
    'u2': 15.00,
    'u3': 17.00,
    'u4': 14.00,
    'u5': 22.00,
}

material_importers = {
    'm0': ['u0', 'u1'],
    'm1': ['u1'],
    'm2': ['u0', 'u2'],
    'm3': ['u3', 'u5'],
    'm4': ['u2'],
}

material_users = {
    'm0': ['u5', 'u4'],
    'm1': ['u1', 'u2',],
    'm2': ['u2'],
    'm3': ['u0'],
    'm4': ['u3', 'u4'],
}

def insert_event_in_db(date):
    global units, users, material_importers, material_users, db
    for m in materials:
        db['materials'].insert({
            'title': m,
            'value': materials[m],
            'date': date
        })
    for u in units:
        db['units'].insert({
            'title': u,
            'value': units[u],
            'date': date
        })

def single_change_in_material():
    global materials, importers, users, material_importers, material_users
    material_index = 'm{}'.format(int(rnd() * len(materials)))
    # print('material index: {}'.format(material_index))
    material_current_cost = materials[material_index]
    # print('material current cost {}'.format(material_current_cost))
    change = int(rnd() * 100) - 50
    # print('cost change {}'.format(change))
    material_final_cost = material_current_cost + change
    # print('material final cost: {}'.format(material_final_cost))
    change_rate = float(change/material_current_cost)
    # print('change rate: {}'.format(change_rate))

    # effects on units and users
    # print('======================')
    # print('effects on units')
    effected_units = material_importers[material_index]
    for unit in effected_units:
        current = units[unit]
        final = current * change_rate
        units[unit] = final
        # print('unit {} cost changed from {} to {}'.format(unit, current, final))

insert_event_in_db(0)
for i in range(1, 2000):
    for step in range(0, 5):
        single_change_in_material()

    insert_event_in_db(i)
