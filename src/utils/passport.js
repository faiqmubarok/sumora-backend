import passport from "passport";
import userRepository from "../user/user.repository.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../config/prisma.js";
import dotenv from "dotenv";
dotenv.config();

const { findUserByEmail, findUserById } = userRepository;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;

        if (!email) {
            return done(new Error("No email found in Google profile"), null);
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: profile.displayName,
                photo: {
                    url: profile.photos?.[0]?.value,
                    publicId: null,
                },
                googleId: profile.id,
            },
        });

        return done(null, newUser);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id);
    done(null, user);
});
