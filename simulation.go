package main

import (
	"fmt"
	"math"
	"math/rand"
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

func getRandomBitIndex(unitProps UnitProps) int64 {
	return int64(rand.Int63n(unitProps.InputSize + unitProps.MemorySize + unitProps.OutputSize))
}

// func runSingleTest(workSpace WorkSpace, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
// 	var err = runLogicUnit(workSpace, logicUnit)
// 	if err != nil {
// 		return 0, err
// 	}
// 	return calculateFitness(workSpace), nil
// }

// func testLogicUnit(unitProps UnitProps, logicUnit LogicUnit, calculateFitness FitnessFunction) (float64, error) {
// 	var result float64 = 0
// 	var workSpace WorkSpace = createRandomWorkSpace(unitProps)
// 	fmt.Println(getWorkSpaceString(workSpace))
// 	var fitnessValue, err = runSingleTest(workSpace, logicUnit, calculateFitness)
// 	if err != nil {
// 		return 0, nil
// 	}
// 	result += fitnessValue

// 	return result, nil
// }

// testLogicStack tests a single logic stack in a random workspace and effects the experience on it's age and deviation
func testLogicStack(unitProps UnitProps, logicStack LogicStack, calculateFitness FitnessFunction) (LogicStack, error) {
	// geneerate a random workspace
	var workSpace WorkSpace = createRandomWorkSpace(unitProps)
	// run logic stack on workspace
	var stackIndex int
	for stackIndex = 0; stackIndex < len(logicStack.Stack); stackIndex++ {
		var ws, err = runLogicUnit(workSpace, logicStack.Stack[stackIndex])
		if err != nil {
			return logicStack, err
		}
		workSpace = ws
	}
	// calculate fitness score
	var result = calculateFitness(workSpace)
	// calculate deviation and age of logic stack
	logicStack.Deviation = (logicStack.Deviation*float64(logicStack.Age) + result) / (float64(logicStack.Age) + 1)
	logicStack.Age++
	// excute the exploration on logic stack
	logicStack.Stack = append(logicStack.Stack, createRandomLogicUnit(unitProps))
	return logicStack, nil
}

// startSimulation executes a complete simulation for a problem
func startSimulation(unitProps UnitProps, calculateFitness FitnessFunction, worldConfigs WorldConfigs) {
	// generate first group of logic stacks
	var logicStacks = []LogicStack{}
	var i int
	for i = 0; i < worldConfigs.StacksMaxCount; i++ {
		logicStacks = append(logicStacks, createRandomMonoLogicStack(unitProps))
	}
	// start simulation
	var step int
	var firstStepBest float64 = 999
	var prevStepBest float64 = 999

	var totalKills int = 0
	for step = 0; step < 2000; step++ {
		var bestResult float64 = 999
		for i = 0; i < len(logicStacks); i++ {
			var ls, err = testLogicStack(unitProps, logicStacks[i], calculateFitness)
			logicStacks[i] = ls // replace result logic stack to the original stack

			if err != nil { // print error if exists
				fmt.Println(err.Error())
			}
			// check if current logic stack has the best results
			if math.Abs(logicStacks[i].Deviation) < math.Abs(bestResult) {
				bestResult = logicStacks[i].Deviation
				if step == 0 {
					firstStepBest = bestResult
				}
			}
		}

		var ls, killsCount, err = executeArmag(logicStacks, calculateFitness, worldConfigs)
		logicStacks = ls
		totalKills += killsCount
		if err != nil {
			fmt.Errorf(err.Error())
			return
		}

		// print results
		if step%100 == 0 {
			var ILS = prevStepBest - bestResult
			var ILSPercent = int(((prevStepBest - bestResult) / prevStepBest) * 100)
			var FLS = firstStepBest - bestResult
			var FLSPercent = int(((firstStepBest - bestResult) / firstStepBest) * 100)
			fmt.Printf("step: %d\nbest result: %f\nILS: %f (%d)\nFLS: %f (%d)\ntotal kills: %d\n========================\n", step, bestResult, ILS, ILSPercent, FLS, FLSPercent, totalKills)
		}
		prevStepBest = bestResult
	}
	// var logicUnit = createRandomLogicUnit(unitProps)
	// fmt.Println(getLogicUnitString(logicUnit))
	// var testResult, err = testLogicUnit(unitProps, logicUnit, calculateFitness)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
	// fmt.Printf("test result: %f\n", testResult)
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
