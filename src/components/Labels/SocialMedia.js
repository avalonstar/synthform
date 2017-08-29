import React from 'react';
import { Instagram, Twitter } from 'react-feather';

import './SocialMedia.css';

const SocialMedia = () =>
  <div className="sm">
    <div className="sm-node sm-twitter">
      <Twitter size={24} />
      {'avalonstar'}
    </div>
    <div className="sm-node sm-instagram">
      <Instagram size={24} />
      {'bryanveloso'}
    </div>
  </div>;

export default SocialMedia;
