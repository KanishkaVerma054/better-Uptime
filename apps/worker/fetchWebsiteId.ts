import { prismaClient } from "@packages/store/client";
import { REGION_ID } from "./config";
import axios from "axios";

export async function fetchWebsite(url: string, websiteId: string) {
        return new Promise<void>((resolve, reject) => {
        let startTime = Date.now();
        axios.get(url)
            .then(async () => {
                const endTime = Date.now();
                await prismaClient.website_tick.create({
                    data: {
                    response_time_ms: endTime -startTime,
                    status: "Up",
                    region_id: REGION_ID,
                    website_id: websiteId
                    }
                });
                resolve();
            })
            .catch(async() => {
                const endTime = Date.now();
                await prismaClient.website_tick.create({
                    data: {
                    response_time_ms: endTime -startTime,
                    status: "Down",
                    region_id: REGION_ID,
                    website_id: websiteId
                    }
                });
                resolve();
            });
        });
}