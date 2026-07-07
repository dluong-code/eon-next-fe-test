import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MeterReading from "./MeterReading";
import { describe, it, expect } from "vitest";

const addReading = async (reading: string) => {
  const input = screen.getByLabelText(/meter reading/i);
  const button = screen.getByRole("button", { name: /add reading/i });

  await userEvent.clear(input);
  await userEvent.type(input, reading);
  await userEvent.click(button);
};

const submitWithoutValue = async () => {
  const button = screen.getByRole("button", { name: /add reading/i });
  await userEvent.click(button);
};

describe("MeterReading upcoming usage prediction", () => {
  it("does not show a prediction until four readings have been added", async () => {
    render(<MeterReading />);

    await addReading("100");
    await addReading("250");
    await addReading("350");

    expect(screen.queryByText(/we predict your next reading would be/i)).not.toBeInTheDocument();
  });

  it("shows a 500 prediction for 00400, 00350, 00250, 00100", async () => {
    render(<MeterReading />);

    await addReading("100");
    await addReading("250");
    await addReading("350");
    await addReading("400");

    expect(screen.getByText("We predict your next reading would be: 500")).toBeInTheDocument();
  });

  it("uses only the latest four readings when an older fifth reading exists", async () => {
    render(<MeterReading />);

    await addReading("100");
    await addReading("250");
    await addReading("350");
    await addReading("400");
    await addReading("500");

    expect(screen.getByText("We predict your next reading would be: 583")).toBeInTheDocument();
  });

  it("renders previous meter readings in descending order", async () => {
    render(<MeterReading />);

    await addReading("100");
    await addReading("250");
    await addReading("350");
    await addReading("400");

    const list = screen.getByRole("list");
    const readingValues = within(list)
      .getAllByText(/^\d{5}$/)
      .map((item) => item.textContent);

    expect(readingValues).toEqual(["00400", "00350", "00250", "00100"]);
  });

  it("shows an error when submitting without entering a reading", async () => {
    render(<MeterReading />);

    await submitWithoutValue();

    expect(screen.getByRole("alert")).toHaveTextContent("Enter up to 5 digits before adding a reading.");
  });

  it('marks the input as invalid when a validation error is shown', async () => {
    render(<MeterReading />);

    await submitWithoutValue();

    expect(screen.getByLabelText(/meter reading/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("shows an error when submitting a reading lower than the highest reading already added", async () => {
    render(<MeterReading />);

    await addReading("400");
    await addReading("350");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "This doesn't seem right? The meter reading you have entered is lower than your previous meter reading, please submit it again",
    );
  });

  it("only allows up to 5 digits in the input", async () => {
    render(<MeterReading />);

    const input = screen.getByLabelText(/meter reading/i);
    await userEvent.type(input, "1234567");

    expect(input).toHaveValue("12345");
  });

  it("shows an error when submitting 00000", async () => {
    render(<MeterReading />);

    await addReading("00000");

    expect(screen.getByRole("alert")).toHaveTextContent("Meter reading must be between 00001 and 99999.");
  });

  it("accepts 00001 as the minimum valid reading", async () => {
    render(<MeterReading />);

    await addReading("00001");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("00001")).toBeInTheDocument();
  });

  it("accepts 99999 as the maximum valid reading", async () => {
    render(<MeterReading />);

    await addReading("00001");
    await addReading("99999");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("99999")).toBeInTheDocument();
    expect(screen.getByText("00001")).toBeInTheDocument();
  });
});
