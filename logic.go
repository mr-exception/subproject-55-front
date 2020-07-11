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
	Memory []bool `json:"memory"`
	Output []bool `json:"output"`
}

// getWorkSpaceBit returns a single bit as boolean by passing the workspace and position of wanted bit
func getWorkSpaceBit(workSpace WorkSpace, position int64) (bool, error) {
	if position < 0 {
		return false, fmt.Errorf("Exception: index %d not found in workspace", position)
	}
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

// setWorkSpaceBit sets a bit in workspace by passing WorkSpace, position (int64) and value (bool)
func setWorkSpaceBit(workSpace WorkSpace, position int64, value bool) error {
	if position < 0 {
		return fmt.Errorf("Exception: index %d not found in workspace", position)
	}
	var offset int64 = 0
	if position < int64(len(workSpace.Input)) {
		workSpace.Input[position] = value
		return nil
	}
	offset += int64(len(workSpace.Input))
	if position < int64(len(workSpace.Memory))+offset {
		workSpace.Memory[position-offset] = value
		return nil
	}
	offset += int64(len(workSpace.Memory))
	if position < int64(len(workSpace.Output))+offset {
		workSpace.Output[position-offset] = value
		return nil
	}
	return fmt.Errorf("Exception: index %d not found in workspace", position)
}

// getBoolArrayString get an array of booleans and returns a string to print or store
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

// getWorkSpaceString get an WorkSpace and returns a string to prrint or store
func getWorkSpaceString(workSpace WorkSpace) string {
	var inputString string = getBoolArrayString(workSpace.Input)
	var outputString string = getBoolArrayString(workSpace.Output)
	var memoryString string = getBoolArrayString(workSpace.Memory)

	return fmt.Sprintf("<WorkSpace input:%s output:%s memory:%s >", inputString, outputString, memoryString)
}

// runLogicUnit runs a single LogicUnit on a WorkSpace
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
		var error = setWorkSpaceBit(workSpace, logicUnit.Output, a && b)
		if error != nil {
			return error
		}
		break
	case "or":
		var error = setWorkSpaceBit(workSpace, logicUnit.Output, a || b)
		if error != nil {
			return error
		}
		break
	}
	return nil
}
