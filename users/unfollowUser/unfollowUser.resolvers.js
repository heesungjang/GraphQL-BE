import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver(
            async (_, { username }, { loggedInUser }) => {
                const ok = await client.user.findUnique({
                    where: { username },
                });
                if (!ok) {
                    return {
                        ok: false,
                        error: "User not found",
                    };
                }

                await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        followings: {
                            disconnect: {
                                username,
                            },
                        },
                    },
                });
                return {
                    ok: true,
                };
            }
        ),
    },
};
