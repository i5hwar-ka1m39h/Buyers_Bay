import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

interface UserMethods{
   checkPassword(password:string):Promise<boolean>;
   createAccToken():Promise<string>;
   createRefToken(): Promise<string>;

}


const userSchema = new mongoose.Schema<any, any, UserMethods>({
    name: {
        type: String,
        required: true,
        min: [3, "the username should be list 3 characters"],
        max: [50, "thats just too much characters in your name"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    isVendor: {
        type: Boolean,
        default: false
    },
    address: {
        line1: { type: String, default: '', required: false },
        line2: { type: String },
        city: { type: String, default: '', required: false },
        state: { type: String, default: '', required: false },
        country: { type: String, default: '', required: false },
        zipCode: { type: String, default: '', required: false }
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified()) return next();
    this.password = await bcrypt.hash(this.password as string, 10);
    next();

});

userSchema.methods.checkPassword = async function (inpassword: string) {
    const match = await bcrypt.compare(inpassword, this.password as string);
    return match;
}

userSchema.methods.createAccToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'] || '1d' }
    )
};
userSchema.methods.createRefToken = async function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'] || '2d' }
    )
};
export const User = mongoose.model("User", userSchema)

