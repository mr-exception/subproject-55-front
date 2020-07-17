package main

import (
	"math/rand"
	"testing"
)

func TestCreateRandomWorkSpace(test *testing.T) {
	var unitProps = UnitProps{
		InputSize:  1,
		OutputSize: 1,
		MemorySize: 1,
	}
	var workSpace1 = createRandomWorkSpace(unitProps)

	if len(workSpace1.Input) != 1 {
		test.Errorf("expected Input size %d but got %d", 1, len(workSpace1.Input))
	}
	if len(workSpace1.Output) != 1 {
		test.Errorf("expected Output size %d but got %d", 1, len(workSpace1.Output))
	}
	if len(workSpace1.Memory) != 1 {
		test.Errorf("expected Memory size %d but got %d", 1, len(workSpace1.Memory))
	}

	var unitProps1 = UnitProps{
		InputSize:  12,
		OutputSize: 18,
		MemorySize: 3,
	}
	var workSpace2 = createRandomWorkSpace(unitProps1)

	if len(workSpace2.Input) != 12 {
		test.Errorf("expected Input size %d but got %d", 12, len(workSpace2.Input))
	}
	if len(workSpace2.Output) != 18 {
		test.Errorf("expected Output size %d but got %d", 18, len(workSpace2.Output))
	}
	if len(workSpace2.Memory) != 3 {
		test.Errorf("expected Memory size %d but got %d", 3, len(workSpace2.Memory))
	}
}
func TestCreateRandomLogicUnit(test *testing.T) {
	var i int
	for i = 0; i < 50; i++ {
		var unitProps = UnitProps{
			InputSize:  rand.Int63n(32),
			OutputSize: rand.Int63n(32),
			MemorySize: rand.Int63n(32),
		}

		var logicUnit = createRandomLogicUnit(unitProps)
		if logicUnit.A > (unitProps.InputSize+unitProps.MemorySize+unitProps.OutputSize) || logicUnit.A < 0 {
			test.Errorf("expected A to be in [0,%d] but A is %d", (unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize), logicUnit.A)
		}
		if logicUnit.B > (unitProps.InputSize+unitProps.MemorySize+unitProps.OutputSize) || logicUnit.B < 0 {
			test.Errorf("expected B to be in [0,%d] but B is %d", (unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize), logicUnit.B)
		}
		if logicUnit.Output > (unitProps.InputSize+unitProps.MemorySize+unitProps.OutputSize) || logicUnit.Output < 0 {
			test.Errorf("expected Output to be in [0,%d] but Output is %d", (unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize), logicUnit.Output)
		}
	}
}
