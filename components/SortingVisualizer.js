import React, { useState, useEffect } from 'react';
import getBubbleSortAnimations from './SortingAlgo';

function SortingVisualizer() {

    const BAR_MIN_BOUND = 20;
    const BAR_MAX_BOUND = 400;
    const ARRAY_LENGTH_MIN = 5;
    const ARRAY_LENGTH_MAX = 100;
    const ANIM_SPEED_MIN = 10;
    const ANIM_SPEED_MAX = 500;
    const PRIMARY_COLOR = 'blue';
    const COMPARISON_COLOR = 'red';
    const SORTED_COLOR = 'green';
    let timeouts = [];

    const [array, setArray] = useState([])
    const [noOfElements, setNoOfElements] = useState(ARRAY_LENGTH_MAX)
    const [animSpeedMillis, setAnimSpeedMillis] = useState((ANIM_SPEED_MIN))

    useEffect(() => {
        resetArray()
    }, []);
    
    function resetArray(){
        let dummyArray = []
        for (let i = 0; i < noOfElements; i++) {
            dummyArray.push(randomInRange(BAR_MIN_BOUND, BAR_MAX_BOUND))
        }
        setArray(dummyArray)
    }

    function bubbleSort() {
        const animations = getBubbleSortAnimations(array)
        const arrayBars = document.getElementsByClassName('array-bar')
        
        toggleDisable(true)
        timeouts.push(setTimeout(() => {
            toggleDisable(false)
        }, animations.length * animSpeedMillis));

        for (let index = 0; index < animations.length; index++) {
            
            let { comparison, swap } = animations[index]
            let [ i, j ] = comparison

            
            let barOne = arrayBars[i]
            let barTwo = arrayBars[j]
            
            timeouts.push(setTimeout(() => {
                barOne.style.backgroundColor = COMPARISON_COLOR
                barTwo.style.backgroundColor = COMPARISON_COLOR
                
                
                setTimeout(() => {
                    barOne.style.backgroundColor = PRIMARY_COLOR
                    barTwo.style.backgroundColor = PRIMARY_COLOR
                    if (swap) {
                        let tempHeight = barOne.style.height;
                        let tempText = barOne.innerHTML;

                        barOne.innerHTML = barTwo.innerHTML
                        barOne.style.height = barTwo.style.height;

                        barTwo.innerHTML = tempText;
                        barTwo.style.height = tempHeight;
                    }
                }, animSpeedMillis * 0.8);
            }, index * animSpeedMillis));
        }
    }

    function toggleDisable(toDisbale) {
        document.querySelectorAll('.btn').forEach(ele => ele.disabled = toDisbale)
        document.querySelectorAll('.slider').forEach(ele => ele.disabled = toDisbale)
    }

    function onElementsSliderChange(event) {
        setNoOfElements(event.target.value)
        resetArray()
    }

    function onSpeedSliderChange(event) {
        // lower bound -> low speed -> high millis
        // to achive this applied simple formula 510 - 10(slider value(low)) = 500(low speed)  
        setAnimSpeedMillis((ANIM_SPEED_MAX + ANIM_SPEED_MIN) - event.target.value)
    }

    function clearTheTask() {
        timeouts.forEach(ele => clearTimeout(ele))

        toggleDisable(false)

        let arr = []
        const bars = document.getElementsByClassName('array-bar')
        for (let i = 0; i < bars.length; i++) {
            arr.push(parseInt(bars[i].style.height, 10));
        }
        setArray(arr)
    }

    function randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function max(a, b) {
        return a > b ? a : b
    }

    return (
    <div> 
        <div className='container' style={{height: `${BAR_MAX_BOUND + 20}px`}}>
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
        <button onClick={() => resetArray()} className='btn'>Generate New Array</button>
        <input id="elementsSlider" onChange={onElementsSliderChange} value={noOfElements} step="1" className="slider" type="range" min={ARRAY_LENGTH_MIN} max={ARRAY_LENGTH_MAX}></input>
        <input id="speedSlider" onChange={onSpeedSliderChange} value={(ANIM_SPEED_MAX + ANIM_SPEED_MIN)-animSpeedMillis} step="10" className="slider" type="range" min={ANIM_SPEED_MIN} max={ANIM_SPEED_MAX}></input>
        <button className='btn' onClick={() => bubbleSort(array.slice())}>Bubble Sort</button>
        <button onClick={() => clearTheTask()}>Kill</button>
    </div>
    );
}

export default SortingVisualizer;