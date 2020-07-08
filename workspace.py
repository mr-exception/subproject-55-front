class WorkSpace:
  inputs = []
  outputs = []
  memory = []
  data = []
  original= []

  def __init__(self, inputs, outputs, memory):
    self.inputs = inputs[:]
    self.outputs = outputs[:]
    self.memory = memory[:]
    self.data = inputs + memory + outputs
    self.original = inputs + memory + outputs

  def getBit(self, position):
    return self.data[position]

  def setBit(self, position, value):
    self.data[position] = value

  def getSize(self):
    return len(self.data)

  def getInputDecimal(self):
      input = 0
      for i, v in enumerate(self.inputs):
          res = 2**i
          if v:
              input += res
      return input

  def getOutputDecimal(self):
      output = 0
      for i, v in enumerate(self.data[len(self.inputs + self.memory):]):
          res = 2**i
          if v:
              output += res
      return output
  
  def toString(self):
    return self.data
