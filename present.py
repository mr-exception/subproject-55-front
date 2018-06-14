import numpy as np
from matplotlib import pyplot as plt

def test(test_cases):
    inputs = []
    outputs = []

    sample_content = open('data.txt', 'r').read().split('\n')
    for i in range(0, len(sample_content)):
        parts = sample_content[i].split(':')
        sample_content[i] = (int(parts[0]), int(parts[1]))
    sample_content.sort()
    for line in sample_content:
        inputs.append(line[0])
        outputs.append(line[1])

    plt.title("Matplotlib demo") 
    plt.xlabel("x axis caption") 
    plt.ylabel("y axis caption") 
    plt.plot(inputs,outputs)

    test_inputs = []
    test_outputs = []
    test_cases.sort()
    for i in range(0, len(test_cases)):
        test_inputs.append(test_cases[i][0])
        test_outputs.append(test_cases[i][1])
    
    plt.plot(test_inputs, test_outputs)
    plt.show()
