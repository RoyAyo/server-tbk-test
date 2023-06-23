import { Request, Response, NextFunction } from 'express'
import { User } from '../../database'
import { generatePayloadFromToken } from '../../helpers'
import { handleError } from '../../utils/response'

// import { handleError } from '../utils/apiResponse'

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')
        )
            throw new Error('You need to connect to wallet to access this route//401')

        const token = req.headers.authorization.split(' ')[1]
        if (!token) throw new Error('Not authorized to access this route without wallet//401')

        const {
            walletAddress
        } = generatePayloadFromToken(token);

        const user = await User.findOne({
            where: {
                walletAddress
            }
        });
        if (!user) throw new Error('Invalid User Found in Token//401')

        req.body.user = user
        next()
    } catch (error: any) {
        handleError(error, res)
    }
}
