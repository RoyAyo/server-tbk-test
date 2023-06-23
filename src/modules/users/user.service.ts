import { User } from "../../database";
import { generateTokenFromPayload } from "../../helpers";
import { verifyMessage } from 'ethers'

class UserService {

  /**
   * @param {body} walletAddress this is the walletAddress of the user.
   */


  async registerWallet(walletAddress: string, signature?: string) {
    let user: any = await User.findOne({
        where: {
            walletAddress
        }
    })
    console.log(user);
    if(!user) {
      const nonce = Math.floor(Math.random() * 10000);
       user = await User.create({
        walletAddress,
        nonce
       });
       return user
    } else {
      return user
    }
  }

  async createToken(walletAddress: string, signature: string) {
      let user: any = await User.findOne({
          where: {
              walletAddress
          }
      })
      if(!user) throw new Error('something error')
      const address = verifyMessage(user.nonce, signature)
      if(address === walletAddress) {
        const tokenPayload = {
            walletAddress
        }
        const token = generateTokenFromPayload(tokenPayload)
        return {
          _token: token
        }
      } else {
        throw new Error('Invalid signature provided//401')
      }
    }

  async isWhitelist(user: any) {
    await User.update({
      isWhitelisted: true
    }, {
      where: {
        id: user.id
      }
    })
  }
}

export default new UserService();