import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMonster, createMonsterBulk } from "../../api/monster";
import CreateMonsterForm from "../CreateMonsterForm";

jest.useFakeTimers();
jest.mock("../../api/monster", () => ({
  createMonster: jest.fn(),
  createMonsterBulk: jest.fn(),
}));

describe("CreateMonsterForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the form correctly", () => {
    render(<CreateMonsterForm />);

    expect(screen.getByLabelText("Monster Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Level")).toBeInTheDocument();
    expect(screen.getByLabelText("Species")).toBeInTheDocument();
    expect(screen.getByLabelText("Sub-Species")).toBeInTheDocument();
    expect(screen.getByTestId("create")).toBeInTheDocument();
  });

  it("shows error if required fields are missing", async () => {
    render(<CreateMonsterForm />);

    const createButton = screen.getByTestId("create");
    userEvent.click(createButton);
    const errorAlert = await screen.findByText(
      /All fields must be filled in with valid values/i
    );
    expect(errorAlert).toBeInTheDocument();
  });

  it("successfully creates a monster when fields are valid", async () => {
    render(<CreateMonsterForm />);
    userEvent.type(screen.getByLabelText("Monster Name"), "Test Monster");
    userEvent.type(screen.getByLabelText("Level"), "10");
    userEvent.type(screen.getByLabelText("Species"), "Test species");
    userEvent.type(screen.getByLabelText("Sub-Species"), "Test sub species");

    const createButton = screen.getByTestId("create");
    (createMonster as jest.Mock).mockResolvedValue({ success: true });
    userEvent.click(createButton);
    expect(createMonster).toHaveBeenCalledWith({
      name: "Test Monster",
      level: 10,
      species: "Test species",
      subSpecies: "Test sub species",
    });
    const successAlert = await screen.findByText(
      /Monster created successfully/i
    );
    expect(successAlert).toBeInTheDocument();
  });

  it("shows error when creating a monster when fields are valid but an error happens", async () => {
    render(<CreateMonsterForm />);
    userEvent.type(screen.getByLabelText("Monster Name"), "Test Monster");
    userEvent.type(screen.getByLabelText("Level"), "10");
    userEvent.type(screen.getByLabelText("Species"), "Test species");
    userEvent.type(screen.getByLabelText("Sub-Species"), "Test sub species");
    const createButton = screen.getByTestId("create");
    (createMonster as jest.Mock).mockResolvedValue({ error: true });
    userEvent.click(createButton);
    expect(createMonster).toHaveBeenCalledWith({
      name: "Test Monster",
      level: 10,
      species: "Test species",
      subSpecies: "Test sub species",
    });
    const errorAlert = await screen.findByText(/Error creating monster/i);
    expect(errorAlert).toBeInTheDocument();
  });

  it("creates random monsters in bulk", async () => {
    render(<CreateMonsterForm />);
    userEvent.type(
      screen.getByLabelText("Enter a number to generate random monsters"),
      "20"
    );
    const generateButton = screen.getByTestId("randombutton");
    (createMonsterBulk as jest.Mock).mockResolvedValue({ success: true });
    userEvent.click(generateButton);

    const successAlert = await screen.findByText(
      /Monsters generated successfully/i
    );
    expect(successAlert).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(
      screen.queryByText(/Monsters generated successfully/i)
    ).not.toBeInTheDocument();
  });

  it("shows error when an error happens while generating random monsters in bulk", async () => {
    render(<CreateMonsterForm />);
    userEvent.type(
      screen.getByLabelText("Enter a number to generate random monsters"),
      "20"
    );
    const generateButton = screen.getByTestId("randombutton");
    (createMonsterBulk as jest.Mock).mockResolvedValue({ error: true });
    userEvent.click(generateButton);

    const errorAlert = await screen.findByText(/Error generating monsters/i);
    expect(errorAlert).toBeInTheDocument();
  });
});
