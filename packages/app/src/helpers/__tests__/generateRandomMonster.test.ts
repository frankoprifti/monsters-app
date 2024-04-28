import { generateRandomMonster } from "../generateRandomMonster";

// Test if the generated monster has expected properties and values
describe("generateRandomMonster", () => {
    it("should generate a monster with the correct structure", () => {
        const monster = generateRandomMonster();

        // Test that the generated monster has all the required properties
        expect(monster).toHaveProperty("name");
        expect(monster).toHaveProperty("level");
        expect(monster).toHaveProperty("species");
        expect(monster).toHaveProperty("subSpecies");

        // Test if the values are within expected ranges
        expect(monster.name).toMatch(/Monster-\d+/); // Regex to check naming pattern
        expect(monster.level).toBeGreaterThanOrEqual(0); // Level should be non-negative
        expect(monster.level).toBeLessThan(100); // Level should be less than 100
        expect(monster.species).toMatch(/Species-\d+/);
        expect(monster.subSpecies).toMatch(/SubSpecies-\d+/);
    });

    it("should generate a unique name for each monster", () => {
        const monster1 = generateRandomMonster();
        const monster2 = generateRandomMonster();

        // Check that the names are not the same
        expect(monster1.name).not.toBe(monster2.name);
    });
});
