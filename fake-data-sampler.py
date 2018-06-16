import numpy as np
import math
from random import random as rnd
import real
samples_count = 1000
hate_rate = 0.5
hate_offset = 25
hate_limit = 50

def generate_sample_string():
    if rnd() > hate_rate:
        input_var = int(rnd()* 2**real.input_size)
        original_output_var = real.calc(input_var)
        if rnd() > 0.5:
            hate_output_var = min(int(rnd()*hate_limit) + hate_offset + original_output_var, 2**real.output_size-1)
            return '{}:{}:0'.format(input_var, hate_output_var)
        else:
            hate_output_var = max(original_output_var - (int(rnd()*hate_limit) + hate_offset), 0)
            return '{}:{}:0'.format(input_var, hate_output_var)
    else:
        input_var = int(rnd()* 2**real.input_size)
        output_var = real.calc(input_var)
        return '{}:{}:1'.format(input_var, output_var)

output = open('data.txt', 'w+')

output.write(generate_sample_string())
for i in range(1, samples_count):
    output.write('\n')
    output.write(generate_sample_string())

output.close()

