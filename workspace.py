class WorkSpace:
    inputs = []
    outputs = []
    memory = []

    def __init__(self, inputs, outputs, memory):
        self.inputs = inputs
        self.outputs = outputs
        self.memory = memory

    def getBit(self, position):
        if position < len(self.inputs):
            return self.inputs[position]
        position -= len(self.inputs)

        if position < len(self.memory):
            return self.memory[position]
        position -= len(self.memory)

        if position < len(self.outputs):
            return self.outputs[position]

    def setBit(self, position, value):
        if position < len(self.inputs):
            self.inputs[position] = value
        position -= len(self.inputs)
        if position < 0:
            return

        if position < len(self.memory):
            self.memory[position] = value
        position -= len(self.memory)
        if position < 0:
            return

        if position < len(self.outputs):
            self.outputs[position] = value
        if position < 0:
            return

    def getSize(self):
        return len(self.inputs) + len(self.outputs) + len(self.memory)

    def getOutputDecimal(self):
        output = 0
        for i, v in enumerate(self.outputs):
            res = 2**i
            if v:
                output += res
        return output
