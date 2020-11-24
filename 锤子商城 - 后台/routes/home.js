const router = require('koa-router')()//引入并实例化路由
const {query} = require('../mysql/db')

//获取热门商品
router.get('/hotProduct', async (ctx,next)=>{
    try{    
        let result = await query('select * from products where type = 1 limit 4');
        ctx.body = {
            code: 0,
            data:result
        };
    }catch(err){
        ctx.body = {
            code: 1,
            message:'服务器错误'
        };
    }
    
})

module.exports = router.routes();