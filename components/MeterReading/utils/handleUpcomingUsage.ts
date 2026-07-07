export const handleUpcomingUsage = (readings: string[], count = 4): number | null => {
  if (readings.length < count) return null;

  const meterReadings = readings.slice(0, count).map(Number);
  const distances = meterReadings.slice(1).map((reading, index) => meterReadings[index] - reading);
  const averageDistance = distances.reduce((sum, value) => sum + value, 0) / distances.length;

  return Math.round(meterReadings[0] + averageDistance);
};
