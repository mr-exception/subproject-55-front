import numpy as np
from matplotlib import pyplot as plt

inputs = []
outputs = []

sample_content = open('data.txt', 'r').read().split('\n')
sample_content.sort()
for line in sample_content:
    parts = line.split(':')
    inputs.append(int(parts[0], 2))
    outputs.append(int(parts[1], 2))

plt.title("Matplotlib demo") 
plt.xlabel("x axis caption") 
plt.ylabel("y axis caption") 
plt.plot(inputs,outputs) 
plt.show()