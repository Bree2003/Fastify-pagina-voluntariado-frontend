// CONFIGURACIÓN FIREBASE 
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBC-SJxG3_uFvNzPKR6gLA3LPQmhJWSFFA",
    authDomain: "pagina-voluntariado-frontend.firebaseapp.com",
    projectId: "pagina-voluntariado-frontend",
    storageBucket: "pagina-voluntariado-frontend.appspot.com",
    messagingSenderId: "720721688852",
    appId: "1:720721688852:web:e0a3c368ee637b40c96a01",
    measurementId: "G-4EY2RE176D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// CONFIGURACIÓN FIREBASE-ADMIN 

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "pagina-voluntariado-frontend.appspot.com"

});

// EXPORTAR

module.exports = {
    app,
    admin
};
