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
    },
};
