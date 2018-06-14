import numpy as np
import math
from random import random as rnd
import real
samples_count = 100


def generate_sample_string():
    input_var = int(rnd()* 2**real.input_size)
    output_var = real.calc(input_var)
    return '{}:{}'.format(input_var, output_var)

output = open('data.txt', 'w+')

output.write(generate_sample_string())
for i in range(1, samples_count):
    output.write('\n')
    output.write(generate_sample_string())

output.close()

