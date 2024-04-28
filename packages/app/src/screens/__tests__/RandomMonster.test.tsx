import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { randomMonster } from "../../api/monster";
import RandomMonster from "../RandomMonster";

jest.useFakeTimers();

jest.mock("../../api/monster", () => ({
  randomMonster: jest.fn(),
  deleteMonster: jest.fn(),
}));

describe("RandomMonster Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly with default state", () => {
    render(<RandomMonster />);

    expect(screen.getByText(/Random Monster/i)).toBeInTheDocument();
    expect(screen.getByText(/No monster to display/i)).toBeInTheDocument();
  });

  it("fetches a random monster every second", async () => {
    (randomMonster as jest.Mock).mockResolvedValue({
      success: {
        id: 1,
        name: "Monster A",
        level: 10,
        species: "Species A",
        subSpecies: "Sub-Species A",
      },
    });

    render(<RandomMonster />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Monster A/i)).toBeInTheDocument();
    });
  });

  it("handles errors when fetching a random monster", async () => {
    (randomMonster as jest.Mock).mockResolvedValue({ error: "Error" });

    render(<RandomMonster />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/An error occurred while fetching a random monster/i)
      ).toBeInTheDocument();
    });
  });
});
