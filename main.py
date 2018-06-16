import numpy as np
import math
from random import random as rnd
import real
import present

neighbour_max_dst = 5

avg_scoring_wight = 1
avg_scoring_dplen = 2

positive_data, negative_data = present.load_cases()


def get_index(param):
    global positive_data
    
    index = -1
    for i in range(0, len(positive_data)):
        # print('{} ? {}'.format(positive_data[i][0], param))
        if positive_data[i][0] > param:
            index = i
            break
    return index
def avg_scoring(param):
    global avg_scoring_wight, avg_scoring_dplen, positive_data
    
    index = get_index(param)
    neighbours = np.asarray(positive_data[max(index-neighbour_max_dst-1, 0):min(index+neighbour_max_dst, len(positive_data)-1)])
    avg = np.average(neighbours[:,1])
    # print(neighbours)
    result = np.zeros(2**real.output_size, int)
    for i in range(0, (2**real.output_size)):
        if i >= avg-avg_scoring_dplen and i <= avg+avg_scoring_dplen:
            result[i] = avg_scoring_wight
        else:
            result[i] = 0
    return result

def gray_scoring(param, dpt=1):
    binary_param = np.binary_repr(param, real.input_size)
    grays = []
    for i in range(0, real.input_size):
        gray_code = list(binary_param)
        if gray_code[i] == '1':
            gray_code[i] = '0'
        else:
            gray_code[i] = '1'
        # print("".join(gray_code))
        gray_code = int("".join(gray_code), 2)
        grays.append(gray_code)
        if dpt > 1:
            grays += gray_scoring(gray_code, dpt-1)
    # for g in grays:
    #     print(g)
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

gray_scoring(5, 2)