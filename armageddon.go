package main

func executeArmag(logicStacks []LogicStack, calculateFitness FitnessFunction, worldConfigs WorldConfigs) ([]LogicStack, int, error) {
	var result = []LogicStack{}
	var kills int = 0
	var i int
	for i = 0; i < len(logicStacks); i++ {
		var logicStack = logicStacks[i]
		if float64(logicStack.Age)*logicStack.Deviation < 50*700 {
			result = append(result, logicStack)
		} else {
			kills++
		}
	}
	return result, kills, nil
}
