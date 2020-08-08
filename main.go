package main

func main() {
	var fitnessFunction = func(workSpace WorkSpace) float64 {
		var input int64 = bytesToInteger(workSpace.Input)
		var output int64 = bytesToInteger(workSpace.Output)

		return float64(output) - float64(input/2)
	}
	var worldConfigs = WorldConfigs{
		MaxAge:         100,
		StacksMaxCount: 1000,
		ImmortalMax:    10,
	}
	var unitProps = UnitProps{
		InputSize:  12,
		OutputSize: 12,
		MemorySize: 0,
	}
	startSimulation(unitProps, fitnessFunction, worldConfigs)
}
