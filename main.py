import numpy as np
import math
from random import random as rnd
import real
import present

neighbour_max_dst = 5

avg_scoring_wight = 1
avg_scoring_dplen = 1

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
    result = np.zeros(2**real.output_size, int)

    positive_avg = 0
    positive_avg_count = 0
    for pd in positive_data:
        if abs(pd[0] - param) < neighbour_max_dst:
            positive_avg += pd[1]
            positive_avg_count += 1
    if positive_avg_count == 0:
        positive_avg = int(rnd() * real.output_size)
    else:
        positive_avg = int(positive_avg/positive_avg_count)
    if positive_avg_count == 0:
        print('null positive sign')
        random_index = int(rnd() * 2**real.output_size)
        for i in range(max(random_index-avg_scoring_dplen,0), min(random_index-avg_scoring_dplen,2**real.output_size)):
            result[i] += avg_scoring_wight
    else:
        print('found positive sign')
        print(range(max(positive_avg - avg_scoring_dplen+1, 0), min(positive_avg + avg_scoring_dplen-1, 2**real.input_size)))
        for i in range(max(positive_avg - avg_scoring_dplen, 0), min(positive_avg + avg_scoring_dplen, 2**real.input_size)):
            result[i] = avg_scoring_wight

    for nd in negative_data:
        if abs(nd[0] - param) < neighbour_max_dst:
            result[nd[1]] -= avg_scoring_wight

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