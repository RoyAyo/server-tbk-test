import { object, string, date, mixed } from 'yup';

export const eventValidator = async (requestData: any): Promise<void> => {
  let schema = object({
    name: string().required(),
    user: mixed().nullable(),
  });
  await schema.validate(requestData, { strict: true });
};

