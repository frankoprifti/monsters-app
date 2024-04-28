import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreateMonster from "../CreateMonster";

jest.mock("../../api/monster", () => ({
  createMonster: jest.fn(),
  createMonsterBulk: jest.fn(),
}));

describe("CreateMonster Component", () => {
  it("renders the CreateMonster component correctly", () => {
    render(<CreateMonster />);
    const heading = screen.getByText(/Create a Monster/i);
    expect(heading).toBeInTheDocument();

    const form = screen.getByTestId("create-monster-form");
    expect(form).toBeInTheDocument();
  });
});
