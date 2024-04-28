import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express with Typescript!");
});

app.post("/monster", async (req: Request, res: Response) => {
    const { name, level, species, subSpecies } = req.body;

    try {
        const newMonster = await prisma.monster.create({
            data: {
                name,
                level: parseInt(level),
                species,
                subSpecies,
            },
        });
        res.json(newMonster);
    } catch (error) {
        console.error("Error creating monster:", error);
        res.status(500).json({ error: "An error occurred while creating the monster." });
    }
});

app.post("/monster/bulk", async (req: Request, res: Response) => {
    const { monsters } = req.body;

    try {
        const createdMonsters = await prisma.monster.createMany({
            data: monsters.map((monster: any) => ({
                name: monster.name,
                level: parseInt(monster.level),
                species: monster.species,
                subSpecies: monster.subSpecies,
            })),
        });

        res.status(201).json(createdMonsters);
    } catch (error) {
        console.error("Error creating monsters:", error);
        res.status(500).json({ error: "An error occurred while creating monsters." });
    }
});

app.get("/monsters", async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNum = parseInt(page as string, 10);
    const size = parseInt(pageSize as string, 10);

    try {
        const totalMonsters = await prisma.monster.count();
        const monsters = await prisma.monster.findMany({
            skip: (pageNum - 1) * size,
            take: size,
        });

        res.json({
            data: monsters,
            currentPage: pageNum,
            totalPages: Math.ceil(totalMonsters / size),
        });
    } catch (error) {
        console.error("Error fetching monsters:", error);
        res.status(500).json({ error: "An error occurred while fetching monsters." });
    }
});

app.get("/monster/random", async (_: Request, res: Response) => {
    try {
        const totalMonsters = await prisma.monster.count();

        if (totalMonsters === 0) {
            return res.status(404).json({ error: "No monsters found" });
        }

        const randomIndex = Math.floor(Math.random() * totalMonsters);

        const randomMonster = await prisma.monster.findMany({
            skip: randomIndex,
            take: 1,
        });

        res.json(randomMonster[0]);
    } catch (error) {
        console.error("Error fetching random monster:", error);
        res.status(500).json({ error: "An error occurred while fetching a random monster." });
    }
});

app.delete("/monster/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.monster.delete({ where: { id: parseInt(id, 10) } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting monster:", error);
        res.status(500).json({ error: "An error occurred while deleting the monster." });
    }
});

app.listen(3001, () => {
    console.log("Express server running on port 3001");
});
