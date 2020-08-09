package main

func executeArmag(logicStacks []LogicStack, calculateFitness FitnessFunction, worldConfigs WorldConfigs) ([]LogicStack, int, error) {
	var result = []LogicStack{}
	var kills int = 0
	var i int
	for i = 0; i < len(logicStacks); i++ {
		var logicStack = logicStacks[i]
		var killed bool = true

		var c int
		for c = 0; c < len(worldConfigs.KillConditions); c++ {
			if logicStack.Age > worldConfigs.KillConditions[c].MaxAge && logicStack.Deviation > worldConfigs.KillConditions[c].MaxDeviation {
				result = append(result, logicStack)
				killed = false
			}
		}
		if logicStack.Age < worldConfigs.MaxAge { // check if logicstack is reached max age to die
			result = append(result, logicStack)
			killed = false
		}
		if killed {
			kills++
		}

	}
	return result, kills, nil
}
