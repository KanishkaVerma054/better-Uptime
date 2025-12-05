import { Router } from "express";
import { prismaClient } from "@packages/store/client";

const router = Router();

router.get("/websites", async (req, res) => {
  const websites = await prismaClient.website.findMany({
    where: {
      user_id: req.userId
    }
  })
  res.json({
    websites
  })
})

router.post("/website", async (req, res) => {
  if (!req.body.url) {
    res.status(411).json({});
    return;
  }

  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
      time_added: new Date(),
      user_id: req.userId!,
    },
  });

  res.json({
    id: website.id,
  });
});

router.get("/status/:websiteId", async (req, res) => {
  try {
        const website = await prismaClient.website.findFirst({
        where: {
            user_id: req.userId!,
            id: req.params.websiteId,
        },
        include: {
            ticks: {
            orderBy: [
                {
                createdAt: "desc",
                },
            ],
            take: 10,
            },
        },
        });
        
        if (!website) {
        res.status(409).json({
            message: "Not found",
        });
        return;
        }

        res.json({
          url: website.url,
          id: website.id,
          user_id: website.user_id
        });
    } catch (e) {
        res.status(409).json({
        message: "Not found",
        });
    }
});

export default router;
