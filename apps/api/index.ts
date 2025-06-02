import express  from "express";
import {prismaClient} from "store/client"

const app = express();
app.use(express.json())

app.get("/status/:websiteId", (req, res) => {

})

app.post("/website", async(req, res) => {
    if (!req.body.url) {
        res.status(411).json({});
        return
    }

    const website = await prismaClient.website.create({
        data: {
            url: req.body.url,
            timeAdded: new Date()
        }
    })

    res.json({
        id: website.id
    })
    
});

app.listen(process.env.PORT || 3000);