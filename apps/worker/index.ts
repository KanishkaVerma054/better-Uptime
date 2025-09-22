import { xAckBulk, xReadGroup } from "@packages/redisClient/client";
import { REGION_ID, WORKER_ID } from "./config";
import { fetchWebsite } from "./fetchWebsiteId";



async function main() {
    while(1) {
        // STEP1: read from the stream
        const response = await xReadGroup(REGION_ID, WORKER_ID);

        if(!response) {
            continue;
        }

        // STEP2: process the website and store the result in the DB
        // It should probably be routed a queue in a bulk DB request.
        
        let promises = response.map(({message}) => fetchWebsite(message.url, message.id));
        
        await Promise.all(promises);
        console.log(promises.length)

        // STEP3: ack back to the queue that this event has been processed

        xAckBulk(REGION_ID, response.map(({id}) => id));
        
    }
}

main();