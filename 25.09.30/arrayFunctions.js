

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getOtosLotteryNumbers(){
    let nums = [];

    for(let i = 0; i<5; i++){
        nums.push(getRndInteger(1,91));
    }
    return nums;
}

function getSortedLotteryNumbers(nums){
    return nums.toSorted((a,b)=>a-b);
}

function getNumberOfHits(lotteryNums, playerNums){
    let hits = 0;
    playerNums.forEach(num => {

        lotteryNums.forEach(num2 => {
            if (num === num2) hits++;
        })
    });
    return hits
}

function getMonthlyLotteryArrayNumbers(){
    let output = [];
    for (let i = 0; i < 4; i++){
        let temp = []
        temp.push(getOtosLotteryNumbers());
        output.push(temp)
    }

}

function getMonthlyLotteryNumbers(lotteryNums){

    let hits = []
    lotteryNums.forEach(i => {
        i.forEach(j => {
            if (!hits.includes(j)){
                hits.push(j)
            }
        })
    })
    return hits;
}
function monthlyStatistics(nums){
    
    for(let i = 0; i < 90;i++){
        out.push({i:0});
    }
    out.forEach(x => console.log(x));
    
};
function monthlyStatistics(nums){
    let out = [];
    for (let i = 0; i<91; i++){
        
        }
    
    
    return out;
}