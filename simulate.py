from random import random as rnd
from logic import Logic,Prog
from workspace import WorkSpace
# inputs
input_size = 1
inputs = []
for i in range(input_size):
  inputs.append(False)
# output
output_size = 1
outputs = []
for i in range(output_size):
  outputs.append(False)
# memory
memory_size = 0
memorys = []
for i in range(memory_size):
  memorys.append(False)

total_workspace_length = input_size + output_size + memory_size

# main rule: output = input
def bitsToDecimal(bits):
  output = 0
  for i, v in enumerate(bits):
    res = 2**i
    if v:
      output += res
  return output

def suggestVar():
  # if rnd() < 0.5:
  #   return -1
  return (int)(rnd() * total_workspace_length)

def resultScore(ws):
  out = ws.getOutputDecimal()
  inp = ws.getInputDecimal()
  # print(f"{inp} - {out}")
  return inp - out

def runTest(logic_stack):
  inputs = []
  for _ in range(input_size):
    inputs.append(rnd() >= 0.5)
  decimal_input = bitsToDecimal(inputs)
  # running units
  ws = WorkSpace(inputs, [False], [])
  for logic in logic_stack:
    ws.setBit(logic.output, logic.runUnit(ws))
  
  result = resultScore(ws)
  # print(
  #   f"result accr: {result}\t=>\tf({decimal_input}) = {ws.getOutputDecimal()}"
  # )
  return result, [decimal_input, ws.getOutputDecimal(), ws]

while True:
  # logic stack
  logic_stack = []
  for i in range(1):
    # prog = Prog(True, True, 'and')
    # logic_stack.append(Logic(0, 0, prog, 1))
    prog = Prog
    prog.op_a = rnd() > 0.5
    if rnd() > 0.5:
      prog.op = 'and'
    else:
      prog.op = 'or'
    prog.op_b = rnd() > 0.5
    logic_stack.append(
      Logic(
        suggestVar(),
        suggestVar(),
        prog,
        suggestVar(),
      ))


  tests_count = 10
  accr = 0
  tests = []
  for i in range(tests_count):
    res,test = runTest(logic_stack)
    accr += res
    tests.append(test)
  print(f"after {tests_count} test: {accr}")
  # print("logic stack:")
  # for i,logic in enumerate(logic_stack):
  #   print(f"{i}: {logic.toString()}")
  if accr == 0:
    print("logic stack:")
    for i,logic in enumerate(logic_stack):
      print(f"{i}: {logic.toString()}")
    for test in tests:
      print(f"{test[0]} => {test[1]} ({test[2].original})")
    break
  # break

