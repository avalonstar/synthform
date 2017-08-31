import React from 'react';
import { ChevronRight, Twitter, Tv } from 'react-feather';

import './SocialMedia.css';

const SocialMedia = () =>
  <div className="sm">
    <div className="sm-node sm-cap">
      <ChevronRight size={18} color="#02fa7b" />
      {'follow'}
    </div>
    <div className="sm-node sm-twitter">
      <Twitter size={18} color="#1da1f2" />
      {'avalonstar'}
    </div>
    <div className="sm-node sm-youtube">
      <Tv size={18} color="#cd201f" />
      {'avalonstar'}
    </div>
  </div>;

export default SocialMedia;
