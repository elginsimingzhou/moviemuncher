import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });

  // res.clearCookie('token');
};
