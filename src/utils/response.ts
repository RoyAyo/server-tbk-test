import { Response, Request } from 'express'
import { validationResult, ValidationError, Result } from 'express-validator'
import databaseErrorHandlers from './database-error'

export default function (error: any) {
    return {
        status: 'error',
        code: 500,
        error: error,
        message: 'Server related errors',
        data: null,
    }
}

export const handleError = (err: any, res: Response, last: number = 400) => {
    let error = err
    let code = 400
    let message: string | any[]

    switch (error.name) {
        case 'TypeError':
        case 'URIError':
        case 'ReferenceError':
            ;(error = 'Server Error'), (code = 500)
            break
        case 'ValidationError':
            message = Object.values(error.errors).map((val: any) => val)
            error = message[0]
            code = 400
            break
        case "SequelizeDatabaseError":
        case  "SequelizeUniqueConstraintError":
        case  "SequelizeValidationError":
        case  "SequelizeForeignKeyConstraintError":
            const { message: dbMessage, code: dbCode } = databaseErrorHandlers(error)
            message = dbMessage
            code = dbCode
            error = true
            break
        default:
            message = error.message
            error = message
            code = 400
            break
    }

    console.log("My custom error")
    // my custom typa error..
    if (err?.message?.split('//')?.length > 1) {
    console.log("My custom error 2")
    error = err?.message?.split('//')[0]
        code = err?.message?.split('//')[1]
            ? Number(err?.message?.split('//')[1])
            : 422
    }

    if (typeof error === 'object' && !Array.isArray(error)) {
        let errorEngine = []
        // ship engine error reformation
        for (const [key, value] of Object.entries(error)) {
            if (key === 'errors') {
                for (const errorElement of value as [
                    { message: string; field_name: string }
                ]) {
                    errorEngine.push({
                        param: errorElement?.field_name ?? null,
                        msg: errorElement?.message ?? null,
                    })
                }
            }
        }
        error = errorEngine
    }

    if (typeof err === 'string' && err.startsWith('Value for argument'))
        error = 'Invalid arguments.'
    if (
        typeof err === 'string' &&
        err.startsWith("Cannot use 'in' operator to search for")
    )
        error = err.substring(49)

    if (typeof err === 'string' && err.startsWith('{')) {
        const messageError = JSON.parse(err)
        error = messageError?.message
        code = messageError?.code
    }

    res.status(code ?? 400).json({
        status: 'fail',
        code: code ?? 400,
        error: error ? true : false,
        message: error,
        data: null,
    })
}

export const successResponse = (
    res: Response,
    message: string,
    data?: object,
    meta?: any
): Response => {
    return res.status(200).json({
        code: 200,
        status: 'success',
        message,
        data: data ?? {},
        meta,
    })
}

export const expressValidator = (req: Request): ValidationError[] => {
    const errors: Result<ValidationError> = validationResult(req)

    const messages: ValidationError[] = []
    if (!errors.isEmpty()) {
        for (const i of errors.array()) {
            messages.push(i)
        }
    }
    return messages
}
