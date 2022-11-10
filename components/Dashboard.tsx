import React, { useState } from "react";
import { GasRecord } from "../lib/types";
import GasRecordRow from "./parts/GasRecordRow";
import styles from '../styles/Dashboard.module.css';
import DashboardMeter from "./parts/DashboardMeter";
import { EMPTY_RECORD, DISPLAY_LAST_RECORDS } from "../lib/constants";
import RecordModal from "./RecordModal";

interface DashboardProps {
  data: GasRecord[];
}

export default function Dashboard({ data }: DashboardProps) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<GasRecord>(EMPTY_RECORD);
  const [records, setRecords] = useState<GasRecord[]>(data)
  const [isShowAll, setShowAll] = useState<boolean>(false)

  const handleOpenModalForNew = () => {
    setIsModal(true);
    setModalData(EMPTY_RECORD);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleAddRecordToDashboard = (record: GasRecord) => {
    setRecords([...records, record])
  }

  const handleToggleShowAll = () => {
    setShowAll(!isShowAll)
  }

  return (
    <div className={styles.dashboard_halfnhalf}>
      <DashboardMeter records={records} onAddNewRecord={handleOpenModalForNew} />
      <ul className={styles.dashboard_list}>
        {records
          .filter( (record, index) => isShowAll ? true : index < DISPLAY_LAST_RECORDS )
          .map((record, index) => (
          <GasRecordRow record={record} key={index} />
        ))} 
        <li className={`${isShowAll ? styles.dashboard_hover_item: ''}`}>
          <button
            className={styles.dashboard_moreButton}
            onClick={handleToggleShowAll}
          >              
            {`${isShowAll ? 'Show few' : 'Show all'}`}
          </button>
        </li>
      </ul>

      {isModal && (
        <RecordModal
          modalData={modalData as GasRecord}
          onClose={handleCloseModal}
          onAddRecordToDashboard={handleAddRecordToDashboard}
        />
      )}
    </div>
  );
}
