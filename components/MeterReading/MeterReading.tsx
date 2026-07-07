"use client";

import { useState } from "react";
import Button from "../Button";
import styles from "./MeterReading.module.scss";

const MAX_LENGTH = 5;

const formatReading = (value: string) => value.padStart(MAX_LENGTH, "0");

export default function AddNumber() {
  const [value, setValue] = useState("");
  const [readings, setReadings] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [nextEstimateReading, setEstimateREading] = useState<number | null>(null);
  const handleChange = (nextValue: string) => {
    const digitsOnly = nextValue.replace(/\D/g, "").slice(0, MAX_LENGTH);
    setValue(digitsOnly);

    if (error) {
      setError("");
    }
  };

  const handleUpcomingUsage = (readings: string[], count: number = 4) => {
    if (readings.length < count) return null;

    const meterReadings = readings.slice(0, count).map(Number);
    const distances = meterReadings.slice(1).map((reading, index) => meterReadings[index] - reading);
    const averageDistance = distances.reduce((sum, value) => sum + value, 0) / distances.length;

    setEstimateREading(Math.round(meterReadings[0] + averageDistance));
  };

  const handleAdd = () => {
    if (!value) {
      setError("Enter up to 6 digits before adding a reading.");
      return;
    }

    if (Number(value) < Number(readings[0])) {
      setError(
        "This doesn't seem right? The meter reading you have entered is lower than your previous meter reading, please submit it again",
      );
      return;
    }
    const newReadings = [formatReading(value), ...readings].sort((a, b) => Number(b) - Number(a));

    setReadings(newReadings);
    setValue("");
    setError(undefined);
    handleUpcomingUsage(newReadings);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="meter-reading">
            Meter reading
          </label>
          <input
            className={styles.meterInput}
            id="meter-reading"
            inputMode="numeric"
            maxLength={MAX_LENGTH}
            name="meterReading"
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Enter up to 6 digits"
            type="text"
            value={value}
          />
        </div>
        <Button onClick={handleAdd} type="submit">
          Add reading
        </Button>
      </form>

      {nextEstimateReading && (
        <p className={styles.estimateText}>We predict your next reading would be: {nextEstimateReading}</p>
      )}
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <section className={styles.listSection}>
        <h2 className={styles.listTitle}>Added readings</h2>
        {readings.length ? (
          <ul className={styles.list}>
            {readings.map((reading, index) => (
              <li className={styles.listItem} key={`${reading}-${index}`}>
                <span className={styles.badge}>#{index + 1}</span>
                <span className={styles.readingValue}>{reading}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>No readings added yet.</p>
        )}
      </section>
    </div>
  );
}
