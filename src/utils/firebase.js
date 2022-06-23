const { storage } = require('../config/firebase');
const { ref, uploadString, getDownloadURL } = require('firebase/storage');

const uploadResume = async (file) => {
    try {
        const storageRef = ref(storage, `${Date.now()}.pdf`);
        const metadata = {
            contentType: 'application/pdf',
        };
        const snapshot = await uploadString(storageRef, file, 'base64', metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    uploadResume
}