import numpy as np
import math
from random import random as rnd
import real
import present
# average area
avg_area = 1

data = open('data.txt', 'r').read().split('\n')
for i in range(0, len(data)):
    parts = data[i].split(':')
    data[i] = (int(parts[0]), int(parts[1]))
data.sort()
# sample input to test
sum_of_distances = 0
tests_count = 20

test_cases = []

def single_test():
    global sum_of_distances, test_inputs, test_outputs
    sample_input = int(rnd() * (2**real.input_size))

    index = -1
    for i in range(0, len(data)):
        if data[i][0] > sample_input:
            index = i
            break

    ns = 0
    c = 0
    for i in range(index-5, index+5):
        if i>= 0 and i<len(data):
            ns += data[i][1]
            c += 1
    ns /= c
    test_cases.append((sample_input, ns))

    real_result = real.calc(sample_input)
    sum_of_distances += np.abs(ns-real_result)

for i in range(0, tests_count):
    single_test()

error_avg = sum_of_distances/tests_count

bits = 2**real.output_size
acc = 1-(error_avg / bits)
print('acc: {}'.format(acc))
present.test(test_cases)
