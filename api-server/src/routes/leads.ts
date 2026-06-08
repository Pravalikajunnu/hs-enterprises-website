import { Router, type IRouter } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const ADMIN_PIN = process.env.ADMIN_PIN ?? "hs2025";

const router: IRouter = Router();

router.get("/leads", async (req, res) => {
  const { pin } = req.query;
  if (pin !== ADMIN_PIN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));
    res.json(leads);
  } catch (err) {
    req.log.error(err, "Failed to fetch leads");
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/leads", async (req, res) => {
  const parsed = insertLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  try {
    const [lead] = await db
      .insert(leadsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(lead);
  } catch (err) {
    req.log.error(err, "Failed to create lead");
    res.status(500).json({ error: "Failed to create lead" });
  }
});

export default router;
