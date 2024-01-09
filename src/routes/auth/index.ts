import { Router } from 'express'
import { create } from '../../controllers/auth'

const router = Router()

router.post('/sign-up', (req, res) => {
	res.handle(create, [req.body])
})

export default router
