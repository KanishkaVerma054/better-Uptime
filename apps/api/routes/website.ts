import { Router } from "express";
import { prismaClient } from "store/client";
import { authMiddleware } from "../middleware/middleware";

const router = Router();

router.post("/website", authMiddleware, async (req, res) => {
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

router.get("/status/:websiteId", authMiddleware, async (req, res) => {
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
            take: 1,
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
