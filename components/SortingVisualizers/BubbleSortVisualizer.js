import getBubbleSortAnimations from './BubbleSort';
import { toggleDisable } from '../../utils/UtilFunc'
import consts from '../../utils/Constants'

export function bubbleSort(animSpeedMillis, array, timeouts) {
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
            barOne.style.backgroundColor = consts.COMPARISON_COLOR
            barTwo.style.backgroundColor = consts.COMPARISON_COLOR
            
            
            setTimeout(() => {
                barOne.style.backgroundColor = consts.PRIMARY_COLOR
                barTwo.style.backgroundColor = consts.PRIMARY_COLOR
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