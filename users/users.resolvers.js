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
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    followings: {
                        some: {
                            id,
                        },
                    },
                },
            });
            return Boolean(exists);
        },
    },
};
