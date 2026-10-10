import { describe, it, expect } from "vitest";
import { formatDuration } from "../../src/utils/calculate";

describe("formatDuration", () => {
  it("returns 0mn for zero seconds", () => {
    expect(formatDuration(0)).toBe("0mn");
  });

  it("floors leftover seconds below one minute to 0mn", () => {
    expect(formatDuration(59)).toBe("0mn");
  });

  it("returns minutes only when duration is under one hour", () => {
    expect(formatDuration(60)).toBe("1mn");
    expect(formatDuration(125)).toBe("2mn");
    expect(formatDuration(3599)).toBe("59mn");
  });

  it("returns hours only when minutes are zero", () => {
    expect(formatDuration(3600)).toBe("1h");
    expect(formatDuration(7200)).toBe("2h");
  });

  it("returns hours and minutes when both are present", () => {
    expect(formatDuration(3660)).toBe("1h 1mn");
    expect(formatDuration(7380)).toBe("2h 3mn");
  });

  it("clamps negative values to 0mn", () => {
    expect(formatDuration(-1)).toBe("0mn");
    expect(formatDuration(-3600)).toBe("0mn");
  });

  it("floors fractional seconds before formatting", () => {
    expect(formatDuration(59.9)).toBe("0mn");
    expect(formatDuration(60.9)).toBe("1mn");
    expect(formatDuration(3600.9)).toBe("1h");
  });
});
