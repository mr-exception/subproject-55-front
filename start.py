from random import random as rnd
from logic import Logic
from workspace import WorkSpace

# inputs
input_size = 8
inputs = []
for i in range(input_size):
    inputs.append(rnd() > 0.5)
# outputs
output_size = 8
outputs = []
for i in range(output_size):
    outputs.append(rnd() > 0.5)
# memory
memory_size = 16
memory = []
for i in range(memory_size):
    memory.append(rnd() > 0.5)

workspace = WorkSpace(inputs, outputs, memory)
print(f"workspace initialized. (size: {workspace.getSize()})")


# logic stack
logic_stack = []

for i in range(999):
    logic_stack.append(Logic(
        (int)(rnd() * workspace.getSize()),
        (int)(rnd() * workspace.getSize()),
        [rnd() > 0.5, rnd() > 0.5, rnd() > 0.5],
        (int)(rnd() * workspace.getSize()),
    ))

# running units
print(inputs)
for logic in logic_stack:
    workspace.setBit(logic.output, logic.runUnit(workspace))

print(workspace.getOutputDecimal())
