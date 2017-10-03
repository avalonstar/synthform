export const tmiIdentity = {
  username: 'synthformer',
  password: 'oauth:sf2bdj907ubkgumu0xej9w91fns0fh'
};

export const channel = 'avalonstar';
export const nightbotID = '56bac6beb1c02f9d6f0ea767';

const apiBaseUri = process.env.REACT_APP_API_URI;
export const apiUri = `${apiBaseUri}/api/${channel}`;
export const socketUri = `${apiBaseUri}/${channel}`;
