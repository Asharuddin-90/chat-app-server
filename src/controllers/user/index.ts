import { throwError } from '../../helper/throw-error'
import { User } from '../../models/user/user'

export async function getAllUser() {
	try {
		const users = await User.find({}).select('-password -tokens')
		return users
	} catch (error) {
		throwError(500)
	}
}
