import dotenv from 'dotenv';
dotenv.config();
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

const commands = [
    {
        name: 'stats',
        description: 'Obtient les informations d\'un compte par RiotID',
        options: [
            {
                name: 'pseudo',
                description: 'Ton pseudo en jeu',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tag',
                description: 'Ton tag en jeu (#....) SANS LE # !!',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'spectate',
        description: 'Donne les informations d\'une partie en cours d\'un joueur par RiotID',
        options: [
            {
                name: 'pseudo',
                description: 'Ton pseudo en jeu',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tag',
                description: 'Ton tag en jeu (#....) SANS LE # !!',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'track',
        description: 'Traque un joueur spécifique et le harcèle via DM discord (surtout s\'il perd ou s\'il joue Teemo)',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Commandes slash init...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Commandes slash ok');
    } catch (error) {
        console.log(error);
    }
})();