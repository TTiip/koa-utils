import koaRouter from 'koa-router'

const router = new koaRouter()
router.get('/user', async (ctx) => {
	ctx.body="这是用户操作首页"
})
router.get('/user/register', async (ctx) => {
	ctx.body="用户注册接口"
})

export {
	router
}
