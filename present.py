import numpy as np
from matplotlib import pyplot as plt

def load():
    t_inputs = []
    t_outputs = []
    f_inputs = []
    f_outputs = []

    sample_content = open('data.txt', 'r').read().split('\n')
    for i in range(0, len(sample_content)):
        parts = sample_content[i].split(':')
        sample_content[i] = (int(parts[0]), int(parts[1]), int(parts[2]))
    sample_content.sort()
    for line in sample_content:
        if line[2] == 1:
            t_inputs.append(line[0])
            t_outputs.append(line[1])
        else:
            f_inputs.append(line[0])
            f_outputs.append(line[1])
    return t_inputs, t_outputs, f_inputs, f_outputs

def load_cases():
    positive_data = []
    negative_data = []

    sample_content = open('data.txt', 'r').read().split('\n')
    for i in range(0, len(sample_content)):
        parts = sample_content[i].split(':')
        sample_content[i] = (int(parts[0]), int(parts[1]), int(parts[2]))
    sample_content.sort()
    # print(sample_content)
    for line in sample_content:
        if line[2] == 1:
            positive_data.append((line[0], line[1]))
        else:
            negative_data.append((line[0], line[1]))

    return positive_data, negative_data

def test(test_cases):
    t_inputs, t_outputs, f_inputs, f_outputs = load()
    plt.title("Matplotlib demo") 
    plt.xlabel("x axis caption") 
    plt.ylabel("y axis caption") 
    plt.plot(t_inputs,t_outputs, '.')
    plt.plot(f_inputs,f_outputs, '.')

    test_inputs = []
    test_outputs = []
    test_cases.sort()
    for i in range(0, len(test_cases)):
        test_inputs.append(test_cases[i][0])
        test_outputs.append(test_cases[i][1])
    
    plt.plot(test_inputs, test_outputs, '.')
    plt.show()

load_cases()