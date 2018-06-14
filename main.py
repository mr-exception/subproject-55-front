import numpy as np
import math
from random import random as rnd
# input size of core in bits
input_size = 16
# output size of core in bits
output_size = 5
# average area
avg_area = 1

# sample input to test
sample_input = int(rnd() * (2**input_size))
print('sample input: {}'.format(sample_input))

data = open('data.txt', 'r').read().split('\n')
for i in range(0, len(data)):
    parts = data[i].split(':')
    data[i] = (int(parts[0]), int(parts[1]))
data.sort()

index = -1
for i in range(0, len(data)):
    if data[i][0] > sample_input:
        index = i
        break

ns = 0
c = 0
for i in range(index-5, index+5):
    if i>= 0 and i<=len(data):
        ns += data[i][1]
        c += 1
ns /= c

real_result = int((np.sin(sample_input/5000)+1)*16)

print('suggested result is: {}'.format(ns))
print('real result is: {}'.format(real_result))