import React from 'react';
import { Video } from 'react-feather';

import { Uptime } from 'components/Labels';

import './Cameras.css';

export function ActivityCamera() {
  return (
    <div className="cs cs-activity">
      <div className="cam" />
      <div className="cam-padding">
        <Video size={16} /> {'LIVE'} <Uptime />
      </div>
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
