from random import random as rnd
from logic import Logic
from workspace import WorkSpace
# first we have to define the problem. okay! it's about light in a room. we have to define a machine that gets the hour as input and decides light lamp to be off or on
# input: a variable for 24 hours. it's a 5bit input
input_size = 5
inputs = []
for i in range(input_size):
    inputs.append(False)
# output: lights => on/off so it's a 1bit output
output_size = 1
outputs = []
for i in range(output_size):
    outputs.append(False)
# memory: i think we don't need memory here
memory_size = 0
memorys = []
for i in range(memory_size):
    memorys.append(False)

total_workspace_length = input_size + output_size + memory_size

# main rule: between 18 to 24 and 0 to 6 light is on, otherwise is off


# logic stack
def bitsToDecimal(bits):
    output = 0
    for i, v in enumerate(bits):
        res = 2**i
        if v:
            output += res
    return output


logic_stack = []
for i in range(0):
    logic_stack.append(
        Logic(
            (int)(rnd() * total_workspace_length),
            (int)(rnd() * total_workspace_length),
            [rnd() > 0.5, rnd() > 0.5, rnd() > 0.5],
            (int)(rnd() * total_workspace_length),
        ))


def resultScore(ws):
    out = ws.getOutputDecimal()
    inp = ws.getInputDecimal()

    if (inp >= 0 and inp <= 6) or (inp >= 18 and inp <= 23):
        return 1 - out
    else:
        return 0 - out


def runTest():
    inputs = []
    for _ in range(input_size):
        inputs.append(rnd() >= 0.5)
    print(f"input:\t\t\t{bitsToDecimal(inputs)}")
    # running units
    ws = WorkSpace(inputs, [False], [])
    for logic in logic_stack:
        ws.setBit(logic.output, logic.runUnit(ws))
    print(
        f"result redun: {resultScore(ws)}\t=>\t{ws.getOutputDecimal()}"
    )


for i in range(5):
    print(f"test #{i}")
    runTest()
