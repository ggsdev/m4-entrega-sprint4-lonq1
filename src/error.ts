import { NextFunction } from "express";

// class AppError extends Error {
//     constructor(statusCode = 400, message:string) {
//         super();
//         this.message = message ;
//         this.statusCode = statusCode;
//     }
// }

// function errorHandler(error:Error, request:Request, response: Response, next:NextFunction) {
//     const { statusCode, message } = error;
//     if (error instanceof AppError) {
//         return response.status(statusCode).json(message);
//     }

//     return response.status(404).json({ message: "Internal server error." });
// }

// export { AppError, errorHandler };
