import React from 'react';

import Chat from 'components/Chat';

import './Intertitle.css';

function Layout() {
  return (
    <div className="intertitle">
      <Chat />
    </div>
  );
}

function Intertitle() {
  return Layout();
}

export default Intertitle;
