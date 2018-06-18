from sklearn.neural_network import MLPClassifier
from matplotlib import pyplot as plt
from random import random as rnd

x1 = []
y1 = []

x2 = []
y2 = []

clc = []
for a in range(0, 100):
    x = int(rnd() * 150)
    y = int(rnd() * 150)
    if x + y < 150:
        x1.append(x)
        y1.append(y)
    else:
        x2.append(x)
        y2.append(y)

samples = []
targets = []
for i in range(0, len(x1)):
    samples.append([x1[i], y1[i]])
    targets.append(0)
for i in range(0, len(x2)):
    samples.append([x2[i], y2[i]])
    targets.append(1)

clf = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(2, 2), random_state=1)
clf.fit(samples, targets)
print(clf.get_params())
print(clf.predict([
    [5, 5]

]))