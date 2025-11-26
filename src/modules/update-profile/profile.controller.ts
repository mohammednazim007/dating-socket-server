import { NextFunction, Request, Response } from "express";
import { securityValidation, SecuritySchemaType } from "./profile.validation";
import { updateProfileSecurity } from "./profile.service";
import { ZodError } from "zod";
import { handleZodError } from "@/utils/handleZodError";

export const updateSecurityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const parsedData: SecuritySchemaType = securityValidation.parse(req.body);
    const updatedUser = await updateProfileSecurity(userId, parsedData);

    return res.status(200).json({
      success: true,
      message: "Security settings updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(handleZodError(error));
    }
    next(error);
  }
};
