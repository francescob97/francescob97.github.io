import axios from 'axios'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import dayjs from 'dayjs';

const config = {
  apiKey: "AIzaSyDCXhPUmQUO5eVbBYfz662lt0DjG3rtbpA",
  authDomain: "websiteviewtracker.firebaseapp.com",
  projectId: "websiteviewtracker",
  storageBucket: "websiteviewtracker.appspot.com",
  messagingSenderId: "25583862778",
  appId: "1:25583862778:web:09833c5815b60491961a43",
  measurementId: "G-V323JHQP41"
};

// Initialize Firebase
firebase.initializeApp(config);
const firestore = firebase.firestore();

function pushViewer(data)
{    
    const viewersRef = firestore.collection("viewers")   
    
    const sendViewer = async () => {  
        await viewersRef.doc(data.country_code + "   " + dayjs().format('YYYY-MM-DD H:mm:ss')).set({
            timestamp: dayjs().format('YYYY-MM-DD H:mm:ss'),
            country: data.country_name,
            city: data.city,            
        })
    }
    sendViewer();
}    

const getData = async () => {    
    const res = await axios.get('https://geolocation-db.com/json/')  
    return res;   
}; 


async function getExams(lang) 
{
    const examRef = firestore.collection(`exams_${lang}`)
    const exams = await examRef.get()    

        
    return exams.docs.map(doc => doc.data());   
}

const API = {pushViewer, getData, getExams}
export default API
