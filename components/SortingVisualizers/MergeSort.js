let animations = [];

export default function getMergeSortAnimations(arr) {
    mergeSort(arr, 0, arr.length - 1);
    return animations;
}

function merge(arr, start, mid, end) {
    let start2 = mid + 1;

    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2]) return;

    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end) {

        // If element 1 is in right place
        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let value = arr[start2];
            let index = start2;

            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index !== start) {
                arr[index] = arr[index - 1];
                animations.push({
                    comparison: [index, index - 1],
                    swap: true
                })
                index--;
            }
            arr[start] = value;

            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}

function mergeSort(arr, l, r) {
    if (l < r) {
        let m = l + Math.floor((r - l) / 2);

        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}