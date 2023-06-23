import { Request, Response } from "express";
import userService from "./user.service";
import { handleError } from "../../utils/response";
import { getUserTokenValidator, registerUserValidator } from "./user.validator";

class UserController {
  /*
    |--------------------------------------------------------------------------
    | User Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles everything that has to do with User registration. 
    | 
    |
    */

  /**
   * @param {Request} req this is the request coming from the client
   * @param {Response} res this is the http response given back to the client
   */
  async register(req: Request, res: Response) {
    try {
      await registerUserValidator(req.body);
      const walletAddress = req.body.walletAddress;
      const data = await userService.registerWallet(walletAddress);
      return res.json({
        data,
        success: true
      })
    } catch (error: any) {
      handleError(error, res);
    }
  }

  async createToken(req: Request, res: Response) {
    try {
      await getUserTokenValidator(req.body);
      const {
        walletAddress,
        signature
      } = req.body;
      const data = await userService.createToken(walletAddress, signature);
      return res.json({
        data,
        success: true
      })
    } catch (error: any) {
      handleError(error, res);
    }
  }

  async isWhitelist(req: Request, res: Response) {
    try {
      await userService.isWhitelist(req.body.user);
      return res.json({
        success: true
      })
    } catch (error: any) {
      handleError(error, res);
    }
  }
}

export default new UserController();