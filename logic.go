package main

import "fmt"

// Operation defines an operation on two input bits
type Operation struct {
	MaskA     bool   `json:"mask_a"`
	MaskB     bool   `json:"mask_b"`
	Operation string `json:"operation"`
}

// LogicUnit defines a unit operation on two input bits in a workspace
type LogicUnit struct {
	A         int64     `json:"a"`
	B         int64     `json:"b"`
	Output    int64     `json:"output"`
	Operation Operation `json:"operation"`
}

// WorkSpace holds the current information of a running unit machine
type WorkSpace struct {
	Input  []bool `json:"input"`
	Output []bool `json:"output"`
	Memory []bool `json:"memory"`
}

func getWorkSpaceBit(workSpace WorkSpace, position int64) (bool, error) {
	var offset int64 = 0
	if position < int64(len(workSpace.Input)) {
		return workSpace.Input[position], nil
	}
	offset += int64(len(workSpace.Input))
	if position < int64(len(workSpace.Memory))+offset {
		return workSpace.Memory[position-offset], nil
	}
	offset += int64(len(workSpace.Memory))
	if position < int64(len(workSpace.Output))+offset {
		return workSpace.Output[position-offset], nil
	}
	return false, fmt.Errorf("Exception: index %d not found in workspace", position)
}
func setWorkSpaceBit(workSpace WorkSpace, position int64, value bool) error {
	var offset int64 = 0
	if position < int64(len(workSpace.Input)) {
		workSpace.Input[position] = value
	}
	offset += int64(len(workSpace.Input))
	if position < int64(len(workSpace.Memory))+offset {
		workSpace.Memory[position-offset] = value
	}
	offset += int64(len(workSpace.Memory))
	if position < int64(len(workSpace.Output))+offset {
		workSpace.Output[position-offset] = value
	}
	return fmt.Errorf("Exception: index %d not found in workspace", position)
}

func getBoolArrayString(data []bool) string {
	if len(data) == 0 {
		return "{}"
	}
	var output = fmt.Sprint("{")

	if data[0] {
		output += "1"
	} else {
		output += "0"
	}

	var i int64
	for i = 1; i < int64(len(data)); i++ {
		if data[i] {
			output += ",1"
		} else {
			output += ",0"
		}
	}

	output += "}"

	return output
}

func getWorkSpaceString(workSpace WorkSpace) string {
	var inputString string = getBoolArrayString(workSpace.Input)
	var outputString string = getBoolArrayString(workSpace.Output)
	var memoryString string = getBoolArrayString(workSpace.Memory)

	return fmt.Sprintf("<WorkSpace intput:%s output:%s memory: %s", inputString, outputString, memoryString)
}

func runLogicUnit(workSpace WorkSpace, logicUnit LogicUnit) error {
	var a, indexAError = getWorkSpaceBit(workSpace, logicUnit.A)
	if indexAError != nil {
		return indexAError
	}
	var b, indexBError = getWorkSpaceBit(workSpace, logicUnit.B)
	if indexBError != nil {
		return indexBError
	}

	if !logicUnit.Operation.MaskA {
		a = !a
	}
	if !logicUnit.Operation.MaskB {
		b = !b
	}

	switch logicUnit.Operation.Operation {
	case "and":
		setWorkSpaceBit(workSpace, logicUnit.Output, a && b)
		return nil
	case "or":
		setWorkSpaceBit(workSpace, logicUnit.Output, a || b)
		return nil
	}
	return nil
}

func main() {
	fmt.Println("this is logic.go file")
	var operation = Operation{
		MaskA:     false,
		MaskB:     false,
		Operation: "and",
	}
	var logicUnit = LogicUnit{
		A:         0,
		B:         0,
		Output:    1,
		Operation: operation,
	}
	var workSpace = WorkSpace{
		Input:  []bool{true},
		Output: []bool{false},
		Memory: []bool{},
	}
	runLogicUnit(workSpace, logicUnit)
	fmt.Println(getWorkSpaceString(workSpace))
}
