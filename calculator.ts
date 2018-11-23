//javascript to run a calculator

//declare some variables
var action = "";
var currentnumber = "0";
var doneequals = "";
var formulastring = "";
var newaction = "";
var total = 0.0;

function resetVars() {
    //clear all variables to start new calculation
    action = "";
    currentnumber = "0";
    doneequals = "";
    formulastring = "";
    newaction = "";
    total = 0;
    (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
    (<HTMLInputElement>document.getElementById("formula")).value = formulastring;
}

function newCalc() {
    //clear current actions and use current result in next calculation
    action = "";
    currentnumber = "0";
    doneequals = "";
    formulastring = "";
    newaction = "";
    (<HTMLInputElement>document.getElementById("formula")).value = "";
}

function operation(button:string) {
    //run code for each button
    //debugger;

    switch (button) {
        case "CV":
            if (doneequals === "1") {
                resetVars();
            } else {
                currentnumber = "0";
                (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            }
            break;

        case "CA":
            resetVars();
            break;

        case "<":
            //delete 1 letter
            if (doneequals === "1" || doneequals === "2") {
                resetVars();
            } else {
                if (currentnumber.length > 1) {
                    currentnumber = currentnumber.slice(0, currentnumber.length - 1);
                } else {
                    currentnumber = "0";
                }
            }
            (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            break;

        case "÷":
            operator(button);
            break;

        case "X":
            operator(button);
            break;

        case "-":
            operator(button);
            break;

        case "+":
            operator(button);
            break;

        case "r":
            operator(button);
            break;

        case "s":
            operator(button);
            break;

        case "i":
            operator(button);
            break;

        case "p":
            operator(button);
            break;

        case "=":
            //calculate result
            if (action !== "") {
                equals();
                doneequals = "1";
            }
            break;

        case ".":
            //add decimal once
            if (doneequals === "1" || doneequals === "2") {
                newCalc();
            }
            if (currentnumber.indexOf(".") === -1) {
                currentnumber += button;
            }
            (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            break;

        case "c":
            //change sign
            if (doneequals === "1") {
                currentnumber = total.toString();
            }
            if (currentnumber === "0") {
                //do nothing
            } else if (currentnumber.indexOf("-") === -1) {
                currentnumber = "-" + currentnumber;
            } else {
                currentnumber = currentnumber.slice(1, currentnumber.length);
            }

            if (doneequals === "1") {
                //use current result
                doneequals = "";
                action = "";
                formulastring = "";
                newaction = "";
                (<HTMLInputElement>document.getElementById("formula")).value = currentnumber;

            } else if (doneequals === "2") {
                //fix formula when using square root
                formulastring = " " + formulastring;
                var space = formulastring.lastIndexOf(" ");
                var prefix = formulastring.slice(space + 1, space + 2);

                if (prefix === "-") {
                    formulastring = formulastring.slice(0, space + 1) + formulastring.slice(space + 2, formulastring.length);
                } else {
                    formulastring = formulastring.slice(0, space + 1) + "-" + formulastring.slice(space + 1, formulastring.length);
                }
                (<HTMLInputElement>document.getElementById("formula")).value = formulastring;
            }

            (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            break;

        default:
            if (!isNaN(parseInt(button))) {
                //for number buttons
                if (doneequals === "1" || doneequals === "2") {
                    newCalc();
                }

                //clear action and build number string
                newaction = "";
                currentnumber += button;

                //remove leading default 0
                if (currentnumber.slice(0, 1) === "0" && currentnumber.length > 1 && currentnumber.slice(1, 2) !== ".") {
                    currentnumber = currentnumber.slice(1, currentnumber.length);
                }
                (<HTMLInputElement>document.getElementById("result")).value = currentnumber;

            } else {
                //for testing missing button code
                alert("Button is not implemented yet");
            }
    }
}

function operator(buttonaction:string) {
    //check the operation button pressed and prepare for the next step
    var yvalue = 0;
    var space = 0;

    if (doneequals === "1") {
        //use previous total
        doneequals = "";
        currentnumber = total.toString();
        formulastring = "";
        newaction = "";
        action = "";
    }

    if (buttonaction === "r") {
        //square root changes current number

        if (doneequals === "2") {
            formulastring = " " + formulastring;
            space = formulastring.lastIndexOf(" ");
            formulastring = formulastring.slice(0, space + 1) + "√" + formulastring.slice(space, formulastring.length).trim();
        } else {
            formulastring += " √" + currentnumber;
        }

        yvalue = parseFloat(currentnumber);
        if (isNaN(yvalue)) { yvalue = 0; }

        if (yvalue < 0) {
            //check for negative
            resetVars();
            (<HTMLInputElement>document.getElementById("result")).value = "Imaginary number";

        } else {
            yvalue = Math.sqrt(yvalue);
            currentnumber = yvalue.toString();
            (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            doneequals = "2";
        }

    } else if (buttonaction === "s") {
        //squared changes current number

        if (doneequals === "2") {
            formulastring += "\xa0" + "²";
        } else {
            formulastring += " " + currentnumber + "²";
        }

        yvalue = parseFloat(currentnumber);
        if (isNaN(yvalue)) { yvalue = 0; }

        yvalue = yvalue * yvalue;
        currentnumber = yvalue.toString();
        (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
        doneequals = "2";

    } else if (buttonaction === "i") {
        //invert changes current number

        if (doneequals === "2") {
            formulastring = " " + formulastring;
            space = formulastring.lastIndexOf(" ");
            formulastring = formulastring.slice(0, space + 1) + "1/" + formulastring.slice(space, formulastring.length).trim();
        } else {
            formulastring += " 1/" + currentnumber;
        }

        yvalue = parseFloat(currentnumber);
        if (isNaN(yvalue)) { yvalue = 0; }

        if (yvalue === 0) {
            //check for 0
            resetVars();
            (<HTMLInputElement>document.getElementById("result")).value = "Can't divide by zero";

        } else {
            yvalue = 1 / yvalue;
            currentnumber = yvalue.toString();
            (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
            doneequals = "2";
        }

    } else if (buttonaction === "p") {
        //percentage changes current number

        if (action === "") {
            total = 0;
            currentnumber = "0";
        }

        if (doneequals === "2") {
            formulastring += "%";
        } else {
            formulastring += " " + currentnumber + "%";
        }

        yvalue = parseFloat(currentnumber);
        if (isNaN(yvalue)) {yvalue = 0;}

        yvalue = total * yvalue / 100;
        currentnumber = yvalue.toString();
        (<HTMLInputElement>document.getElementById("result")).value = currentnumber;
        doneequals = "2";

    } else if (action !== "" && newaction !== "") {
        //replace current action
        action = buttonaction;
        formulastring = formulastring.slice(0, formulastring.length - 1) + buttonaction;

    } else if (action !== "") {
        //calculate result and start next action
        equals();
        action = buttonaction;
        newaction = action;
        formulastring += " " + buttonaction;
        currentnumber = "0";

        if (doneequals === "2") { doneequals = ""; }

    } else {
        //record number and start action
        action = buttonaction;
        newaction = action;

        total = parseFloat(currentnumber);
        if (isNaN(total)) {
            total = 0;
        }

        if (doneequals !== "2") {
            formulastring += " " + currentnumber + " " + buttonaction;
        } else {
            formulastring += " " + buttonaction;
            doneequals = "";
        }
        currentnumber = "0";
    }

    formulastring = formulastring.replace("  ", " ");
    formulastring = formulastring.trim();
    (<HTMLInputElement>document.getElementById("formula")).value = formulastring;
}

function equals() {
    //calculate the result
    var yvalue = 0;

    yvalue = parseFloat(currentnumber);
    if (isNaN(yvalue)) { yvalue = 0; }

    if (doneequals === "1") {
        formulastring += " " + action + " " + currentnumber;
    } else if (doneequals === "2") {
        //do nothing
    } else {
        formulastring += " " + currentnumber;
    }

    //perform the calculation
    if (action === "X") {
        total = total * yvalue;

    } else if (action === "÷") {
        if (yvalue === 0) {
            resetVars();
            (<HTMLInputElement>document.getElementById("result")).value = "Can't divide by zero";
            return;
        } else {
            total = total / yvalue;
        }
    } else if (action === "-") {
        total = total - yvalue;

    } else if (action === "+") {
        total = total + yvalue;

    } else {
        //check if button code is missing
        alert("Button is not implemented yet");
        return;
    }

    //update the display
    (<HTMLInputElement>document.getElementById("result")).value = total.toString();
    (<HTMLInputElement>document.getElementById("formula")).value = formulastring;
}

window.onload = function () {
    //create onclick events for all buttons
    document.getElementById("Value0")!.onclick = function () { operation("0"); };
    document.getElementById("Value1")!.onclick = function () { operation("1"); };
    document.getElementById("Value2")!.onclick = function () { operation("2"); };
    document.getElementById("Value3")!.onclick = function () { operation("3"); };
    document.getElementById("Value4")!.onclick = function () { operation("4"); };
    document.getElementById("Value5")!.onclick = function () { operation("5"); };
    document.getElementById("Value6")!.onclick = function () { operation("6"); };
    document.getElementById("Value7")!.onclick = function () { operation("7"); };
    document.getElementById("Value8")!.onclick = function () { operation("8"); };
    document.getElementById("Value9")!.onclick = function () { operation("9"); };
    document.getElementById("Multiply")!.onclick = function () { operation("X"); };
    document.getElementById("Equals")!.onclick = function () { operation("="); };
    document.getElementById("ClearValue")!.onclick = function () { operation("CV"); };
    document.getElementById("ClearAll")!.onclick = function () { operation("CA"); };
    document.getElementById("delete")!.onclick = function () { operation("<"); };
    document.getElementById("divide")!.onclick = function () { operation("÷"); };
    document.getElementById("period")!.onclick = function () { operation("."); };
    document.getElementById("plus")!.onclick = function () { operation("+"); };
    document.getElementById("Subtract")!.onclick = function () { operation("-"); };
    document.getElementById("change")!.onclick = function () { operation("c"); };
    document.getElementById("percent")!.onclick = function () { operation("p"); };
    document.getElementById("root")!.onclick = function () { operation("r"); };
    document.getElementById("square")!.onclick = function () { operation("s"); };
    document.getElementById("inverse")!.onclick = function () { operation("i"); };
};
