import { BASE_URL } from "@/config/const";
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";

let connection: HubConnection | null = null;
let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

export const startPresence = async (token: string) => {
    if (connection) return;

    connection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/hubs/presence`, {
            accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    try {
        await connection.start();

        heartbeatInterval = setInterval(async () => {
            if (connection?.state === "Connected") {
                try {
                    await connection.invoke("Heartbeat");
                } catch (error) {
                    console.error("Heartbeat failed:", error);
                }
            }
        }, 20_000);
    } catch (error) {
        console.error("Presence connection failed:", error);
        connection = null;
    }
};

export const stopPresence = async () => {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }

    if (connection) {
        try {
            await connection.stop();
        } catch (error) {
            console.error("Presence disconnect failed:", error);
        }

        connection = null;
    }
};