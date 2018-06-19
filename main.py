import numpy as np
import math
from random import random as rnd
import real
import present

neighbour_max_dst = 2

avg_scoring_wight = 1
avg_scoring_dplen = 2

positive_data, negative_data = present.load_cases()
def fresh_cases():
    global positive_data, negative_data
    pd, nd = present.load_cases()
    positive_data = pd
    negative_data = nd

def get_index(param, data):
    index = -1
    for i in range(0, len(data)):
        # print('{} ? {}'.format(data[i][0], param))
        if data[i][0] > param:
            index = i
            break
    return index


def avg_scoring(param):
    global avg_scoring_wight, avg_scoring_dplen, positive_data, negative_data
    
    positive_index = get_index(param,positive_data)
    min_positive_index = max(positive_index-neighbour_max_dst-1, 0)
    max_positive_index = min(positive_index+neighbour_max_dst, len(negative_data))

    positive_neighbours = np.asarray(positive_data[min_positive_index:max_positive_index])
    print(positive_data)
    print(positive_index)
    print(positive_neighbours)
    negative_index = get_index(param,negative_data)
    min_negative_index = max(negative_index-neighbour_max_dst-1, 0)
    for i in range(0, min_negative_index):
        if negative_data[i][0] == param:
            min_negative_index = i
            break

    max_negative_index = min(negative_index+neighbour_max_dst, len(negative_data))
    for i in range(max_negative_index+1, len(negative_data)):
        if negative_data[i][0] > param:
            max_negative_index = i
            break
    
    # print(min_negative_index, max_negative_index)
    negative_neighbours = np.asarray(negative_data[min_negative_index:max_negative_index])
    
    # print(negative_neighbours)


    result = np.zeros(2**real.output_size, int)
    if len(positive_neighbours) == 0:
        print('null positive sign')
        random_index = int(rnd() * 2**real.output_size)
        for i in range(max(random_index-avg_scoring_dplen,0), min(random_index-avg_scoring_dplen,2**real.output_size)):
            result[i] += avg_scoring_wight
    else:
        print('found positive sign')
        avg = np.average(positive_neighbours[:,1])
        result = np.zeros(2**real.output_size, int)
        for i in range(0, (2**real.output_size)):
            if i >= avg-avg_scoring_dplen and i <= avg+avg_scoring_dplen:
                result[i] = avg_scoring_wight

    if len(negative_neighbours) != 0:
        print('found negative sign')
        for nn in negative_neighbours:
            result[nn[1]] -= avg_scoring_wight

    return result

def get_gray_codes(param, dpt=1):
    binary_param = np.binary_repr(param, real.input_size)
    grays = []
    for i in range(0, real.input_size):
        gray_code = list(binary_param)
        if gray_code[i] == '1':
            gray_code[i] = '0'
        else:
            gray_code[i] = '1'
        gray_code = int("".join(gray_code), 2)
        grays.append(gray_code)
        if dpt > 1:
            grays += gray_scoring(gray_code, dpt-1)
    return grays



def get_sample(weights):
    max_weight = 0
    for i in range(0, len(weights)):
        if max_weight < weights[i]:
            max_weight = weights[i]
    answers = []
    for i in range(0, len(weights)):
        if max_weight == weights[i]:
            answers.append(i)
    return answers[int(rnd()*len(answers))]

def calc(param):
    weights = np.zeros(2**real.output_size, int)
    # print(index)
    weights += avg_scoring(param)
    
    return get_sample(weights)

if __name__ == '__main__':
    print(calc(int('110101',2)))