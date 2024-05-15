import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;

export async function getPlayerRank(suuid) {
    try{
        let response = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${suuid}?api_key=${apiKey}`);
        console.log(response.data);
        return response.data;
    } catch (error){
        console.error('erreur API', error);
        throw error;
    }
}