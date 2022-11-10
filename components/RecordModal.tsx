import React, { useCallback, useState } from "react";
import { call } from "../lib/fetcher";
import { GasRecord } from "../lib/types";
import dayjs from 'dayjs';
import styles from '../styles/RecordModal.module.css';

interface RecordModalProps {
  modalData: GasRecord;
  onClose: () => void;
  onAddRecordToDashboard: (record: GasRecord) => void
}

export default function RecordModal({ modalData, onClose, onAddRecordToDashboard }: RecordModalProps) {
  const [tacho, setTacho] = useState<number>(modalData.distance || 0);
  const [litres, setLitres] = useState<number>(modalData.litres || 0);
  const [price, setPrice] = useState<number>(modalData.price || 0);

  const postGasRecords = useCallback(async (tacho: number, litres: number, price: number) => {
    const resp = await call.gas.POST(tacho, litres, price);
    if(resp.status === 200) {
      const record: GasRecord = {
        distance: tacho,
        litres: litres,
        price: price,
        created_on: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      };
      onAddRecordToDashboard(record)
    } 
  }, []);

  const handleSaveRecord = () => {
    //console.log("handleSaveRecord", tacho, litres, price);
    try {
      postGasRecords(tacho, litres, price);
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  return (
    <div className={styles.record_modal_modal}>
      <button className={styles.record_modal_close} onClick={onClose}>&times;</button>
      <h3 className={styles.record_modal_title}>{"Edit/Create record"}</h3>

      <div className={styles.record_modal_inputBox}>
        <label htmlFor="tacho">Current state of odometer</label>
        <input
          type="number"
          value={tacho || ""}
          onChange={(e) => {
            setTacho(Number(e.target.value));
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          name="tacho"
          id="tacho"
        />
      </div>

      <div className={styles.record_modal_inputBox}>
        <label htmlFor="litres">Gas (litres)</label>
        <input
          type="number"
          value={litres || ""}
          onChange={(e) => {
            setLitres(Number(e.target.value));
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          name="litres"
          id="litres"
        />
      </div>

      <div className={styles.record_modal_inputBox}>
        <label htmlFor="price">Price (euros)</label>
        <input
          type="number"
          value={price || ""}
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          name="price"
          id="price"
        />
      </div>

      <button className={styles.record_modal_save} onClick={handleSaveRecord}>Save</button>
    </div>
  );
}
