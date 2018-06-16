import numpy as np
import math
from random import random as rnd
import real
import present

neighbour_max_dst = 5

avg_scoring_wight = 1
avg_scoring_dplen = 2

positive_data, negative_data = present.load_cases()


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
    positive_neighbours = np.asarray(positive_data[max(positive_index-neighbour_max_dst-1, 0):min(positive_index+neighbour_max_dst, len(positive_data)-1)])

    avg = np.average(positive_neighbours[:,1])
    result = np.zeros(2**real.output_size, int)
    for i in range(0, (2**real.output_size)):
        if i >= avg-avg_scoring_dplen and i <= avg+avg_scoring_dplen:
            result[i] = avg_scoring_wight
    
    negative_index = get_index(param,negative_data)
    negative_neighbours = np.asarray(negative_data[max(negative_index-neighbour_max_dst-1, 0):min(negative_index+neighbour_max_dst, len(negative_data)-1)])
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

# gray_scoring(5, 2)