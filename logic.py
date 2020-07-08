class Prog:
  def __init__(self, op_a, op_b, op):
    self.op_a = op_a
    self.op_b = op_b
    self.op = op
  def toString(self):
    return f"Prog({self.op_a} {self.op} {self.op_b})"

class Logic:
  def __init__(self, a, b, prog, output):
    self.a = a
    self.b = b
    self.prog = prog
    self.output = output

  def unit(self, a, b, prog):
    if not prog.op_a:
      a = not a
    if not prog.op_b:
      b = not b
    if prog.op == "and":
      return a and b
    else:
      return a or b

  def runUnit(self, workspace):
    a = True
    if self.a != -1:
      a = workspace.getBit(self.a)
    b = True
    if self.b != -1:
      b = workspace.getBit(self.b)
    return self.unit(a, b, self.prog)
  
  def toString(self):
    a = f"({self.a})"
    if not self.prog.op_a:
      a = "!" + a

    b = f"({self.b})"
    if not self.prog.op_b:
      b = "!" + b
    
    op = "and"
    if not self.prog.op:
      op = "or"
    
    return f"<Logic {a} {op} {b} => {self.output}>"
