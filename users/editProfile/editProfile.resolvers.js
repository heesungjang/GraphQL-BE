import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: newPassword,
                    bio,
                    avatar,
                },
                // context object
                { loggedInUser }
            ) => {
                let avatarUrl = null;
                if (avatar) {
                    const { filename, createReadStream } = await avatar;
                    const newFilename = `${
                        loggedInUser.id
                    }-${Date.now()}-${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(
                        process.cwd() + "/uploads/" + newFilename
                    );

                    readStream.pipe(writeStream);
                    avatarUrl = `http://localhost:4000/static/${newFilename}`;
                }
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
                        bio,
                        ...(hashedPassword && { password: hashedPassword }),
                        ...(avatarUrl && { avatar: avatarUrl }),
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
            }
        ),
    },
};
