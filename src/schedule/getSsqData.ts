const schedule = require('node-schedule');
const got = require('got');
const mongoose = require('mongoose');
const {allSsqData} = require('../config');

const History = mongoose.model('History');

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [2,4,7];
rule.hour = [21];
rule.minute = [30,40,50]
rule.second = 0;
const getSsqData = schedule.scheduleJob(rule, async function () {
    try {
        const data = await got('http://www.17500.cn/getData/ssq.TXT');
        const text = data.body;
        const tempArr = text.split('\n');
        const arr = [];
        for (let i in tempArr) {
            if (tempArr[i] === '') continue;
            arr.push(tempArr[i].split(' '));
        }
        const historyData: any[] = await History.find({});
        if(historyData.length===arr.length) return;

        for(let i = historyData.length;i<arr.length;i++){
            let item = arr[i];
            if(item==='') return;
            let tempData = {
                period: item[0],
                date: item[1],
                redBall: [parseInt(item[2]),parseInt(item[3]),parseInt(item[4]),parseInt(item[5]),parseInt(item[6]),parseInt(item[7])],
                blueBall: parseInt(item[8]),
                redBallOrder:[parseInt(item[9]),parseInt(item[10]),parseInt(item[11]),parseInt(item[12]),parseInt(item[13]),parseInt(item[14])],
                amountOne:parseInt(item[15]),
                amountTwo:parseInt(item[16]),
                firstPrizeAmount:parseInt(item[18]),
                firstPrizeNumber:parseInt(item[17]),
                secondPrizeAmount:parseInt(item[20]),
                secondPrizeNumber:parseInt(item[19]),
                thirdPrizeAmount:parseInt(item[22]),
                thirdPrizeNumber:parseInt(item[21]),
                fourthPrizeAmount:parseInt(item[24]),
                fourthPrizeNumber:parseInt(item[23]),
                fifthPrizeAmount:parseInt(item[26]),
                fifthPrizeNumber:parseInt(item[25]),
                createTime:new Date().getTime()
            }
            History.create(tempData)
        }
    } catch (err) {
        console.log(err)
    }
})

export {}
