import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const updateUI = (data) => {
    const dataElement = document.getElementById('data-container');
    if(data) {
        dataElement.innerHTML = JSON.stringify(data, null, 2);
    } else {
        dataElement.innerHTML = 'Failed to load data';
    }
};

const handleGetDataClick = async () => {
    const data = await fetchData('data'); 
    updateUI(data);
};

const init = () => {
    const getDataButton = document.getElementById('get-data-btn');
    getDataButton.addEventListener('click', handleGetDataClick);
};

window.onload = init;