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
          <GreenSpeedometer value={kpiDetailsData[kpiTitle].speedometerValue} title={kpiTitle} />
        </div>
      ))}
    </div>
  );
};
const GreenSpeedometer = ({ value, title, color }) => (
    <div className="speedometer-container zoom-on-hover">
      <Speedometer
        width={150}
        height={100}
        maxSegmentLabels={3}
        maxValue={100}
        value={value}
        color={color}
        segmentColors={['#00FF00']}
      />
      <h3>{title}</h3>
    </div>
  );

export default WorkPackage2;
