import { Request, Response } from "express";
import eventService from "./event.service";
import { eventValidator } from "./event.validator";
import { handleError } from "../../utils/response";

class EventsController {
  /*
    |--------------------------------------------------------------------------
    | Events Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles everything that has to do with events. 
    | 
    |
    */

  /**
   * @param {Request} req this is the request coming from the client
   * @param {Response} res this is the http response given back to the client
   */
  async create(req: Request, res: Response) {
    try {
      await eventValidator(req.body);
      await eventService.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Event Successfully created'
      })
    } catch (error: any) {
      handleError(error, res)
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const events = await eventService.readAll();
      return res.status(201).json({
        success: true,
        data: events
      })
    } catch (error: any) {
      handleError(error, res)
    }
  }

  async readOne(req: Request, res: Response) {
    try {
      const event = await eventService.readOne(req.params.id);
      return res.status(201).json({
        success: true,
        data: event
      })
    } catch (error: any) {
      handleError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    try {
      await eventValidator(req.body);
      await eventService.update(req.params.id, req.body);
      return res.status(201).json({
        success: true,
        message: 'Event has been updated'
      })
    } catch (error: any) {
      handleError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await eventService.delete(req.params.id, req.body.user);
      return res.status(201).json({
        success: true,
        message: 'Event successfully deleted'
      })
    } catch (error: any) {
      handleError(error, res)
    }
  }
}

export default new EventsController();