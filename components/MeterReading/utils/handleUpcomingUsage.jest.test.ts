import { handleUpcomingUsage } from "./handleUpcomingUsage";

describe("handleUpcomingUsage", () => {
  it("returns null when there are fewer readings than the requested count", () => {
    expect(handleUpcomingUsage(["00400", "00350", "00250"])).toBeNull();
  });

  it("predicts 500 from 00400, 00350, 00250, 00100", () => {
    expect(handleUpcomingUsage(["00400", "00350", "00250", "00100"])).toBe(500);
  });

  it("uses only the latest four readings when older readings also exist", () => {
    expect(handleUpcomingUsage(["00500", "00400", "00350", "00250", "00100"])).toBe(583);
  });

  it("supports a custom count", () => {
    expect(handleUpcomingUsage(["00600", "00500", "00400"], 3)).toBe(700);
  });

  it("rounds repeating decimal predictions to the nearest whole number", () => {
    expect(handleUpcomingUsage(["00500", "00400", "00350", "00250"])).toBe(583);
  });
});
