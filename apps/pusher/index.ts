import { prismaClient } from "@packages/store/client";
import { xAddBulk } from "@packages/redisClient/client"

async function main() {
    let websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    })

    console.log(websites.length)
    await xAddBulk(websites.map(w => ({
        url: w.url,
        id: w.id
    })));

}

setInterval(() => {
    main()
}, 3 * 1000 * 60);
