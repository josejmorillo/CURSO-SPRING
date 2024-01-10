import './Counter.css'
import { useState } from 'react';
import CounterButton from './CounterButton';
import CounterReset from './CounterReset';

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by)
    } 

    function decrementCounterParentFunction(by) {
        setCount(count - by)
    } 

    function resetCounter() {
        setCount(0);
    }

    return (
        <>
            <span className="totalCounter">{count}</span>
            <CounterButton 
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction}
                />
            <CounterButton by={2} 
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction}
                />
            <CounterButton by={3} 
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction}
                />
            
            <CounterReset resetMethod={resetCounter}/>
        </>
    )
}


