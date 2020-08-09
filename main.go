package main

import "math"

func main() {
	var fitnessFunction = func(workSpace WorkSpace) float64 {
		var input int64 = bytesToInteger(workSpace.Input)
		var output int64 = bytesToInteger(workSpace.Output)

		return math.Abs(float64(output - input))
	}
	var worldConfigs = WorldConfigs{
		MaxAge:         250,
		StacksMaxCount: 10,
		ImmortalMax:    10,
		KillConditions: []KillCondition{
			KillCondition{
				MaxAge:       50,
				MaxDeviation: 5,
			},
		},
	}
	var unitProps = UnitProps{
		InputSize:  2,
		OutputSize: 2,
		MemorySize: 0,
	}
	startSimulation(unitProps, fitnessFunction, worldConfigs)
}
