import React, { useState, useEffect } from 'react';
import consts from '../utils/Constants'
import resetArray from '../utils/ResetArray';
import { max, clearTheProcess } from '../utils/UtilFunc'
import { bubbleSort } from './SortingVisualizers/BubbleSortVisualizer'
import Image from 'next/image';

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
        event.target.style.backgroundSize = (noOfElements - consts.ARRAY_LENGTH_MIN) * 100 / (consts.ARRAY_LENGTH_MAX - consts.ARRAY_LENGTH_MIN) + '% 100%'
        resetArray(noOfElements, setArray)
    }
    
    function onSpeedSliderChange(event) {
        // lower bound -> low speed -> high millis
        // to achive this applied simple formula 510 - 10(slider value(low)) = 500(low speed)
        event.target.style.backgroundSize = (event.target.value - consts.ANIM_SPEED_MIN) * 100 / (consts.ANIM_SPEED_MAX - consts.ANIM_SPEED_MIN) + '% 100%'
        setAnimSpeedMillis((consts.ANIM_SPEED_MAX + consts.ANIM_SPEED_MIN) - event.target.value)
    }

    return (
    <div> 
        <div className='main-container'>
            <div className='array-container' style={{height: `${consts.BAR_MAX_BOUND + 20}px`}}>
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
            <div className='array-bottom-bar'></div>
        </div>
        <div className="bottom-container">
          <div className="gen-container">
            <button onClick={() => resetArray(noOfElements, setArray, timeouts)} className="btn gen-btn">Generate New Array</button>
          </div>
          <div className="range-container">
            <div className="range-inner-container">
              <input onChange={onElementsSliderChange} value={noOfElements} min={consts.ARRAY_LENGTH_MIN} max={consts.ARRAY_LENGTH_MAX} step="1" id="size-slider" type="range"></input>
              <label for="size-slider">SIZE</label>
            </div>
            <div className="range-inner-container">
              <input onChange={onSpeedSliderChange} value={(consts.ANIM_SPEED_MAX + consts.ANIM_SPEED_MIN)-animSpeedMillis} min={consts.ANIM_SPEED_MIN} max={consts.ANIM_SPEED_MAX} step="10" id="size-slider" type="range"></input>
              <label for="size-slider">SPEED</label>
            </div>
          </div>  
          <div className="sorting-container">
            <div className="sorting-btns-container">
              <button onClick={() => bubbleSort(animSpeedMillis, array.slice(), timeouts)} className="btn sort-btn">Bubble Sort</button>
              <button className="btn sort-btn">Coming Soon</button>
            </div>
            <div className="sorting-btns-container">
              <button className="btn sort-btn">Coming Soon</button>
              <button className="btn sort-btn">Coming Soon</button>
            </div>
          </div>
          <div className="clear-container">
            <button onClick={() => clearTheProcess(timeouts, setArray)} className='clear-btn'>
                <Image className='clear-img' src="/Clear.svg" height={40} width={40}/>
            </button>
          </div>
        </div>
    </div>
    );
}

export default AlgoVisualizer;