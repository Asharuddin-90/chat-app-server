import enhance from '@cloudedots/enhanced-express'
import bodyParser from 'body-parser'
import log from './logger'
import { Application } from 'express'

export const useBodyParser = (expressInstance: Application) => {
	expressInstance.use(
		bodyParser.urlencoded({
			extended: true
		})
	)
	expressInstance.use(
		bodyParser.json({
			limit: '100mb'
		})
	)
}

export const useEnhancedExpress = (expressInstance: Application) => {
	// Ensure the log object is defined
	if (!log) {
		console.error(
			'The log object is not defined. Please check your configuration.'
		)
		process.exit(1) // Exit the process or handle it accordingly
	}

	expressInstance.use(
		enhance({
			logger: log
		})
	)
}
