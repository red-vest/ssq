const {gql} = require('apollo-server-koa')
const mongoose = require('mongoose');
let {allSsqData} = require('../config');


export const typeDefs = gql`
    type BallData{
        period:String
        date:String
        redBall:[Int]
        blueBall:Int
        redBallOrder:[Int]
        amountOne:Int
        amountTwo:Int
        firstPrizeAmount:Int
        firstPrizeNumber:Int
        secondPrizeAmount:Int
        secondPrizeNumber:Int
        thirdPrizeAmount:Int
        thirdPrizeNumber:Int
        fourthPrizeAmount:Int
        fourthPrizeNumber:Int
        fifthPrizeAmount:Int
        fifthPrizeNumber:Int
    }
    type Query{
        getIndex:String
        getAllBall(blueBall:Int,redBall:[Int],period:String,date:String,firstPrizeNumber:Int):[BallData]
        getNewPeriod:[BallData]
        getLottery(blueBall:Int!,redBall:[Int]!):[BallData]
    }
    type Mutation{
        addOnePerios(post:BallList):String
    }
    input BallList{
        redBall:[Int]
        blueBall:Int
        date:String
        perios:String
    }
`;
export const resolvers = {
    Query: {
        getIndex: () => {
            return 'koa'
        },
        getAllBall: async (parent, args, context, info) => {
            let data;
            const {blueBall, redBall, period, date, firstPrizeNumber} = args;
            let key = [];
            for (let i in args) {
                if (args[i] === undefined) continue;
                key.push(i)
            }
            const filterObj = {};
            key.forEach(item => {
                if (item === 'redBall') {
                    filterObj[item] = {$all: args[item]}
                } else {
                    filterObj[item] = args[item];
                }
            })
            data = await mongoose.model('History').find(filterObj)
            return data
        },
        getNewPeriod: async (parent, args, context, info) => {
            return await mongoose.model('History').find({}).sort({period: -1}).limit(1)
        },
        getLottery: async (parent, args, context, info) => {
            const {blueBall, redBall} = args;
            const filterObj = {
                $or: [
                    {
                        $and: [
                            {blueBall},
                            {redBall: {$all: redBall}}
                        ]
                    },
                    {redBall: {$all: redBall}}
                ]
            }
            return await mongoose.model('History').find(filterObj)
        }
    },
    Mutation: {
        addOnePerios: async (parent, args, context, info) => {
            const {redBall, blueBall, date, perios} = args.post
            let data = await mongoose.model('OnePerios').create({redBall, blueBall, date, perios});
            if (data) {
                return 'success'
            }
            return 'failed'
        }
    }
};
