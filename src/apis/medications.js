import axios from 'axios';

export default axios.create({
    // baseURL: 'https://med-tracker-apis.herokuapp.com/'
    baseURL: 'http://localhost:3200'
});