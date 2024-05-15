import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;

export async function getPlayerInfo(puuid) {

    try {
        let response = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('erreur API', error);
        throw error;
    }
}