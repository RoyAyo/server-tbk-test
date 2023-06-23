import * as jwt from 'jsonwebtoken';

interface IPayload {
    walletAddress: string
}

export const generateTokenFromPayload = (payload: IPayload): string => {
    const salt = process.env.TOKEN_SECRET ?? '#iqwhqwu93jjqjddwod'
    const token: string = jwt.sign(payload, salt, {expiresIn: '2h'})
    return token
}

export const generatePayloadFromToken = (token: string): IPayload => {
    const salt = process.env.TOKEN_SECRET ?? '#iqwhqwu93jjqjddwod'
    const payload = jwt.verify(token, salt) as IPayload
    return payload
}