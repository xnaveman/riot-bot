import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;

export async function getPlayerUuid(gameName, tagLine) {

    try {
        let response = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`);
        return response.data.puuid;
    } catch (error) {
        console.error('erreur API', error);
        throw error;
    }
}