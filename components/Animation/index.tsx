import React, { useState } from "react";
import Lottie from 'react-lottie';

interface IAnimation {
    height: number;
    width: number;
    options: any;
}

const Animation = ({ height, width, options }: IAnimation) => {
    const [isStopped, setIsStopped] = useState()
    const [isPaused, setIsPaused] = useState()
    return (
        <Lottie
            options={options}
            height={height}
            width={width}
            isStopped={isStopped}
            isPaused={isPaused}
        />
    )
};

export default Animation;
