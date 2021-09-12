import React, {useState, useEffect} from "react";

interface IProps {
    value: string,
}

const Test = (props: IProps) => {

    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        setCounter(0);
    }, []);


    return <div
        style={{
            textAlign: 'center'
        }}
    >
        <h1>{props.value} - {counter} </h1>
    </div>
}

export default Test;
