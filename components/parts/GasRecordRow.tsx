import React from "react";
import { GasRecord } from "../../lib/types";
import { formatStringDate } from "../../lib/utils";
import styles from '../../styles/GasRecordRow.module.css';


interface GasRecordRowProps {
  record: GasRecord;
}

export default function GasRecordRow({ record }: GasRecordRowProps) {
  return (
    <li className={styles.gas_record_row_wrapper}>
      <div className={styles.gas_record_row_when}>
        <strong>{formatStringDate(record.created_on)}</strong>
        <small>
          <span>@</span>
          {record.distance}
          <span>km</span>
        </small>
      </div>
      <div className={styles.gas_record_row_what}>
        <strong>
          {record.litres}
          <span>l</span>
        </strong>
        <small>
          {record.price}
          <span>&euro;</span>
        </small>
      </div>
    </li>
  );
}
