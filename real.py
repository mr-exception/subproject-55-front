import numpy as np
# input size of core in bits
input_size = 16
# output size of core in bits
output_size = 8
def calc(input):
    # if input < 2**15:
    #     return 0
    # else:
    #     return 1
    return int((np.cos(input/5000)+1)*(2**(output_size-1)))