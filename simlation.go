package main

import "fmt"

// FitnessFunction is a function type that gets a workspace and returns the fitness score as a float real number
type FitnessFunction func(WorkSpace) float64

func startSimulation(calculateFitness FitnessFunction) {
	var workSpace = WorkSpace{
		Input:  []bool{},
		Output: []bool{},
		Memory: []bool{},
	}
	fmt.Printf("%f\n", calculateFitness(workSpace))
}
func main() {
	var fitnessFunction = func(workSpace WorkSpace) float64 {
		return 0
	}
	startSimulation(fitnessFunction)
}
