// WorkPackages/WorkPackage2.js
import React from 'react';
import Speedometer from 'react-d3-speedometer';
import RedSpeedometer from '../App.js'; // Assuming you have a RedSpeedometer component
import kpiDetailsData from '../kpiDetails.js';

const WorkPackage2 = ({ showDetails }) => {
  const kpiTitles = Object.keys(kpiDetailsData).slice(4);

  return (
    <div className="App-main">
      {kpiTitles.map((kpiTitle) => (
        <div key={kpiTitle} className="kpi-item" onClick={(e) => showDetails(kpiTitle, e)}>
          <RedSpeedometer value={kpiDetailsData[kpiTitle].speedometerValue} title={kpiTitle} />
        </div>
      ))}
    </div>
  );
};

export default WorkPackage2;
