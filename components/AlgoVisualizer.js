import React, { useState, useEffect } from 'react';
import consts from '../utils/Constants'
import resetArray from '../utils/ResetArray';
import { max, clearTheProcess } from '../utils/UtilFunc'
import { bubbleSort } from './SortingVisualizers/BubbleSortVisualizer'

function AlgoVisualizer() {

    let timeouts = []

    const [array, setArray] = useState([])
    const [noOfElements, setNoOfElements] = useState(consts.ARRAY_LENGTH_MAX)
    const [animSpeedMillis, setAnimSpeedMillis] = useState(consts.ANIM_SPEED_MIN)

    useEffect(() => {
        resetArray(noOfElements, setArray)
    }, []);

    function onElementsSliderChange(event) {
        setNoOfElements(event.target.value)
        resetArray(noOfElements, setArray)
    }

    function onSpeedSliderChange(event) {
        // lower bound -> low speed -> high millis
        // to achive this applied simple formula 510 - 10(slider value(low)) = 500(low speed)  
        setAnimSpeedMillis((consts.ANIM_SPEED_MAX + consts.ANIM_SPEED_MIN) - event.target.value)
    }

    return (
    <div> 
        <div className='container' style={{height: `${consts.BAR_MAX_BOUND + 20}px`}}>
            {
                array.map((number, index) => {
                    return <div 
                        className='array-bar' 
                        key={index} 
                        style={{
                            height: `${number}px`,
                            width: `${max(54 - (noOfElements * 4 / 5), 6)}px`
                        }}>
                            {noOfElements <= 20 && number}
                        </div>
                })
            }
        </div>
        <button onClick={() => resetArray(noOfElements, setArray, timeouts)} className='btn'>Generate New Array</button>
        <input id="elementsSlider" onChange={onElementsSliderChange} value={noOfElements} step="1" className="slider" type="range" min={consts.ARRAY_LENGTH_MIN} max={consts.ARRAY_LENGTH_MAX}></input>
        <input id="speedSlider" onChange={onSpeedSliderChange} value={(consts.ANIM_SPEED_MAX + consts.ANIM_SPEED_MIN)-animSpeedMillis} step="10" className="slider" type="range" min={consts.ANIM_SPEED_MIN} max={consts.ANIM_SPEED_MAX}></input>
        <button className='btn' onClick={() => bubbleSort(animSpeedMillis, array.slice(), timeouts)}>Bubble Sort</button>
        <button onClick={() => clearTheProcess(timeouts, setArray)}>Kill</button>
    </div>
    );
}

export default AlgoVisualizer;