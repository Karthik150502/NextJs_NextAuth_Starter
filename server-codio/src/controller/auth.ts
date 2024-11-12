import { Request, Response } from "express"
import prisma from "../config/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface LoginPayload {
    name: string,
    email: string,
    provider: string,
    oauth_id: string,
    image?: string
}

export default class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const body: LoginPayload = req.body;
            let findUser = await prisma.user.findUnique(
                {
                    where: {
                        email: body.email
                    }
                }
            )

            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body
                })
            }


            let JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id
            }

            const token = jwt.sign(JWTPayload, JWT_SECRET, {
                expiresIn: "365d"
            })

            res.json({
                status: 200,
                message: "Logged in successfully",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`
                }
            });
            return;
        } catch (e) {
            console.log("Failed to login, ", e)
            res.json({
                status: 500,
                message: "Something went wrong, failed to log in, try again after some time.",
            })
            return;
        }
    }
}