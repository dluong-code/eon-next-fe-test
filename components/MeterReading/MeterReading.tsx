"use client";

import { useState } from "react";
import Button from "../Button";
import { handleUpcomingUsage } from "./utils/handleUpcomingUsage";
import styles from "./MeterReading.module.scss";

const MAX_LENGTH = 5;

const formatReading = (value: string) => value.padStart(MAX_LENGTH, "0");

const MeterReading = () => {
  const [value, setValue] = useState("");
  const [readings, setReadings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [nextEstimateReading, setEstimateReading] = useState<number | null>(null);
  const errorId = "meter-reading-error";

  const handleMeterStringChange = (nextValue: string) => {
    const digitsOnly = nextValue.replace(/\D/g, "").slice(0, MAX_LENGTH);
    setValue(digitsOnly);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      setError(`Enter up to ${MAX_LENGTH} digits before adding a reading.`);
      return;
    }

    if (Number(value) < Number(readings[0])) {
      setError(
        "This doesn't seem right? The meter reading you have entered is lower than your previous meter reading, please submit it again",
      );
      return;
    }
    const newReadings = [formatReading(value), ...readings].sort((a, b) => Number(b) - Number(a));
    const estimate = handleUpcomingUsage(newReadings);

    setReadings(newReadings);
    setValue("");
    setError(null);
    setEstimateReading(estimate);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            onChange={(event) => handleMeterStringChange(event.target.value)}
            placeholder={`Enter up to ${MAX_LENGTH} digits`}
            type="text"
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
          />
        </div>
        <Button type="submit">Add reading</Button>
      </form>

      {nextEstimateReading && (
        <p aria-live="polite" className={styles.estimateText}>
          We predict your next reading would be: {nextEstimateReading}
        </p>
      )}
      {error ? (
        <p className={styles.error} role="alert" id={errorId}>
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
};

export default MeterReading;
