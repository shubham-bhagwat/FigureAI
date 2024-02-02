// WorkPackages/WorkPackage1.js
import React from 'react';
import Speedometer from 'react-d3-speedometer';
import GreenSpeedometer from '../App.js'; // Assuming you have a GreenSpeedometer component
import kpiDetailsData from '../kpiDetails.js';

const WorkPackage1 = ({ showDetails }) => {
  const kpiTitles = Object.keys(kpiDetailsData).slice(0, 4);

  return (
    <div className="App-main">
      {kpiTitles.map((kpiTitle) => (
        <div key={kpiTitle} className="kpi-item" onClick={(e) => showDetails(kpiTitle, e)}>
          <GreenSpeedometer value={kpiDetailsData[kpiTitle].speedometerValue} title={kpiTitle} />
        </div>
      ))}
    </div>
  );

};



export default WorkPackage1;
