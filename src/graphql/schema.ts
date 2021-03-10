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
        getAllBall:[BallData]
        getNewPeriod:[BallData]
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
            if (allSsqData.length === 0) {
                data = await mongoose.model('History').find({})
                allSsqData = [...data]
            } else {
                data = allSsqData;
            }
            return data
        },
        getNewPeriod: async (parent, args, context, info) => {
            return await mongoose.model('History').find({}).sort({period: -1}).limit(1)
        }
    },
    Mutation: {
        addOnePerios: async (parent,args,context,info)=>{
            const {redBall,blueBall,date,perios}= args.post
            let data = await mongoose.model('OnePerios').create({redBall,blueBall,date,perios});
            if(data){
                return 'success'
            }
            return 'failed'
        }
    }
};
