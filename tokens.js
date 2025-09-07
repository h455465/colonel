// status can be "online", "idle", "dnd", or "invisible" or "offline"
export default [
    {
        channelId: "940648335377850519",
        serverId: "940648333691715584",
        token: process.env.token1,
        selfDeaf: false,
        autoReconnect: {
            enabled: true,
            delay: 50, // ثواني
            maxRetries: 5,
        },
        presence: {
            status: "idle",
        },
        selfMute: true,
    },
];
