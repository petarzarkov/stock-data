import { HotRequests } from "hot-utils";
import { API_TOKEN, isProd, SERVER_PORT } from "./constants";

const hc = (url: string) => HotRequests.get({
    url: `${url}/service/healthcheck`,
    options: {
        headers: {
            apitoken: API_TOKEN
        }
    }
});

/**
 * Doing this so Heroku doesn't put the app to sleep
 * so we have some form of high availability
 */
export const startHealtcheck = async () => {
    const url = isProd ? "https://stock-data-app.herokuapp.com/" : `http://localhost:${SERVER_PORT}`;
    // Ping right away
    await hc(url);
    // Ping every 20 min
    setInterval(() => hc(url), 20 * 60 * 1000);
};