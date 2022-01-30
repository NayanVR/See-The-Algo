export default function getBubbleSortAnimations(arr) {

    let animations = [];

    for (let i = 0; i < arr.length - 1; i++){

        for (let j = 0; j < arr.length - i - 1; j++){

            let animation = {}
            animation.comparison = [j , j + 1]

            if (arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

                animation.swap = true
            } else {
                animation.swap = false
            }
            animations.push(animation)
        }
    }
    return animations;
}