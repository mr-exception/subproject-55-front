package main

import (
	"math/rand"
	"time"
)

func random() *rand.Rand {
	// random seed
	s1 := rand.NewSource(time.Now().UnixNano())
	rnd := rand.New(s1)
	return rnd
}

func createRandomLogicUnit(unitProps UnitProps) LogicUnit {
	var logicUnit = LogicUnit{
		A:      random().Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize),
		B:      random().Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize),
		Output: unitProps.InputSize + random().Int63n(unitProps.MemorySize+unitProps.OutputSize),
		Operation: Operation{
			MaskA:     random().Float64() < 0.5,
			MaskB:     random().Float64() < 0.5,
			Operation: "and",
		},
	}
	if random().Float64() < 0.5 {
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
		workSpace.Input = append(workSpace.Input, random().Float32() < 0.5)
	}
	for i = 0; i < int(unitProps.OutputSize); i++ {
		workSpace.Output = append(workSpace.Output, random().Float32() < 0.5)
	}
	for i = 0; i < int(unitProps.MemorySize); i++ {
		workSpace.Memory = append(workSpace.Memory, random().Float32() < 0.5)
	}
	return workSpace
}

func createRandomMonoLogicStack(unitProps UnitProps) LogicStack {
	var logicStack = LogicStack{
		Stack:     []LogicUnit{},
		Age:       0,
		Deviation: 0,
	}
	logicStack.Stack = append(logicStack.Stack, createRandomLogicUnit(unitProps))
	return logicStack
}
