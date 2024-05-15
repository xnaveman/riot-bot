// SETUP AND INITS

import dotenv from 'dotenv';
dotenv.config();
import { Client ,IntentsBitField, Component } from 'discord.js';
import { EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import axios from 'axios';
import fs from 'fs';
import internal from 'stream';
import { parse } from 'path';;
import championData from './champion.json' assert { type: 'json' };


//IMPORTS FUNCTIONS FROM OTHER FILES
import { getChampionNameById } from './utils/getChampionNameById.js';
import { getPlayerUuid } from './API calls/getPlayerUuid.js'
import { getPlayerInfo } from './API calls/getPlayerInfo.js'
import { getPlayerRank } from './API calls/getPlayerRank.js'
import { getPlayerSpectate } from './API calls/getPlayerSpectate.js'


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


//BOOT
client.on('ready', (c) => {
    console.log(`${c.user.tag} est opérationnel.`)
});

client.on('messageCreate', (message) => {
    console.log(`${(message.author.tag)} à dit : ${(message.content)}`);
});


// VARIABLES INIT
let unrank = "https://static.wikia.nocookie.net/leagueoflegends/images/1/13/Season_2023_-_Unranked.png/revision/latest?cb=20231007211937"
let iron = "https://static.wikia.nocookie.net/leagueoflegends/images/f/f8/Season_2023_-_Iron.png/revision/latest?cb=20231007195831"
let bronze = "https://static.wikia.nocookie.net/leagueoflegends/images/c/cb/Season_2023_-_Bronze.png/revision/latest?cb=20231007195824"
let silver = "https://static.wikia.nocookie.net/leagueoflegends/images/c/c4/Season_2023_-_Silver.png/revision/latest?cb=20231007195834"
let gold = "https://static.wikia.nocookie.net/leagueoflegends/images/7/78/Season_2023_-_Gold.png/revision/latest?cb=20231007195829"
let platinum = "https://static.wikia.nocookie.net/leagueoflegends/images/b/bd/Season_2023_-_Platinum.png/revision/latest?cb=20231007195833"
let emerald = "https://static.wikia.nocookie.net/leagueoflegends/images/4/4b/Season_2023_-_Emerald.png/revision/latest?cb=20231007195827"
let diamond = "https://static.wikia.nocookie.net/leagueoflegends/images/3/37/Season_2023_-_Diamond.png/revision/latest?cb=20231007195826"
let master = "https://static.wikia.nocookie.net/leagueoflegends/images/d/d5/Season_2023_-_Master.png/revision/latest?cb=20231007195832"
let grandmaster = "https://static.wikia.nocookie.net/leagueoflegends/images/6/64/Season_2023_-_Grandmaster.png/revision/latest?cb=20231007195830"
let challenger = "https://static.wikia.nocookie.net/leagueoflegends/images/1/14/Season_2023_-_Challenger.png/revision/latest?cb=20231007195825"

let fleet = "<:FleetFootwork:1234863580013264978>"
let pta = "<:PressTheAttack:1234863624871219232> "
let conq = "<:Conqueror:1234863545393479781>"
let comet = "<:ArcaneComet:1234862724647878726>"
let aery = "<:SummonAery:1234862804079607860>"
let phase = "<:PhaseRush:1234863331064680480>"
let harvest = "<:DarkHarvest:1234863828974571520>"
let hail = "<:HailOfBlades:1234863873178210386>"
let electrocute = "<:Electrocute:1234863850377969725>"
let guardian = "<:Guardian:1234863408730472458>"
let aftershock = "<:VeteranAftershock:1234863491773628466>"
let grasp = "<:GraspOfTheUndying:1234863376413233192>"
let unsealed = "<:UnsealedSpellbook:1234863731645616130>"
let strike = "<:FirstStrike:1234863669960245259>"
let glacial = "<:GlacialAugment:1234863698334584892>"


// CHECKING FOR ALL INTERRACTION TYPE COMMANDS
client.on('interactionCreate', (interaction) => {
 if(!interaction.isChatInputCommand()) return;


if (interaction.commandName === 'account'){ 
 
    async function processOptions() {
        try {
            let pseudoOption = interaction.options.get("pseudo");
            let tagOption = interaction.options.get("tag");
            let summonerName = pseudoOption.value;
            let pseudo = pseudoOption.value.replace(/ /g, '%20');
            let tag = tagOption.value;
            let puuid = await getPlayerUuid(pseudo, tag);
            const accData = await getPlayerInfo(puuid);

            const rankData = await getPlayerRank(accData.id);
            const ranked5x5 = rankData.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
            let tier = "UNRANKED";
            let rank = "";

            if (ranked5x5) {
            tier = ranked5x5.tier;
            rank = ranked5x5.rank;
            }

            let rankIcon;
            if (tier === 'IRON') {
                rankIcon = iron;
            } else if (tier === 'BRONZE') {
                rankIcon = bronze;
            } else if (tier === 'SILVER') {
                rankIcon = silver;
            } else if (tier === 'GOLD') {
                rankIcon = gold;
            } else if (tier === 'PLATINUM') {
                rankIcon = platinum;
            } else if (tier === 'EMERALD') {
                rankIcon = emerald;
            } else if (tier === 'DIAMOND') {
                rankIcon = diamond;
            } else if (tier === 'MASTER') {
                rankIcon = master;
            } else if (tier === 'GRANDMASTER') {
                rankIcon = grandmaster;
            } else if (tier === 'CHALLENGER') {
                rankIcon = challenger;
            } else {
                rankIcon = unrank;
            }

            const embed = new EmbedBuilder()
	            .setColor(0x0099FF)
	            .setTitle(`${summonerName}`)
                .setAuthor({ name: `Rang soloqueue : ${tier} ${rank}`, iconURL: `${rankIcon}`})
	            .setURL(`https://www.op.gg/summoners/euw/${pseudo}-${tag}`)
	            .setDescription(`${summonerName} est actuellement Lvl ${accData.summonerLevel}`)
	            .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/${accData.profileIconId}.png`)
	            .setTimestamp()
	            .setFooter({ text: 'Développé par xnaveman', iconURL: 'https://avatars.githubusercontent.com/u/98226517?v=4' });


                interaction.reply({embeds: [embed]});
        } catch (error) {
            console.error("Erreur lors de la récupération de l'UUID du joueur :", error);
            interaction.reply('Une erreur est survenue lors de la récupération de l\'UUID du joueur.');
        }}
    processOptions();
}

if (interaction.commandName === 'spectate'){
    async function processOptions() {
        try{
            let pseudoOption = interaction.options.get("pseudo");
            let tagOption = interaction.options.get("tag");
            let summonerName = pseudoOption.value;
            let pseudo = pseudoOption.value.replace(/ /g, '%20');
            let tag = tagOption.value;
            let puuid = await getPlayerUuid(pseudo, tag);
            const accData = await getPlayerInfo(puuid);
            const activeGame = await getPlayerSpectate(puuid);
            console.log(activeGame);
            let gameLength = activeGame.gameLength;
            let gameLengthMinutes = Math.floor(gameLength / 60);
            let gameStartTime = activeGame.gameStartTime;


            const date = new Date(gameStartTime);
            const hours = date.getHours();
            const minutes = date.getMinutes();

            const formattedDateTime = `${hours}:${minutes}`;

            const embedDuration = new EmbedBuilder()
	            .setColor(0x999999)
	            .setTitle(`__${summonerName}__`)
                .setAuthor({ name: `La partie dure depuis ${gameLengthMinutes} Minutes`,})
	            .setDescription(`Elle a commencé à  ${formattedDateTime}`)
	            .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/${accData.profileIconId}.png`)
	            .setTimestamp()
	            .setFooter({ text: 'Développé par xnaveman', iconURL: 'https://avatars.githubusercontent.com/u/98226517?v=4' });
            

                // ORDER DATA FETCHED INTO VARIABLE
                const participants = activeGame.participants;

                // SEPARATE PLAYERS
                const blueSide = participants.filter(player => player.teamId === 100);
                const redSide = participants.filter(player => player.teamId === 200);


                participants.forEach(player => {
                    const { perkIds, perkStyle, perkSubStyle } = player.perks;
                
                    console.log("Perk IDs:", perkIds);
                    console.log("Perk Style:", perkStyle);
                    console.log("Perk SubStyle:", perkSubStyle);
                });


                // CREATE EMBEDS FOR EACH TEAMS
                const embedBlueSide = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({name: 'Blue Side', iconURL:'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/2087.png'})
                
                const embedRedSide = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({name: 'Red Side', iconURL:'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/2088.png'})

                    
                // ADD CHAMPS FOR EACH PLAYER IN EMBEDS
                blueSide.forEach(player => {
                    const championId = player.championId;
                    const championName = getChampionNameById(championId, championData);
                    let firstPerkId = player.perks.perkIds[0];

                    if (firstPerkId === 8021) {
                        firstPerkId = fleet;
                    } else if ( firstPerkId === 8005){
                        firstPerkId = pta;
                    } else if ( firstPerkId === 8112){
                        firstPerkId = electrocute;
                    } else if ( firstPerkId === 8128){
                        firstPerkId = harvest;
                    } else if ( firstPerkId === 9923){
                        firstPerkId = hail;
                    } else if ( firstPerkId === 8351){
                        firstPerkId = glacial;
                    } else if ( firstPerkId === 8360){
                        firstPerkId = unsealed;
                    } else if ( firstPerkId === 8369){
                        firstPerkId = strike;
                    } else if ( firstPerkId === 8010){
                        firstPerkId = conq;
                    } else if ( firstPerkId === 8437){
                        firstPerkId = grasp;
                    } else if ( firstPerkId === 8439){
                        firstPerkId = aftershock;
                    } else if ( firstPerkId === 8465){
                        firstPerkId = guardian;
                    } else if ( firstPerkId === 8214){
                        firstPerkId = aery;
                    } else if ( firstPerkId === 8229){
                        firstPerkId = comet;
                    } else if ( firstPerkId === 8230){
                        firstPerkId = phase;
                    };

                    console.log(championName);
                
                    embedBlueSide.addFields({
                        name: `__${player.riotId}__`,
                        value: `${championName} - ${firstPerkId}\n`,
                        inline: false
                    });
                });
                
                redSide.forEach((player) => {
                    const championId = player.championId;
                    const championName = getChampionNameById(championId, championData);
                    let firstPerkId = player.perks.perkIds[0];

                    if (firstPerkId === 8021) {
                        firstPerkId = fleet;
                    } else if ( firstPerkId === 8005){
                        firstPerkId = pta;
                    } else if ( firstPerkId === 8112){
                        firstPerkId = electrocute;
                    } else if ( firstPerkId === 8128){
                        firstPerkId = harvest;
                    } else if ( firstPerkId === 9923){
                        firstPerkId = hail;
                    } else if ( firstPerkId === 8351){
                        firstPerkId = glacial;
                    } else if ( firstPerkId === 8360){
                        firstPerkId = unsealed;
                    } else if ( firstPerkId === 8369){
                        firstPerkId = strike;
                    } else if ( firstPerkId === 8010){
                        firstPerkId = conq;
                    } else if ( firstPerkId === 8437){
                        firstPerkId = grasp;
                    } else if ( firstPerkId === 8439){
                        firstPerkId = aftershock;
                    } else if ( firstPerkId === 8465){
                        firstPerkId = guardian;
                    } else if ( firstPerkId === 8214){
                        firstPerkId = aery;
                    } else if ( firstPerkId === 8229){
                        firstPerkId = comet;
                    } else if ( firstPerkId === 8230){
                        firstPerkId = phase;
                    };

                    console.log(championName);

                    embedRedSide.addFields({
                        name: `__${player.riotId}__`,
                        value: `${championName} - ${firstPerkId}\n`,
                        inline: false
                    });
                });

                


            interaction.reply({ embeds: [embedDuration, embedBlueSide, embedRedSide] });
        } catch (error){
            console.error("Erreur lors de la récupération de la partie en cours du joueur :", error);
            interaction.reply('Le joueur n\'est actuellement pas en jeu');
        }}
    processOptions();
}
});


// PROCESS TO LINK THE ENV PROCESS AND THE TOKEN OF THE DISCORD APP
const apiKey = process.env.API_KEY;
client.login(process.env.TOKEN);