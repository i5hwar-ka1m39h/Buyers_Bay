
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/apiErrHandler";
import { ApiResponse } from "../utils/apiResHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';

class UserController {
    // Make this a private method of the class with proper typing
    private genrateAccessAndRefreshToken = async (userId: any) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new ApiError(404, "User not found");
            }

            const accessToken = await user.createAccToken();
            const refreshToken = await user.createRefToken();

            user.refreshToken = refreshToken;
            await user.save();

            return { accessToken, refreshToken };
        } catch (error) {
            console.log(error);

            throw new ApiError(500, "Error generating the tokens");
        }
    }

    registerUser = asyncHandler(async (req: Request, res: Response) => {
        // Get body with email, password, username
        const { email, password, username } = req.body;

        // Check if any field is empty
        const isThereSingleEmpty = [email, password, username].some(string => string?.trim().length === 0);
        if (isThereSingleEmpty || !email || !password || !username) {
            throw new ApiError(400, "Bad request, empty string for email, password or username");
        }

        // Check for duplicate email or username
        const doesMailExist = await User.findOne({
            $or: [{ email }, { name: username }]
        });

        if (doesMailExist) throw new ApiError(409, "Email or username already in use");

        // Create db entry
        const newUser = await User.create({
            email,
            name: username,
            password
        });

        // Get response from db, remove password and refresh token
        const checkUser = await User.findById(newUser._id).select("-password -refreshToken");

        if (!checkUser) throw new ApiError(500, "Unable to create user");

        // Return response
        return res.status(201).json(
            new ApiResponse(201, "User created successfully", checkUser)
        );
    });

    loginUser = asyncHandler(async (req: Request, res: Response) => {
        // Take body
        const { username, email, password } = req.body;

        // Check if username or email is provided
        if (!username && !email) {
            throw new ApiError(400, "Username or email is required");
        }

        // Check if the user exists
        const user = await User.findOne({
            $or: [{ email }, { name: username }]
        });

        if (!user) {
            throw new ApiError(404, "User doesn't exist");
        }

        // Check if password is correct
        const isPassValid = await user.checkPassword(password);
        console.log(isPassValid);

        if (!isPassValid) {
            throw new ApiError(401, "Password is wrong, unauthorized");
        }

        // Generate tokens
        const { accessToken, refreshToken } = await this.genrateAccessAndRefreshToken(user._id);

        // Get user without sensitive data
        const loggedUser = await User.findById(user._id).select("-password -refreshToken");

        // Set cookies with tokens
        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, "User logged in successfully", {
                    user: loggedUser,
                    accessToken,
                    refreshToken
                })
            );
    });

    logOut = asyncHandler(async (req: Request, res: Response) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(200, "user logged out", {})
            )
    })

    resetToken = asyncHandler(async (req: Request, res: Response) => {
        const inRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!inRefreshToken) {
            throw new ApiError(401, "Unauthorized, no incoming token");
        }

        try {
            const decodedToken = await jwt.verify(inRefreshToken, process.env.REFRESH_TOKEN_SECRET as unknown as string);

            if (typeof decodedToken === 'string' || !("_id" in decodedToken)) {
                throw new ApiError(401, "Unauthorized, no invalid token")
            }

            const userId = (decodedToken as JwtPayload)._id;
            const user = await User.findById(userId);

            if (inRefreshToken !== user?.refreshToken) {
                throw new ApiError(404, "Unauthorized, tokens does't match or expired")
            }

            const tokens = await this.genrateAccessAndRefreshToken(user?._id);

            const options = {
                httpOnly: true,
                secure: true
            };

            return res.status(200)
                .cookie("accessToken", tokens.accessToken, options)
                .cookie("refreshToken", tokens.refreshToken, options)
                .json(
                    new ApiResponse(200, "access token refreshed successfully", {
                        accessToken: tokens.accessToken,
                        refeshToken: tokens.refreshToken

                    })
                );
        } catch (error) {
            console.error(error);
            throw new ApiError(500, "something went wrong while refreshing token")

        }
    })
}

export default new UserController();