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
      <button onClick={openModal}>View Work Package 1 Details</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Work Package 1 Details"
      >
        <h2>Work Package 1 Details</h2>
        <p>This is the details for Work Package 1.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WorkPackage1;
