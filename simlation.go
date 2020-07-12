package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

// FitnessFunction is a function type that gets a workspace and returns the fitness score as a float real number
type FitnessFunction func(WorkSpace) float64

// UnitProps contains the general informations of a logic unit machine
type UnitProps struct {
	InputSize  int64 `json:"input_size"`
	MemorySize int64 `json:"memory_size"`
	OutputSize int64 `json:"output_size"`
}

func getRandomFloat() float64 {
	s1 := rand.NewSource(time.Now().UnixNano())
	rnd := rand.New(s1)
	return rnd.ExpFloat64()
}

func getRandomBitIndex(unitProps UnitProps) int64 {
	return int64(getRandomFloat() * float64(unitProps.InputSize+unitProps.MemorySize+unitProps.OutputSize))
}

func runSingleTest(workSpace WorkSpace, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
	var err = runLogicUnit(workSpace, logicUnit)
	if err != nil {
		return 0, err
	}
	return calculateFitness(workSpace), nil
}

func createRandomWorkSpace(unitProps UnitProps) WorkSpace {
	var workSpace = WorkSpace{
		Input:  []bool{},
		Output: []bool{},
		Memory: []bool{},
	}

	var i int
	for i = 0; i < int(unitProps.InputSize); i++ {
		workSpace.Input = append(workSpace.Input, getRandomFloat() < 0.5)
	}
	for i = 0; i < int(unitProps.OutputSize); i++ {
		workSpace.Output = append(workSpace.Output, false)
	}
	for i = 0; i < int(unitProps.MemorySize); i++ {
		workSpace.Memory = append(workSpace.Memory, false)
	}
	return workSpace
}

func testLogicUnit(unitProps UnitProps, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
	var result float64 = 0
	var workSpace WorkSpace = createRandomWorkSpace(unitProps)
	fmt.Println(workSpace)
	var fitnessValue, err = runSingleTest(workSpace, logicUnit, calculateFitness)
	if err != nil {
		return 0, nil
	}
	result += fitnessValue

	return result, nil
}

func createRandomLogicUnit(unitProps UnitProps) LogicUnit {
	var logicUnit = LogicUnit{
		A: getRandomBitIndex(unitProps),
		B: getRandomBitIndex(unitProps),
		Operation: Operation{
			MaskA:     getRandomFloat() < 0.5,
			MaskB:     getRandomFloat() < 0.5,
			Operation: "and",
		},
	}
	if getRandomFloat() < 0.5 {
		logicUnit.Operation.Operation = "or"
	}
	return logicUnit
}

func startSimulation(unitProps UnitProps, calculateFitness FitnessFunction) {
	var logicUnit = createRandomLogicUnit(unitProps)
	fmt.Println(getLogicUnitString(logicUnit))
	var testResult, err = testLogicUnit(unitProps, logicUnit, calculateFitness)
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Printf("test result: %f\n", testResult)
}

func bytesToInteger(data []bool) int64 {
	var i int
	var result int64 = 0
	for i = 0; i < int(len(data)); i++ {
		if data[i] {
			result += int64(math.Pow(2, float64(i)))
		}
	}
	return result
}

func main() {
	var fitnessFunction = func(workSpace WorkSpace) float64 {
		var input int64 = bytesToInteger(workSpace.Input)
		var output int64 = bytesToInteger(workSpace.Output)

		return float64(output - input)
	}
	var unitProps = UnitProps{
		InputSize:  1,
		OutputSize: 1,
		MemorySize: 0,
	}
	startSimulation(unitProps, fitnessFunction)
}
