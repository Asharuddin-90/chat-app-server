import { Router } from 'express'
import { create, login } from '../../controllers/auth'

const router = Router()

router.post('/sign-up', (req, res) => {
	res.handle(create, [req.body])
})
router.post('/login', (req, res) => {
	res.handle(login, [req.body.email, req.body.password])
})

export default router
