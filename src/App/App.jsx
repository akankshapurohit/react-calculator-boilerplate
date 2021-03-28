import React from 'react';
import logo from './logo.png';
import './app.scss';
import ResultComponent from '../Components/Result';
import KeypadComponent from '../Components/Keypad';


class App extends React.PureComponent {
    constructor(){
        super();
        this.state={
            result:"0",
        }
    }
    onClick = button => {

        if(button === "="){
            this.calculate()
        }
        else if(button === "AC"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }
        else {            
            if(this.state.result == 0){
                this.setState({
                    result: button
                })
            }
            else{
                this.setState({
                    result: this.state.result + button
                })
            }
        }
    };
    calculate = () => {
        try {
            let seperator = this.state.result;
            let inputSequence = [];
            let operand = "";
            for(let i=0; i<seperator.length; i++){
                if(seperator[i] == "+" || seperator[i] == "-"){
                    inputSequence.push(operand);
                    inputSequence.push(seperator[i]);
                    operand = "";

                }
                else{
                    operand += seperator[i];
                }
            }
            inputSequence.push(operand)
            let evaluatedResult = parseFloat(inputSequence[0]);
            let operator = "";
            for(let i=0; i<inputSequence.length; i++){
                if(operator == "+"){
                    evaluatedResult += parseFloat(inputSequence[i]);
                    operator = "";
                }
                else if(operator == "-"){
                    evaluatedResult -= parseFloat(inputSequence[i]);
                    operator = "";
                }
                if(inputSequence[i] == "+"){
                    operator = "+";
                }
                else if(inputSequence[i] == "-"){
                    operator = "-"
                }
            }        
            this.setState({
                result: evaluatedResult
                //alternate way to evaluate a string
                //result: (eval(this.state.result) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };
    reset = () => {
        this.setState({
            result: "0"
        })
    };
    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };
    render() {
        return (
            <div >
                <div className="DCMN-logo">
                    <img src={logo} alt="DCMN logo" />
                </div>
                
                <div className="calculatorBody">
                    <ResultComponent result={this.state.result}/>
                    <KeypadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
