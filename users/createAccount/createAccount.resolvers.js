import bcrypt from "bcrypt";
import client from "../../client";

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
                await client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: hashedPassword,
                    },
                });
                return { ok: true };
            } catch (error) {
                return {
                    ok: false,
                    error: "Cant create account",
                };
            }
        },
    },
};
