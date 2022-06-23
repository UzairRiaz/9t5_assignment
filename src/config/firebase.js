// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCogjVnh3aHaLxp4YeAhO718UWScXuPws0",
    authDomain: "t5-assginment.firebaseapp.com",
    projectId: "t5-assginment",
    storageBucket: "t5-assginment.appspot.com",
    messagingSenderId: "165655687598",
    appId: "1:165655687598:web:2b0a38bd0df1e01bfc183f",
    measurementId: "G-7KR62E9MND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = {
    app,
    storage
};