const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaStatic = require('koa-static')
const {ApolloServer} = require('apollo-server-koa');
const {typeDefs, resolvers} = require('./graphql/schema');
const {PORT, allSsqData} = require('./config');
const compress = require('koa-compress')

require('./mongodb');
require('./schedule/getSsqData');

const app = new Koa();
const apollo = new ApolloServer({
    typeDefs, resolvers,context:({ctx})=> {
        let token = ctx.request.header.authorization || ''
        return {user:''}
    }
})

app.use(logger());
app.use(compress({
    filter(content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false // disable brotli
}))
app.use(bodyParser());
app.use(koaStatic(__dirname + './static'))
app.use(async (ctx, next) => {
    ctx.compress = true;
    await next()
})
app.use(apollo.getMiddleware())
app.listen(PORT);
console.log(`server run port ${PORT}`)

