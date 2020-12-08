const readFile = require("fs").readFileSync

const STEPS = []
let OPERATIONS = []
const file = readFile('input.txt', 'utf-8').split("\n").forEach(data => {
    STEPS.push(data.trim());
})

function preprocessSteps(steps){
    let operations = [];
    let i =0;
    while (i<steps.length){
        let operation = steps[i].split(" ");
        let op = operation[0];
        let value = operation[1];
        value=parseInt(value)
        operations.push({i, op, value})
        i++;
    }
    return operations;
}

OPERATIONS = preprocessSteps(STEPS);

function runProgram(operations){
    let currentPointer = 0;
    let acc = 0;

    let visited = [];

    while(currentPointer < operations.length){
        if(visited.includes(currentPointer)){
            return [acc, false];
        }
        visited.push(currentPointer)
        let operation = operations[currentPointer];
        if(operation.op === "acc"){
            acc= acc + operation.value
            currentPointer++;
        }
        else if(operation.op === "jmp"){
            currentPointer = currentPointer + operation.value;
        }
        else{
            currentPointer++;
        }
    }
    return [acc, true];
}

function part2(operations){

    const JMP = "jmp";
    const NOP = "nop"
    
    let oldOp = "";
    let newOp = "";

    let [acc, terminated] = [-1, false]

    let i = 0;
    while(i < operations.length){
        let operation = operations[i];
        if(operation.op === JMP){
            oldOp = JMP;
            newOp = NOP;
        }else if(operation.op === NOP){
            oldOp = NOP;
            newOp = JMP;
        }
        else{
            oldOp = "acc";
            newOp = "acc";
        }
        operation.op = newOp;
        operations[i] = operation;
        [acc, terminated] = runProgram(operations);
        if(terminated === true){
            return [acc, terminated]
        }

        operation.op = oldOp;
        operations[i] = operation;
        i++;
    }
    return [acc, terminated]
}
console.log(runProgram(OPERATIONS));
console.log(part2(OPERATIONS));
