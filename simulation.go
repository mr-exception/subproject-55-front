package main

import (
	"fmt"
	"math"
	"sync"
)

// FitnessFunction is a function type that gets a workspace and returns the fitness score as a float real number
type FitnessFunction func(WorkSpace) float64

// UnitProps contains the general informations of a logic unit machine
type UnitProps struct {
	InputSize  int64 `json:"input_size"`
	MemorySize int64 `json:"memory_size"`
	OutputSize int64 `json:"output_size"`
}

// getUnitPropsString converts an UnitProps to string
func getUnitPropsString(unitProps UnitProps) string {
	return fmt.Sprintf("{input: %d, output: %d, memory: %d}", unitProps.InputSize, unitProps.OutputSize, unitProps.MemorySize)
}

// runSingleTest runs a single LogicUnit in a WorkSpace and returns the result calculated by FitnessFunction
func runSingleTest(workSpace WorkSpace, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
	var err = runLogicUnit(workSpace, logicUnit)
	if err != nil {
		return 0, err
	}
	return calculateFitness(workSpace), nil
}

// testLogicUnit runs several tests on a LogicUnit and returns the sum of FitnessFunction results
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

// startSimulation start the simulation for a single problem
func startSimulation(unitProps UnitProps, calculateFitness FitnessFunction) {
	var step int
	var wg sync.WaitGroup
	var foundAnswer bool = false
	wg.Add(1000)
	for step = 0; step < 1000; step++ {
		go func(step int) {
			var logicUnit = createRandomLogicUnit(unitProps)
			var testResult, err = testLogicUnit(unitProps, logicUnit, calculateFitness)
			if err != nil {
				fmt.Println(err.Error())
			}

			if foundAnswer {
				defer wg.Done()
				return
			}
			if testResult == 0.0 {
				fmt.Printf("found answer: %s \n", getLogicUnitString(logicUnit))
				foundAnswer = true
			}
			defer wg.Done()
		}(step)
	}
	wg.Wait()
}

// bytesToInteger converts bit arrays to int64
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
