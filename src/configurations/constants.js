import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAXPYxFZanf33ZDgc5nI-JADDJqJWHANec',
  authDomain: 'synthform.firebaseapp.com',
  databaseURL: 'https://synthform.firebaseio.com',
  storageBucket: 'project-2060008184115091556.appspot.com'
});
export const ref = firebase.database().ref();

export const tmiIdentity = {
  username: 'synthformer',
  password: 'oauth:sf2bdj907ubkgumu0xej9w91fns0fh'
};

export const channel = 'avalonstar';
export const nightbotID = '56bac6beb1c02f9d6f0ea767';
