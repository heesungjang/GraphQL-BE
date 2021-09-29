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
                    throw new Error("Username or password is already exist");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password,
                    },
                });
            } catch (error) {
                return error;
            }
        },
    },
};
