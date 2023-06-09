import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const initializeFirebaseApp = () => {
  const firebaseConfig = {
        apiKey: "AIzaSyCFvBTkeuDwPXjNpEsi3zFIOI-E-DjGTxs",
        authDomain: "task-mngmnt.firebaseapp.com",
        projectId: "task-mngmnt",
        storageBucket: "task-mngmnt.appspot.com",
        messagingSenderId: "23598429960",
        appId: "1:23598429960:web:5981bfab4230b8a5371ebd",
        measurementId: "G-H6CDEVWNET"
                 };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};

export default initializeFirebaseApp;
