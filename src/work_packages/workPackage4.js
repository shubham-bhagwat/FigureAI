// WorkPackage1.js

import React, { useState } from 'react';
import Modal from 'react-modal';

const WorkPackage1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <button onClick={openModal}>View Work Package 1 Details</button> */}
      
        <h2>Work Package 4 Details</h2>
        <p>This is the details for Work Package 1.</p>

        <p>This is the details for Work Package 1.</p>
        <p>This is the details for Work Package 1.</p>
        <p>This is the details for Work Package 1.</p>
        <p>This is the details for Work Package 1.</p>
        <p>This is the details for Work Package 1.</p>
        
      
    </div>
  );
};

export default WorkPackage1;
