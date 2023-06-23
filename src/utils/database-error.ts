import { statusCodes } from "./constants";

const databaseErrorHandlers = (error: any) => {
  const { name, message } = error;

  if (name === "SequelizeValidationError") {
    if (error.errors[0].type === "notNull Violation") {
        return {
            message: `${error.errors[0].path} is required.`,
            code: statusCodes.UNPROCESSABLE_ENTITY,
        }
    }
  } else {
    switch (name) {
      case "SequelizeForeignKeyConstraintError":
        return {
            message: "Foreign key constraint violation",
            code: statusCodes.CONFLICT,
        }
        break;

      case "SequelizeDatabaseError":
      default:
        return {
            code: statusCodes.INTERNAL_SERVER_ERROR,
            title: message,
        }
        break;
    }
  }
  return error;
};

export default databaseErrorHandlers;