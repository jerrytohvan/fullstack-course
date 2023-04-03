import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';

const baseUrl = 'http://localhost:3001/persons'

export const getAllPhonebook = () => {
    const request = axios.get(baseUrl);
    const response = request.then(res => res.data);
    return response;
}

export const getPhonebook = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = request.then(res => res.data);
    return response;
}

export const addPhonebook = (people) => {
    const request = axios.post(baseUrl, {  id: uuidv1(), ...people });
    const response = request.then(res => res.data);
    return response;
}

export const deletePhonebook = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = request.then(res => res.data);
    return response;
}