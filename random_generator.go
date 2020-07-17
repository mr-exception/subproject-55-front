package main

import "math/rand"

func createRandomLogicUnit(unitProps UnitProps) LogicUnit {
	var logicUnit = LogicUnit{
		A:      rand.Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize),
		B:      rand.Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize),
		Output: rand.Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize),
		Operation: Operation{
			MaskA:     rand.Float64() < 0.5,
			MaskB:     rand.Float64() < 0.5,
			Operation: "and",
		},
	}
	if rand.Float64() < 0.5 {
		logicUnit.Operation.Operation = "or"
	}
	return logicUnit
}

func createRandomWorkSpace(unitProps UnitProps) WorkSpace {
	var workSpace = WorkSpace{
		Input:  []bool{},
		Output: []bool{},
		Memory: []bool{},
	}

	var i int
	for i = 0; i < int(unitProps.InputSize); i++ {
		workSpace.Input = append(workSpace.Input, rand.Float32() < 0.5)
	}
	for i = 0; i < int(unitProps.OutputSize); i++ {
		workSpace.Output = append(workSpace.Output, false)
	}
	for i = 0; i < int(unitProps.MemorySize); i++ {
		workSpace.Memory = append(workSpace.Memory, false)
	}
	return workSpace
}
