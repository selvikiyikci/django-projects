let longestCollatzSequence = (lim) => {   
    let longestSeq = 1
    let longestVal = 1
    let startVal

    for(startVal = 2; startVal < lim; startVal ++){
        let numOfTerms = 1
        let currTerm = startVal

        while(currTerm != 1){
            if(currTerm % 2 === 0){
                currTerm = currTerm / 2
            }
            else {
                currTerm = ((3 * currTerm) + 1)
            }
            numOfTerms = numOfTerms + 1
        }
        if(numOfTerms > longestSeq){
            longestSeq = numOfTerms
            longestVal = startVal
        }
    }
    return longestVal
}
console.log('Result is ' + longestCollatzSequence(1000000))