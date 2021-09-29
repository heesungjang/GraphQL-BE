import bcrypt from "bcrypt";
import client from "../client";

export default {
    Mutation: {
        createAccount: async (
            _,
            { firstName, lastName, username, email, password }
        ) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username,
                            },
                            {
                                email,
                            },
                        ],
                    },
                });
                if (existingUser) {
                    throw new Error("username or email is already exist");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: hashedPassword,
                    },
                });
            } catch (error) {
                return error;
            }
        },
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
        },
    },
};
