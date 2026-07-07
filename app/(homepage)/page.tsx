import MeterReading from "../../components/MeterReading";
import styles from "./homepage.module.scss";

export default function Homepage() {
  return (
    <div className={styles.wrapper}>
      <MeterReading />
    </div>
  );
}
