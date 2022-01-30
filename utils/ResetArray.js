import { randomInRange } from '../utils/UtilFunc'
import consts from './Constants'

export default function resetArray(noOfElements, setArray){
    let dummyArray = []
    for (let i = 0; i < noOfElements; i++) {
        dummyArray.push(randomInRange(consts.BAR_MIN_BOUND, consts.BAR_MAX_BOUND))
    }
    setArray(dummyArray)
}