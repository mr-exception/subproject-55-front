package main

func doBirth(logicStacks []LogicStack, unitProps UnitProps, worldConfigs WorldConfigs) ([]LogicStack, int, error) {
	var i int
	var totalBirth int = 0
	for i = 0; i < len(logicStacks); i++ {
		var logicStack = logicStacks[i]
		var j int
		for j = 0; j < len(worldConfigs.BirthConditions); j++ {
			var birthCondition = worldConfigs.BirthConditions[j]
			if logicStack.Deviation < birthCondition.MaxDeviation && logicStack.Age > birthCondition.MinAge {
				// birth a new empty child
				logicStacks = append(logicStacks, createRandomMonoLogicStack(unitProps))
				totalBirth++
				// fmt.Printf("birth from %d %f\n", logicStack.Age, logicStack.Deviation)
			}
		}
	}
	// fmt.Println("testtttttt")
	return logicStacks, totalBirth, nil
}
