// App.js

import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Speedometer from 'react-d3-speedometer';
import './App.css';
import imageSrc from './logo.png';
import kpiDetailsData from './kpiDetails.js';
import WorkPackage1 from './work_packages/workPackage1';
import WorkPackage2 from './work_packages/workPackage2';
import WorkPackage3 from './work_packages/workPackage3';
import WorkPackage4 from './work_packages/workPackage4';
import ParticleAnimation from './ParticleAnimation.js'; 


Modal.setAppElement('#root');

function App() {
  const [selectedKPI, setSelectedKPI] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKpiDetails, setSelectedKpiDetails] = useState([]);
  const [speedometerValue, setSpeedometerValue] = useState(0);
  const [currentValueText, setCurrentValueText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [speedometerColor, setSpeedometerColor] = useState('#00FF00'); // Default color
  const [activeTab, setActiveTab] = useState(1); // Default to the first tab

  const kpiDetailsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kpiDetailsRef.current && !kpiDetailsRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setSelectedKPI('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showDetails = async (kpiTitle, event) => {
    setSelectedKPI(kpiTitle);
    setIsModalOpen(true);
  
    try {
      let placeholderDetails = [];
      let currentSpeedometerValue = 0;
      let currentText = '';
      let speedometerColor = '#a0a6ab'; // Default color
  
      // Check if details are defined for the selected KPI
      if (kpiDetailsData[kpiTitle]) {
        placeholderDetails = kpiDetailsData[kpiTitle].details;
        currentSpeedometerValue = kpiDetailsData[kpiTitle].speedometerValue;
        currentText = kpiDetailsData[kpiTitle].currentValueText;
  
        // Set color based on a condition (for example, 'yes' or 'no')
        if (kpiDetailsData[kpiTitle].condition === 'yes') {
          speedometerColor = '#00FF00'; // Green color
        } else if (kpiDetailsData[kpiTitle].condition === 'no') {
          speedometerColor = '#FF0000'; // Red color
        }
      } else {
        // Use placeholder details if details are not defined for the selected KPI
        placeholderDetails = Array.from({ length: 10 }, (_, index) => ({
          detail: `Detail ${index + 1}`,
          value: Math.floor(Math.random() * 100),
        }));
      }
  
      setSpeedometerValue(currentSpeedometerValue);
      setCurrentValueText(currentText);
      setSelectedKpiDetails(placeholderDetails);
      setSpeedometerColor(speedometerColor); // Set color for homepage speedometers
  
      // Set the position for the popup based on the click event
      setPopupPosition({ top: event.clientY, left: event.clientX });
    } catch (error) {
      console.error('Error fetching KPI details:', error);
    }
  }
  const switchTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <div>Work Package 1 content</div>;
      case 2:
        return <div>Work Package 2 content</div>;
      case 3:
        return <div>Work Package 3 content</div>;
      case 4:
        return <div>Work Package 4 content</div>;
      // Add cases for other work packages
      default:
        return null;
    }
  };
  
  
  

  return (
    <div className="App-container">
      <ParticleAnimation />
      <header>
        <h1>FigureAI Project Dashboard</h1>
      </header>
      <div className="tab-menu">
        <button className={activeTab === 1 ? 'active' : ''} onClick={() => switchTab(1)}>
          Work Package 1
        </button>
        <button className={activeTab === 2 ? 'active' : ''} onClick={() => switchTab(2)}>
          Work Package 2
        </button>
        <button className={activeTab === 3 ? 'active' : ''} onClick={() => switchTab(3)}>
          Work Package 3
        </button>
        <button className={activeTab === 4 ? 'active' : ''} onClick={() => switchTab(4)}>
          Work Package 4
        </button>
        {/* Add buttons for other work packages */}
      </div>
      <div className="App-main">
        
        <div className="left-kpi">
          {Object.keys(kpiDetailsData).slice(0, 4).map((kpiTitle) => (
            <div key={kpiTitle} className="kpi-item" onClick={(e) => showDetails(kpiTitle, e)}>
              {kpiDetailsData[kpiTitle].condition === 'yes' ? (
                <GreenSpeedometer
                  value={kpiDetailsData[kpiTitle].speedometerValue}
                  title={kpiTitle}
                />
              ) : (
                <RedSpeedometer
                  value={kpiDetailsData[kpiTitle].speedometerValue}
                  title={kpiTitle}
                />
              )}
            </div>
          ))}
        </div>
        <div className="central-image-container">
          <img src={imageSrc} alt="Central Image" />
        </div>
        <div className="right-kpi">
          {Object.keys(kpiDetailsData).slice(4).map((kpiTitle) => (
            <div key={kpiTitle} className="kpi-item" onClick={(e) => showDetails(kpiTitle, e)}>
              {kpiDetailsData[kpiTitle].condition === 'yes' ? (
                <GreenSpeedometer
                  value={kpiDetailsData[kpiTitle].speedometerValue}
                  title={kpiTitle}
                  color='#00FF00'
                />
              ) : (
                <RedSpeedometer
                  value={kpiDetailsData[kpiTitle].speedometerValue}
                  title={kpiTitle}
                  color='#FF0000'
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="KPI Details"
        className="modal"
        overlayClassName="overlay"
        style={{
          top: popupPosition.top,
          left: popupPosition.left,
          transform: isModalOpen ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1.0s ease-in-out',
        }}
      >
        <div className="kpi-details" ref={kpiDetailsRef}>
          {selectedKPI && (
            <>
              <h2>{selectedKPI} Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Detail</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedKpiDetails.map(({ detail, value }, index) => (
                    <tr key={index}>
                      <td>{detail}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="speedometer-container">
                <div className="speedometer-name">{currentValueText}</div>
                <Speedometer
                  width={300}
                  height={180}
                  maxSegmentLabels={5}
                  maxValue={100}
                  value={speedometerValue}
                  customSegmentStops={[0, 50, 100]}
                  segmentColors={[speedometerColor, speedometerColor, speedometerColor]}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

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

const RedSpeedometer = ({ value, title, color }) => (
  <div className="speedometer-container zoom-on-hover">
    <Speedometer
      width={150}
      height={100}
      maxSegmentLabels={3}
      maxValue={100}
      value={value}
      color={color}
      segmentColors={['#FF0000']}
    />
    <h3>{title}</h3>
  </div>
);



export default App;
