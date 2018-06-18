import numpy as np
import real

def int_to_binary_list(n, size):
    binary = list(np.binary_repr(n, size))
    for i in range(0, size):
        if binary[i] == '1':
            binary[i] = 1
        else:
            binary[i] = 0
    return binary

def all_possible_neuron(size):
    results = []
    for i in range(0, 2**size):
        results.append(np.binary_repr(i, size))
    return np.asarray(results)

def get_weights_level_zero(size):
    numbers = all_possible_neuron(real.input_size)
    matrix = []
    for ps in numbers:
        weights = []
        for p in list(ps):
            if p == '1':
                weights.append(1)
            else:
                weights.append(0)
        matrix.append(weights)
    return np.asarray(matrix)

def get_weights_level_one(size):
    return np.ones(2**size).reshape(1,2**size)

def get_baias_level_zero(size):
    return np.zeros(2**size)
def get_baias_level_one(size):
    return np.zeros(size)


def calc(param):
    param = int_to_binary_list(param, real.input_size)
    
    weights_zero = get_weights_level_zero(real.input_size)
    baias_zero = get_baias_level_zero(real.input_size)

    results = param * weights_zero
    for i in range(0,len(results)):
        r = baias_zero[i]
        for c in results[i]:
            r += c
        results[i] = r

    weights_one = get_weights_level_one(real.input_size)
    baias_one = get_baias_level_one(real.input_size)

    results = results * weights_one
    for i in range(0,len(results)):
        r = baias_one[i]
        for c in results[i]:
            r += c
        results[i] = r
    
    return results
    

print(calc(5))

# a = np.asarray([2, 2, 2])
# b = np.asarray([
#     [2, 2],
#     [3, 3],
#     [4, 4],
# ])
# b = b.reshape([2, ])
# print(a*b)