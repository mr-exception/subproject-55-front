import numpy as np
from random import random as rnd

input_size = 16
output_size = 5
samples_count = 400


def generate_sample_string():
    global inputs,input_size,outputs,output_size
    output = ''
    for i in range(0, input_size):
        output += str(int(rnd()*2)%2)
    param = int(output, 2)
    output += ':'
    # print(int((np.sin(param)+1)*10))
    output += str(np.binary_repr(int(np.log(param)*5), output_size))
    return output

output = open('data.txt', 'w+')

output.write(generate_sample_string())
for i in range(1, samples_count):
    output.write('\n')
    output.write(generate_sample_string())

output.close()

