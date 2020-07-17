package main

import "testing"

func TestGetBoolArrayString(test *testing.T) {
	var arr1 = []bool{true, true, false}
	var out1 = getBoolArrayString(arr1)
	if out1 != "{1,1,0}" {
		test.Errorf("expected %s but got %s", "{1,1,0}", out1)
	}
	var arr2 = []bool{}
	var out2 = getBoolArrayString(arr2)
	if out2 != "{}" {
		test.Errorf("expected %s but got %s", "{}", out2)
	}
}

func TestGetWorkSpaceString(test *testing.T) {
	var workSpace1 = WorkSpace{
		Input:  []bool{true, false},
		Output: []bool{false, false},
		Memory: []bool{},
	}
	var out1 = getWorkSpaceString(workSpace1)
	if out1 != "<WorkSpace input:{1,0} output:{0,0} memory:{} >" {
		test.Errorf("expected %s but got %s", "<WorkSpace input:{1,0} output:{0,0} memory:{} >", out1)
	}
}

func TestGetWorkSpaceBit(test *testing.T) {
	var workSpace1 = WorkSpace{
		Input:  []bool{true, false},
		Memory: []bool{false, true},
		Output: []bool{false, false},
	}
	var out1, _ = getWorkSpaceBit(workSpace1, 0)
	if out1 != true {
		test.Errorf("expected %t but got %t", true, out1)
	}
	var out2, _ = getWorkSpaceBit(workSpace1, 2)
	if out2 != false {
		test.Errorf("expected %t but got %t", false, out2)
	}
	var out3, _ = getWorkSpaceBit(workSpace1, 3)
	if out3 != true {
		test.Errorf("expected %t but got %t", true, out3)
	}
	var out4, _ = getWorkSpaceBit(workSpace1, 5)
	if out4 != false {
		test.Errorf("expected %t but got %t", false, out4)
	}

	var out5, error0 = getWorkSpaceBit(workSpace1, 6)
	if error0 == nil {
		test.Errorf("expected out of index but got %t", out5)
	}

	var out6, error2 = getWorkSpaceBit(workSpace1, -2)
	if error2 == nil {
		test.Errorf("expected out of index but got %t", out6)
	}
}

func TestSetWorkSpaceBit(test *testing.T) {
	var workSpace1 = WorkSpace{
		Input:  []bool{true, false},
		Memory: []bool{false, true},
		Output: []bool{false, false},
	}

	var error0 = setWorkSpaceBit(workSpace1, 0, false)
	if error0 != nil {
		test.Errorf("expected success but got error %s", error0.Error())
	}
	if workSpace1.Input[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace1.Input[0])
	}

	var error1 = setWorkSpaceBit(workSpace1, 2, true)
	if error1 != nil {
		test.Errorf("expected success but got error %s", error1.Error())
	}
	if workSpace1.Memory[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace1.Memory[0])
	}

	var error2 = setWorkSpaceBit(workSpace1, 4, true)
	if error2 != nil {
		test.Errorf("expected success but got error %s", error2.Error())
	}
	if workSpace1.Output[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace1.Output[0])
	}

	var error3 = setWorkSpaceBit(workSpace1, -1, true)
	if error3 == nil {
		test.Error("expected error but got success")
	}
	var error4 = setWorkSpaceBit(workSpace1, 9, true)
	if error4 == nil {
		test.Error("expected error but got success")
	}
}

func TestRunLogicUnit(test *testing.T) {
	var operation = Operation{
		MaskA:     false,
		MaskB:     false,
		Operation: "and",
	}
	var logicUnit = LogicUnit{
		A:         0,
		B:         0,
		Output:    2,
		Operation: operation,
	}
	var workSpace = WorkSpace{
		Input:  []bool{true},
		Memory: []bool{false},
		Output: []bool{false},
	}
	runLogicUnit(workSpace, logicUnit)

	if workSpace.Input[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace.Input[0])
	}
	if workSpace.Memory[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace.Memory[0])
	}
	if workSpace.Output[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace.Output[0])
	}
	workSpace.Input[0] = false

	runLogicUnit(workSpace, logicUnit)

	if workSpace.Input[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace.Input[0])
	}
	if workSpace.Memory[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace.Memory[0])
	}
	if workSpace.Output[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace.Output[0])
	}

	var logicUnit1 = LogicUnit{
		A:         -1,
		B:         0,
		Output:    2,
		Operation: operation,
	}
	if runLogicUnit(workSpace, logicUnit1) == nil {
		test.Errorf("expected error but sucess")
	}

	var logicUnit2 = LogicUnit{
		A:         0,
		B:         0,
		Output:    5,
		Operation: operation,
	}
	if runLogicUnit(workSpace, logicUnit2) == nil {
		test.Errorf("expected error but sucess")
	}

	var logicUnit3 = LogicUnit{
		A:         0,
		B:         7,
		Output:    5,
		Operation: operation,
	}
	if runLogicUnit(workSpace, logicUnit3) == nil {
		test.Errorf("expected error but sucess")
	}

	var logicUnit4 = LogicUnit{
		A:      0,
		B:      2,
		Output: 5,
		Operation: Operation{
			MaskA:     true,
			MaskB:     true,
			Operation: "or",
		},
	}
	if runLogicUnit(workSpace, logicUnit4) == nil {
		test.Errorf("expected error but sucess")
	}

	var workSpace1 = WorkSpace{
		Input:  []bool{true},
		Memory: []bool{false},
		Output: []bool{false},
	}
	runLogicUnit(workSpace1, LogicUnit{
		A:      0,
		B:      0,
		Output: 2,
		Operation: Operation{
			MaskA:     true,
			MaskB:     true,
			Operation: "or",
		},
	})
	if workSpace1.Input[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace1.Input[0])
	}
	if workSpace1.Memory[0] != false {
		test.Errorf("expected %t but got %t", false, workSpace1.Memory[0])
	}
	if workSpace1.Output[0] != true {
		test.Errorf("expected %t but got %t", true, workSpace1.Output[0])
	}
}
