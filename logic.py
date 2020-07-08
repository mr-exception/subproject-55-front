def unit(a, b, prog):
    if not prog[1]:
        a = not a
    if not prog[2]:
        b = not b
    if prog[0]:
        return a and b
    else:
        return a or b


class Logic:
    def __init__(self, a, b, prog, output):
        self.a = a
        self.b = b
        self.prog = prog
        self.output = output

    def runUnit(self, workspace):
        return unit(workspace.getBit(self.a), workspace.getBit(self.b), self.prog)
