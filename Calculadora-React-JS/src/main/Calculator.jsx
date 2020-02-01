import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from '../components/Display';

function Calculator() {
    const [numOld, setOld] = useState('');
    const [values, setValues] = useState({value: 0});
    const [numero, setNumero] = useState(0);
    const [Operator ,setOperator] = useState({value: null});
    const setValue = useCallback(newValue => setValues({...values, value: newValue}), [values]);
    const setOpt = useCallback(newOpt => setOperator({...values, value: newOpt}), [values]);

    function clearMemory () {
        setNumero(0);
        setValue(0);
        setOld('');
        setOpt(null);
    }

    useEffect(()=> {
        setOld('');
    },[values]);

    const setOperation = operation => {
        const isResult = operation === '=';
        if(!numero) return false;
        if(
            (isResult && values === 0) ||
            (isResult && numero === 0)
         ) return false;

        if(values.value === 0) setValue(numOld);

        setOpt(operation);
        if(isResult) return setNumero(calculo());
        if(values.value !== 0) return setNumero(calculo());
    }

    const calculo = () => {
        if(Operator.value === null || Operator.value === '=' ) return numero;
        const result  = eval(`${values.value} ${Operator.value} ${numero}`);
        setValue(result);
        return result;
    }

    const addDigit = numero =>{
        const numeros = numOld + numero;
        if((numero === '.' && numOld.match(/\./)) || Operator.value === '=') return;
        setNumero(numeros);
        setOld(numeros);
    }

    return (
        <div className="calculator" style={CalcStyle}>
            <Display value={numero}/>
            <Button label="AC" click={clearMemory} triple />
            <Button label="/" click={setOperation} operation/>
            <Button label="7" click={addDigit} />
            <Button label="8" click={addDigit} />
            <Button label="9" click={addDigit} />
            <Button label="*" click={setOperation} operation/>
            <Button label="4" click={addDigit} />
            <Button label="5" click={addDigit} />
            <Button label="6" click={addDigit} />
            <Button label="-" click={setOperation} operation />
            <Button label="1" click={addDigit} />
            <Button label="2" click={addDigit} />
            <Button label="3" click={addDigit} />
            <Button label="+" click={setOperation} operation/>
            <Button label="0" click={addDigit} double />
            <Button label="." click={addDigit} />
            <Button label="=" click={setOperation} operation />
        </div>
    );
}

const CalcStyle = {
    height: "320px",
    width: "235px",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "lightgrey",
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "1fr 48px 48px 48px 48px 48px"
};

export default Calculator;
