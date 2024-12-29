import axios from "axios";
import { TimeResponse } from '../types';


export const getTime = async (): Promise<TimeResponse> => {
    const token = sessionStorage.getItem("jwt");

    console.log(token);

    const response = await axios.get('http://localhost:5000/time', {
        headers: { 'Authorization' : token }
    });

    console.log(response.data.time);

    return response.data.time;
}