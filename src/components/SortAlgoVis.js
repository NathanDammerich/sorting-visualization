import React, { Component } from 'react'
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import HeapSort from './HeapSort';
import BubbleSort from './BubbleSort';
import './SortAlgoVis.css';



export class SortAlgoVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: getNewArray(30),
            keepGoing: true,
            isSorting: false
        };
        this.resetArray = this.resetArray.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.heapSort = this.heapSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.sortAlgos = this.sortAlgos.bind(this);
        this.visualizeAlgos = this.visualizeAlgos.bind(this);
        this.isSorted = this.isSorted.bind(this);

    }

    componentDidMount() {
        this.resetArray()
    }

    isSorted() {
        const mA = JSON.parse(JSON.stringify(this.state.array[3]));
        const bA = JSON.parse(JSON.stringify(this.state.array[2]));
        const hA = JSON.parse(JSON.stringify(this.state.array[1]));
        const qA = JSON.parse(JSON.stringify(this.state.array[0]));
        for (let i = 0; i < mA.length; i++) {
            mA[i] = mA[i][0];
            bA[i] = bA[i][0];
            hA[i] = hA[i][0];
            qA[i] = qA[i][0];
        }
        return (arraysAreEqual(mA, mA.slice().sort((a, b)=>a-b)) && arraysAreEqual(bA, bA.slice().sort((a, b)=>a-b)) && arraysAreEqual(hA, hA.slice().sort((a, b)=>a-b)) && arraysAreEqual(qA, qA.slice().sort((a, b)=>a-b)));

    }

    resetClick() {
        console.log("reset dad clicked");
    }

    resetArray() {
        console.log("reset array clicked");
        let currSorted = this.isSorted();
        console.log(currSorted);
        if (this.state.isSorting && !currSorted) return
        const newArray = getNewArray(30);
        this.setState((state) => {return {
            keepGoing: false,
            isSorting: false
        }});
        
        let a = newArray;
        let b = newArray;
        let c = newArray;
        let d = newArray;
        const myArray = [a, b, c, d];
        this.setState((state) => { return {
            array: myArray
        }})
    }

    sortAlgos() {
        if (this.state.isSorting) return;
        this.setState((state) => { return {
            keepGoing: true,
            isSorting: true
        }});
        
        this.mergeSort();
        this.bubbleSort();
        this.heapSort();
        this.quickSort();
    }

    quickSort() {
        let myState = JSON.parse(JSON.stringify(this.state.array));
        let myArray = [];
        for (let i = 0; i < myState[0].length; i++) {
            myArray[i] = myState[0][i][0];
        }
        const quickAnimations = quickSortAnimations(myArray);
        this.visualizeAlgos(quickAnimations, 0);
    }

    heapSort() {
        let myState = JSON.parse(JSON.stringify(this.state.array));
        let myArray = [];
        for (let i = 0; i < myState[1].length; i++) {
            myArray[i] = myState[1][i][0];
        }
        const heapAnimations = heapSortAnimations(myArray);
        this.visualizeAlgos(heapAnimations, 1);
    }

    bubbleSort() {
        let myState = JSON.parse(JSON.stringify(this.state.array));
        let myArray = [];
        for (let i = 0; i < myState[2].length; i++) {
            myArray[i] = myState[2][i][0];
        }
        const bubbleAnimations = bubbleSortAnimations(myArray);
        this.visualizeAlgos(bubbleAnimations, 2);
    }

    mergeSort() {
        let myState = JSON.parse(JSON.stringify(this.state.array));
        let myArray = [];
        for (let i = 0; i < myState[3].length; i++) {
            myArray[i] = myState[3][i][0];
        }
        const mergeAnimations = mergeSortAnimations(myArray);
        this.visualizeAlgos(mergeAnimations, 3);
    }

    visualizeAlgos(animations, numArray) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                if (!this.state.keepGoing) return;
                let mergeState = JSON.parse(JSON.stringify(this.state.array));
                if (animations[i][2] === 0) {
                    if (animations[i][0] >= 0 && animations[i][1] >= 0) {
                        mergeState[numArray][animations[i][0]][1] = 'red';
                        mergeState[numArray][animations[i][1]][1] = 'red';
                    }
                } else if (animations[i][2] === 1) {
                    if (animations[i][0] >= 0 && animations[i][1] >= 0) {
                        mergeState[numArray][animations[i][0]][1] = 'blue';
                        mergeState[numArray][animations[i][1]][1] = 'blue';
                    }
                } else {
                    mergeState[numArray][animations[i][0]][0] = animations[i][1];
                }
                this.setState((state) => { return {
                    array: mergeState
                }});
            }, i*50)
        }
        setTimeout(() => {
            if (!this.state.keepGoing) return;
            let currState = JSON.parse(JSON.stringify(this.state.array));
            for (let i = 0; i < currState[numArray].length; i++) {
                currState[numArray][i][1] = 'green';
            }
            this.setState((state) => { return {
                array: currState
            }});
        }, animations.length*50+100)
    }

    render() {
        return (
            <div className="sortContainer">
                <div className="resetDad" onClick={this.resetClick}>
                <button className="button1Style" onClick={this.resetArray}>Reset</button>
                </div>
                <div className="sortDad">
                <button className="button2Style" onClick={this.sortAlgos}>Sort</button>
                </div>
                <MergeSort array={this.state.array}/>
                <QuickSort array={this.state.array}/>
                <HeapSort array={this.state.array}/>
                <BubbleSort array={this.state.array}/>
            </div>
        )
    }
}

function quickSortAnimations(array) {
    let quickAnim = [];

    quickSortHelper(array, 0, array.length - 1, quickAnim);

    return quickAnim;
}

function quickSortHelper(array, startIdx, endIdx, quickAnim) {
    if (startIdx >= endIdx) {
        return;
    }
    const pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
    while (rightIdx >= leftIdx) {
        quickAnim.push([leftIdx, pivotIdx, 0]);
        quickAnim.push([leftIdx, pivotIdx, 1]);
        quickAnim.push([rightIdx, pivotIdx, 0]);
        quickAnim.push([rightIdx, pivotIdx, 1]);

        if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
            quickSwap(leftIdx, rightIdx, array, quickAnim);
        }
        if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
        if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
    }
    quickSwap(pivotIdx, rightIdx, array, quickAnim);
    const leftSubArrayIsSmaller = (rightIdx - 1 - startIdx) < (endIdx - (rightIdx + 1));
    if (leftSubArrayIsSmaller) {
        quickSortHelper(array, startIdx, rightIdx - 1, quickAnim);
        quickSortHelper(array, rightIdx + 1, endIdx, quickAnim);
    } else {
        quickSortHelper(array, rightIdx + 1, endIdx, quickAnim);
        quickSortHelper(array, startIdx, rightIdx - 1, quickAnim);
    }
}

function quickSwap(i, j, array, quickAnim) {
    let temp = array[j];
    array[j] = array[i];
    quickAnim.push([j, array[i], 2]);    
    array[i] = temp;
    quickAnim.push([i, temp, 2]);

}

function heapSortAnimations(array) {
    let heapAnim = []

    buildMaxHeap(array, heapAnim);
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
        heapSwap(0, endIdx, array, heapAnim);
        siftDown(0, endIdx - 1, array, heapAnim);
    }
    return heapAnim;
}

function buildMaxHeap(array, heapAnim) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.length - 1, array, heapAnim);
    }
}

function siftDown(currentIdx, endIdx, heap, heapAnim) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
        const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        let idxToSwap;
        heapAnim.push([childTwoIdx, childOneIdx, 0]);
        heapAnim.push([childTwoIdx, childOneIdx, 1]);
        if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
            idxToSwap = childTwoIdx;
        } else {
            idxToSwap = childOneIdx;
        }
        heapAnim.push([idxToSwap, currentIdx, 0]);
        heapAnim.push([idxToSwap, currentIdx, 1]);
        if (heap[idxToSwap] > heap[currentIdx]) {
            heapSwap(currentIdx, idxToSwap, heap, heapAnim);
            currentIdx = idxToSwap;
            childOneIdx = currentIdx * 2 + 1;
        } else {
            return;
        }
    }
}

function heapSwap(i, j, array, heapAnim) {
    const temp = array[j];
    array[j] = array[i];
    heapAnim.push([j, array[i], 2]);
    array[i] = temp;
    heapAnim.push([i, temp, 2]);

}

function bubbleSortAnimations(array) {
    let bubAnim = []

    for (let i = array.length; i > 0; i--){
        for (let j = 0; j < i-1; j++) {
            bubAnim.push([j, j+1, 0]);
            bubAnim.push([j, j+1, 1]);
            if (array[j] > array[j+1]) {
                let temp = array[j+1];
                array[j+1] = array[j];
                bubAnim.push([j+1, array[j], 2]);
                array[j] = temp;
                bubAnim.push([j, temp, 2]);
            }
        }
    }
    return bubAnim;
}

function mergeSortAnimations(array) {
    let animations = [];

    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j, 0]);
        animations.push([i, j, 1]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i], 2])
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j], 2]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([k, auxiliaryArray[i], 2]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([k, auxiliaryArray[j], 2]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


const getNewArray = (size) => {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push([getRandomInt(5, 210), 'blue']);
    }
    return array;
}

function arraysAreEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

let myArray = getNewArray();




const buttonClick = () => {
    const newArray = getNewArray();
    myArray = newArray;
}


export default SortAlgoVis
