import React from 'react';
import { Video } from 'react-feather';

import { Uptime } from 'components/Labels';

import './Cameras.css';

export function ActivityCamera() {
  return (
    <div className="cs cs-activity">
      <div className="cam" />
      <div className="cam-padding">
        {/* <div className="cam-cpl">
          <Video size={16} /> {'LIVE'}
        </div> */}
        {/* <div className="cam-cpr">
          <Uptime />
        </div> */}
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
