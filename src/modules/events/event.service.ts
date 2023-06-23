import { Request, Response } from "express";
import { Event } from "../../database";

class EventService {

  async create(data: any) {
    const user = data.user;

    delete data.user;

    await Event.create({
      ...data,
      user_id: user.id
    });
  }

  async readAll() {
    return Event.findAll({include: 'user'});
  }

  async readOne(id: string) {
    return Event.findOne({
      where: {
        id
      },
    })
  }

  async update(id: string, data: any) {
    const user = data.user;

    const event: any = await Event.findOne({
      where: {
        id
      },
    })

    if(!event) throw new Error('Invalid event');

    if(event.user_id !== user.id) throw new Error("Only the creator can modify event");

    await Event.update({
      ...data
    }, {
      where: {
        id
      }
    });
  }

  async delete(id: string, user: any) {
    const event: any = await Event.findOne({
      where: {
        id
      },
    })

    if(!event) throw new Error('Invalid event');

    if(event.user_id !== user.id) throw new Error("Only the creator can modify event");

    return Event.destroy({
      where: {
        id
      },
    })
  }
}

export default new EventService();