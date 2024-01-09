import { Router } from 'express'
import { getAllUser } from '../../controllers/user'

const router = Router()

router.get('/', (req, res) => {
	res.handle(getAllUser)
})

export default router
