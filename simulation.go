package main

import (
	"fmt"
	"math"
)

// FitnessFunction is a function type that gets a workspace and returns the fitness score as a float real number
type FitnessFunction func(WorkSpace) float64

// UnitProps contains the general informations of a logic unit machine
type UnitProps struct {
	InputSize  int64 `json:"input_size"`
	MemorySize int64 `json:"memory_size"`
	OutputSize int64 `json:"output_size"`
}

func getUnitPropsString(unitProps UnitProps) string {
	return fmt.Sprintf("{input: %d, output: %d, memory: %d}", unitProps.InputSize, unitProps.OutputSize, unitProps.MemorySize)
}

func runSingleTest(workSpace WorkSpace, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
	var err = runLogicUnit(workSpace, logicUnit)
	if err != nil {
		return 0, err
	}
	return calculateFitness(workSpace), nil
}

func testLogicUnit(unitProps UnitProps, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
	var result float64 = 0

	var testCase int
	for testCase = 0; testCase < 50; testCase++ {
		var workSpace WorkSpace = createRandomWorkSpace(unitProps)
		var fitnessValue, err = runSingleTest(workSpace, logicUnit, calculateFitness)
		if err != nil {
			return 0, nil
		}
		result += fitnessValue
	}
	return result, nil
}

func startSimulation(unitProps UnitProps, calculateFitness FitnessFunction) {
	var step int
	for step = 0; step < 1000; step++ {
		var logicUnit = createRandomLogicUnit(unitProps)
		var testResult, err = testLogicUnit(unitProps, logicUnit, calculateFitness)
		if err != nil {
			fmt.Println(err.Error())
		}
		fmt.Printf("#%d: test result: %f\n", step, testResult)

		if testResult == 0.0 {
			fmt.Println("found answer!")
			fmt.Println(getLogicUnitString(logicUnit))
			break
		}
	}
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
		InputSize:  2,
		OutputSize: 2,
		MemorySize: 0,
	}
	startSimulation(unitProps, fitnessFunction)
}
