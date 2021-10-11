import client from "../../client";

export default {
    Query: {
        seeFollowings: async (_, { username, lastId }) => {
            const user = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });

            if (!user) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }

            const followings = await client.user
                .findUnique({
                    where: {
                        username,
                    },
                })
                .followings({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });
            console.log(followings);
            return {
                ok: true,
                followings,
            };
        },
    },
};
