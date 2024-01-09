import { hashPassword, verifyPassword } from '../../helper/authHelper'
import { throwError } from '../../helper/throw-error'
import { User } from '../../models/user/user'

export async function create(data: any) {
	try {
		console.log('User Data:', data)

		const { name, email, password } = data

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			throwError(400, 'Invalid email format')
		}

		// Validate password strength (min 8 characters, at least one uppercase letter, one lowercase letter, and one number)
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
		if (!passwordRegex.test(password)) {
			throwError(
				400,
				'Password must have minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number'
			)
		}

		// Hash the password
		const hashedPassword = await hashPassword(password)

		// Create a new User instance
		const newUser = new User({
			name,
			email,
			password: hashedPassword
		})

		// Save the user data to the database
		await newUser.save()

		// Destructure the newUser object and exclude the password field
		const { password: excludedPassword, ...userWithoutPassword } =
			newUser.toObject()

		// Return the saved user data without the password
		return userWithoutPassword
	} catch (error: any) {
		console.error(error)
		throwError(error.status, error.error)
	}
}

export async function login(email: string, password: string) {
	try {
		// Find the user with the provided email
		const user: any = await User.findOne({ email })

		// If no user with the email is found, throw an error
		if (!user) {
			throwError(400, 'Invalid email or password')
		}

		// Compare the provided password with the stored hashed password
		const isMatch = await verifyPassword(password, user.password)

		// If the passwords do not match, throw an error
		if (!isMatch) {
			throwError(400, 'Invalid email or password')
		}

		// Destructure the user object and exclude the password field
		const { password: excludedPassword, ...userWithoutPassword } =
			user.toObject()

		// Return the user data without the password
		return userWithoutPassword
	} catch (error: any) {
		console.error(error)
		throwError(error.status, error.error)
		return error.error
	}
}
