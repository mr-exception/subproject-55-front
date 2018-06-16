import numpy as np
import math
from random import random as rnd
import real
import present
import main
# sample input to test
sum_of_distances = 0
tests_count = 20

test_cases = []

def single_test():
    global sum_of_distances, test_inputs, test_outputs
    sample_input = int(rnd() * (2**real.input_size))

    calculated_result = main.calc(sample_input)
    test_cases.append((sample_input, calculated_result))

    real_result = real.calc(sample_input)
    sum_of_distances += np.abs(calculated_result-real_result)

for i in range(0, tests_count):
    single_test()

error_avg = sum_of_distances/tests_count

bits = 2**real.output_size
acc = 1-(error_avg / bits)
print('acc: {}'.format(acc))
present.test(test_cases)
