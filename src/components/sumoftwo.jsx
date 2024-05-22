import React, { useState } from "react";



const Sumoftwo = function(){
  
    const [sum, setSum] = useState(0)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)

    function summ1(v1){
        
        setSum(Number(v1) + Number(value2))
        setValue1(Number(v1))
    }
    function summ2(v2){
        
        
        setSum(Number(value1) + Number(v2))
        setValue2(Number(v2))
    }


    return(
        <div>
            <h1>{sum}</h1>
            <input type="text" value={value1} onChange={event => summ1(event.target.value)}/>
            <input type="text" value={value2} onChange={event => summ2(event.target.value)}/>
        </div>
    )
}

export default Sumoftwo;