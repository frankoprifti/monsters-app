import { IMonster } from "../entities/IMonster";

export const generateRandomMonster = (): IMonster => ({
    name: `Monster-${Math.floor(Math.random() * 1000)}`,
    level: Math.floor(Math.random() * 100),
    species: `Species-${Math.floor(Math.random() * 10)}`,
    subSpecies: `SubSpecies-${Math.floor(Math.random() * 10)}`,
});