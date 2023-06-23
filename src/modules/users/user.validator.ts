import { object, string, date, mixed } from 'yup';

export const registerUserValidator = async (requestData: any): Promise<void> => {
  let schema = object({
    walletAddress: string().required(),
  });
  await schema.validate(requestData, { strict: true });
};

export const getUserTokenValidator = async (requestData: any): Promise<void> => {
  let schema = object({
    walletAddress: string().required(),
    signature: string().required(),
  });
  await schema.validate(requestData, { strict: true });
};
