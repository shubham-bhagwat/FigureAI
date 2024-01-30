// RobotArm.js
import React, { useRef, useEffect } from 'react';

const RobotArm = ({ mouseX, mouseY }) => {
  const armRef = useRef(null);

  useEffect(() => {
    const updateArmRotation = () => {
      const arm = armRef.current;
      if (arm) {
        const armRect = arm.getBoundingClientRect();
        const armCenterX = armRect.left + armRect.width / 2;
        const armCenterY = armRect.top + armRect.height / 2;

        const angle = Math.atan2(mouseY - armCenterY, mouseX - armCenterX);
        arm.style.transform = `rotate(${angle}rad)`;
      }
    };

    updateArmRotation();
    window.addEventListener('mousemove', updateArmRotation);

    return () => {
      window.removeEventListener('mousemove', updateArmRotation);
    };
  }, [mouseX, mouseY]);

  return <div ref={armRef}>The RobotArm </div>;
};

export default RobotArm;
