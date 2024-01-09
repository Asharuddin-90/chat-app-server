import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

interface CustomRequest extends Request {
	userId: string | undefined
}

export const withAuth = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	let token: Secret = req.header('Authorization') || ''
	token = token.split('Bearer ')[1]
	console.log('TOKEN', token)

	if (!token) {
		res.status(401).json({ message: 'No token provided' })
		return
	}

	try {
		if (!process.env.JWT_SECRET_KEY) {
			throw new Error('JWT_SECRET_KEY not found')
		}
		const decoded: JwtPayload = jwt.verify(
			token.toString(),
			process.env.JWT_SECRET_KEY
		) as JwtPayload
		;(req as CustomRequest).userId = decoded.userId
		next()
	} catch (e) {
		res.status(403).json({ message: 'Invalid token' })
	}
}
