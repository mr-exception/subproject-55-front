import numpy as np
from matplotlib import pyplot as plt
from pymongo import MongoClient
client = MongoClient()
db = client.tina


def show(param, target):
    t_inputs, t_outputs, f_inputs, f_outputs = load()
    plt.figure()
    plt.scatter(t_inputs, t_outputs, color='green', label='inner', alpha=0.5)
    plt.scatter(f_inputs, f_outputs, color='red', label='outer', alpha=0.5)
    plt.scatter([param], [target], color='yellow', label='outer', alpha=0.5)
    plt.title('Alcohol and Malic Acid content of the wine dataset')
    plt.xlabel('Alcohol')
    plt.ylabel('Malic Acid')
    plt.legend(loc='upper left')
    plt.grid()
    plt.tight_layout()
    plt.show()

for event in db['events'].find({}).limit(10):
    print(event)