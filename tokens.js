// status can be "online", "idle", "dnd", or "invisible" or "offline"
export default [
    {
        channelId: "1416771505613705346",
        serverId: "1050131615038324906",
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
