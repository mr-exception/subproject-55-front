import math


def calculate(inp, train_data):
    dists = [0, 0]
    counts = [0, 0]
    for rec in train_data:
        dist = math.sqrt(
            math.pow(inp[0]-rec['x'][0], 2) + math.pow(inp[1]-rec['x'][1], 2))
        if dist < 5:
            dists[rec['r']] += dist
            counts[rec['r']] += 1
    for i in range(0, len(dists)):
        if dists[i] > 0:
            dists[i] /= counts[i]
    best_index = 0
    best_r = dists[0]
    for i in range(1, len(dists)):
        if best_r > dists[i]:
            best_index = i
            best_r = dists[i]
    return best_index
