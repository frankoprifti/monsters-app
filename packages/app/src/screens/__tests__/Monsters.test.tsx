import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { deleteMonster, getMonsters } from "../../api/monster";
import Monsters from "../Monsters";

jest.mock("../../api/monster", () => ({
  getMonsters: jest.fn(),
  deleteMonster: jest.fn(),
}));

describe("Monsters Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders Monsters component with expected elements", async () => {
    (getMonsters as jest.Mock).mockResolvedValue({
      success: {
        totalPages: 2,
        data: [
          {
            id: 1,
            name: "Monster A",
            level: 10,
            species: "Species A",
            subSpecies: "Sub-Species A",
          },
          {
            id: 2,
            name: "Monster B",
            level: 20,
            species: "Species B",
            subSpecies: "Sub-Species B",
          },
        ],
      },
    });

    render(<Monsters />);

    expect(await screen.findByText(/Monster A/i)).toBeInTheDocument();
    expect(screen.getByText(/Monster B/i)).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("changes page when pagination is clicked", async () => {
    (getMonsters as jest.Mock)
      .mockResolvedValueOnce({
        success: {
          totalPages: 2,
          data: [
            {
              id: 1,
              name: "Monster A",
              level: 10,
              species: "Species A",
              subSpecies: "Sub-Species A",
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        success: {
          totalPages: 2,
          data: [
            {
              id: 2,
              name: "Monster B",
              level: 20,
              species: "Species B",
              subSpecies: "Sub-Species B",
            },
          ],
        },
      });

    render(<Monsters />);

    await waitFor(() => {
      expect(getMonsters).toHaveBeenCalledWith(1, 10);
    });

    userEvent.click(await screen.findByText("2"));

    await waitFor(() => {
      expect(getMonsters).toHaveBeenCalledWith(2, 10);
    });
  });

  it("deletes a monster when delete button is clicked", async () => {
    (getMonsters as jest.Mock).mockResolvedValue({
      success: {
        totalPages: 1,
        data: [
          {
            id: 1,
            name: "Monster A",
            level: 10,
            species: "Species A",
            subSpecies: "Sub-Species A",
          },
        ],
      },
    });

    render(<Monsters />);

    const deleteButton = await screen.findByText(/Delete Monster/i);
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteMonster).toHaveBeenCalledWith(1);
    });
    expect(screen.queryByText(/Monster A/i)).not.toBeInTheDocument();
  });
});
