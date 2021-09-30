import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        editProfile: async (
            _,
            { firstName, lastName, username, email, password: newPassword },
            // context object
            { loggedInUser, protectResolver }
        ) => {
            protectResolver(loggedInUser);
            let hashedPassword = null;
            if (newPassword) {
                hashedPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: { id: loggedInUser.id },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(hashedPassword && { password: hashedPassword }),
                },
            });
            if (updatedUser.id) {
                return {
                    ok: true,
                };
            } else {
                return {
                    ok: false,
                    error: "Could not update user profile",
                };
            }
        },
    },
};
