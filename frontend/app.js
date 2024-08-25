import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const fetchData = async (endpoint) => {
    try {
        const { data } = await axios.get(`${API_URL}/${endpoint}`);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const updateUI = (data) => {
    const dataElement = document.getElementById('data-container');
    if (data) {
        dataElement.textContent = JSON.stringify(data, null, 2);
    } else {
        dataElement.textContent = 'Failed to load data';
    }
};

const handleGetDataClick = async () => {
    const data = await fetchData('data');
    updateUI(data);
};

const init = () => {
    const getDataButton = document.getElementById('get-data-btn');
    if(getDataButton) {
        getDataButton.addEventListener('click', handleGetDataClick);
    }
};

if(document.readyState === 'loading') {  
    document.addEventListener('DOMContentLoaded', init);
} else {  
    init();
}