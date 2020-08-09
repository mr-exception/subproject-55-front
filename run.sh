#!/bin/bash
rm dist/run
go build -o dist/run logic.go random_generator.go simulation.go main.go armageddon.go chopchop.go
./dist/run