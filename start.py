# first step: you have to learn 2x - 3y < 15
from random import random as rand
from time import sleep
import matplotlib.animation as animation
import matplotlib.pyplot as plt
import math
import core
# generate train data
data = []
data = []
for i in range(0, 1500):
    x = (int)(rand() * 100 - 50)
    y = (int)(rand() * 100 - 50)
    if (x+20)*(x+20) + y*y < 500:
        data.append({
            'x': [x, y],
            'r': 1
        })
    else:
        data.append({
            'x': [x, y],
            'r': 0
        })
tests = []


def add_random_test(count):
    for i in range(0, count):
        x = (int)(rand() * 20 - 10)
        y = (int)(rand() * 20 - 10)
        tests.append({
            'x': [x, y],
        })


add_random_test(100)
# calculate the tests

for test in tests:
    r = core.calculate(test['x'], data)
    data.append({
        'x': test['x'],
        'r': r
    })

# visualize the train data
fig, ax = plt.subplots()

# add_random_test()
# ax.clear()
colors = ['#FF0000', '#00FF00', '#0000FF']
for rec in data:
    # print(rec)
    ax.scatter(rec['x'][0], rec['x'][1], c=colors[rec['r']], s=10,
               alpha=0.3, edgecolors='none')
# for i in range(0, len(tests)):
#     ax.scatter(tests[i]['x'][0], tests[i]['x'][1], c='#55AA33', s=20,
#                alpha=0.3, edgecolors='none')


ax.legend()
ax.grid(True)
plt.show()
