from random import random as rand
import math

data = [
  {
    'x': [1, -1, -1, -1],
    'd': 1
  },
  {
    'x': [1, 1, -1, -1],
    'd': -1
  },
  {
    'x': [1, 1, 1, 1],
    'd': 1
  },
]


w = [0, 0, 0, 0]

t = 0
for step in range(0, 4):
  w_old = w.copy()
  for row in data:
    
    print('step {}'.format(t))
    t += 1

    print(w)
    result = row['x'][0] * w[0] + row['x'][1] * w[1] + row['x'][2] * w[2] + row['x'][3] * w[3]
    error = (result - row['d'])
    print('error: {} : {}'.format(result, row['d']))
    if error < 0:
      print('+++++++++++')
      w[0] += row['x'][0]
      w[1] += row['x'][1]
      w[2] += row['x'][2]
      w[3] += row['x'][3]
    if error > 0:
      print('-----------')
      w[0] -= row['x'][0]
      w[1] -= row['x'][1]
      w[2] -= row['x'][2]
      w[3] -= row['x'][3]
    print(w)
    print('=======================================')
  # success = True
  # print('================')
  # print(w_old)
  # print(w)
  # for i in range(0, len(w)):
  #   if w[i] != w_old[i]:
  #     success = False
  # if success:
  #   break

# print(w)