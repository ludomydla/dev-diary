import React from "react";
import { GasRecord } from "../../lib/types";
import styles from '../../styles/DashboardMeter.module.css';

interface DashboardMeterProps {
  records: GasRecord[];
  onAddNewRecord: () => void;
}

export default function DashboardMeter(
  { records, onAddNewRecord }: DashboardMeterProps,
) {
  // TODO sort records by date
  const totalDistance = records.length > 1
    ? records[0].distance - records[records.length - 1].distance
    : 0;
  const totalConsumption = records.reduce(
    (a: number, c: GasRecord) => a += Number(c.litres),
    0,
  );
  const totalPrice = records.reduce(
    (a: number, c: GasRecord) => a += Number(c.price),
    0,
  );

  return (
    <div className={styles.dashboard_meter_wrapper}>
      <p className={styles.dashboard_meter_average_value}>{Number(totalConsumption / (totalDistance / 100)).toFixed(2)}</p>
      <p className={styles.dashboard_meter_average_metric}>l/100km</p>
      <p className={styles.dashboard_meter_tuple}>
        <span>Distance</span>
        <span>{`${Number(totalDistance).toFixed(2)} km`}</span>
      </p>
      <p className={styles.dashboard_meter_tuple}>
        <span>Gas amount</span>
        <span>{`${Number(totalConsumption).toFixed(2)} l`}</span>
      </p>
      <p className={styles.dashboard_meter_tuple}>{`It all costs: ${Number(totalPrice).toFixed(2)} €`}</p>
      <button className={styles.dashboard_meter_addButton} onClick={onAddNewRecord}>
        <span className={styles.dashboard_meter_addButton_content}>+</span>
      </button>
    </div>
  );
}
