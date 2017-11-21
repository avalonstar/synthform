import React from 'react';

import './Cameras.css';

export function ActivityCamera() {
  return (
    <div className="cs cs-activity">
      <div className="cam" />
      <div className="cam-padding" />
    </div>
  );
}

export function SecondaryCamera() {
  return (
    <div className="cs cs-secondary">
      <div className="cam" />
    </div>
  );
}

export function IntertitleCamera() {
  return (
    <div className="cs cs-intertitle">
      <div className="cam" />
    </div>
  );
}
