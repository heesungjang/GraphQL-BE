import client from "../client";

export default {
    User: {
        totalFollowings: async ({ id }) =>
            await client.user.count({
                where: {
                    followers: {
                        some: {
                            id,
                        },
                    },
                },
            }),
        totalFollowers: async ({ id }) =>
            await client.user.count({
                where: {
                    followings: {
                        some: {
                            id,
                        },
                    },
                },
            }),
    },
};
