import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Speedometer from 'react-d3-speedometer';
import './App.css';
import imageSrc from './logo.png';
// ... (imports)
import kpiDetailsData from './kpiDetails.js';  

Modal.setAppElement('#root');

function App() {
  const [selectedKPI, setSelectedKPI] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKpiDetails, setSelectedKpiDetails] = useState([]); 
  const [speedometerValue, setSpeedometerValue] = useState(0);
  const [currentValueText, setCurrentValueText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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

      // Check if details are defined for the selected KPI
      if (kpiDetailsData[kpiTitle]) {
        placeholderDetails = kpiDetailsData[kpiTitle].details;
        currentSpeedometerValue = kpiDetailsData[kpiTitle].speedometerValue;
        currentText = kpiDetailsData[kpiTitle].currentValueText;
      } else {
        // Use placeholder details if details are not defined for the selected KPI
        placeholderDetails = Array.from({ length: 10 }, (_, index) => ({
          detail: `Detail ${index + 1}`,
          value: Math.floor(Math.random() * 100),
        }));
      }

      setSpeedometerValue(currentSpeedometerValue);
      setCurrentValueText(currentText);
      setSelectedKpiDetails(placeholderDetails);  // Update the state variable

      // Set the position for the popup based on the click event
      setPopupPosition({ top: event.clientY, left: event.clientX });
    } catch (error) {
      console.error('Error fetching KPI details:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the FigureAI Project Dashboard</h1>

        <div className="kpi-list left-kpi">
          <div className="kpi" onClick={(e) => showDetails('Upper Level Systems', e)}>Upper Level Systems</div>
          <div className="kpi" onClick={(e) => showDetails('Connectivity', e)}>Connectivity</div>
          <div className="kpi" onClick={(e) => showDetails('Manipulation', e)}>Manipulation</div>
          <div className="kpi" onClick={(e) => showDetails('Locomotion', e)}>Locomotion</div>
        </div>

        <div className="central-image-container">
          <img src={imageSrc} alt="Central Image" />
        </div>

        <div className="kpi-list right-kpi">
          <div className="kpi" onClick={(e) => showDetails('AI/Intelligence', e)}>AI/Intelligence</div>
          <div className="kpi" onClick={(e) => showDetails('Perception', e)}>Perception</div>
          <div className="kpi" onClick={(e) => showDetails('Electrification', e)}>Electrification</div>
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
            transition: 'transform 1.0s ease-in-out', // Adjust the duration here
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
                  />
                </div>
              </>
            )}
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default App;