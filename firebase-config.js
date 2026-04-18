// Firebase Configuration for ByteWing (Mindwell Hackathon Project)
const firebaseConfig = {
  apiKey: "AIzaSyArH2zi2zEY8caq59PMtB6URlg-zFPMwTo",
  authDomain: "mindwell-hackathon.firebaseapp.com",
  projectId: "mindwell-hackathon",
  storageBucket: "mindwell-hackathon.firebasestorage.app",
  messagingSenderId: "974505801141",
  appId: "1:974505801141:web:02e8ff884de36fd56ad5fc",
  measurementId: "G-5PNYF7QSPW"
};

// Export config if using modules, otherwise it's global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
}
