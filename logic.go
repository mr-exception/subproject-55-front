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

// LogicStack defines a stack of logic units with age and deviation caused in learning progress
type LogicStack struct {
	Stack     []LogicUnit `json:"stack"`
	Age       int         `json:"age"`
	Deviation float64     `json:"deviation"`
}

// WorkSpace holds the current information of a running unit machine
type WorkSpace struct {
	Input  []bool `json:"input"`
	Memory []bool `json:"memory"`
	Output []bool `json:"output"`
}

// KillCondition is the definition of instant kill of logic stacks
type KillCondition struct {
	MaxAge       int     `json:"max_age"`
	MaxDeviation float64 `json:"max_deviation"`
}

// WorldConfigs holds the information of world
type WorldConfigs struct {
	MaxAge         int             `json:"max_age"`
	StacksMaxCount int             `json:"stacks_max_count"`
	ImmortalMax    float64         `json:"immortal_max"`
	KillConditions []KillCondition `json:"kill_conditions"`
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

func getLogicUnitString(logicUnit LogicUnit) string {
	var maskA string = "a"
	if !logicUnit.Operation.MaskA {
		maskA = "!a"
	}
	var maskB string = "b"
	if !logicUnit.Operation.MaskB {
		maskB = "!b"
	}
	return fmt.Sprintf("{a: %d, b: %d, output: %d, operation: %s %s %s}", logicUnit.A, logicUnit.B, logicUnit.Output, maskA, logicUnit.Operation.Operation, maskB)
}

// runLogicUnit runs a single LogicUnit on a WorkSpace
func runLogicUnit(workSpace WorkSpace, logicUnit LogicUnit) (WorkSpace, error) {
	var a, indexAError = getWorkSpaceBit(workSpace, logicUnit.A)
	if indexAError != nil {
		return workSpace, indexAError
	}
	var b, indexBError = getWorkSpaceBit(workSpace, logicUnit.B)
	if indexBError != nil {
		return workSpace, indexBError
	}

	if !logicUnit.Operation.MaskA {
		a = !a
	}
	if !logicUnit.Operation.MaskB {
		b = !b
	}

	switch logicUnit.Operation.Operation {
	case "and":
		var err = setWorkSpaceBit(workSpace, logicUnit.Output, a && b)
		if err != nil {
			return workSpace, err
		}
		break
	case "or":
		var err = setWorkSpaceBit(workSpace, logicUnit.Output, a || b)
		if err != nil {
			return workSpace, err
		}
		break
	}
	return workSpace, nil
}
