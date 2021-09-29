import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            // find user with username
            const user = await client.user.findFirst({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            //check password with password argument
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordMatch) {
                return {
                    ok: false,
                    error: "Invalid password",
                };
            }

            // issue a token and send it to the user
            const token = await jwt.sign(
                { id: user.id },
                process.env.SECRETE_KEY
            );
            return {
                ok: true,
                token,
            };
        },
    },
};
