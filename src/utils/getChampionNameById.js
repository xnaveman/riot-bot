export function getChampionNameById(championId, championData) {
    for (let champion in championData.data) {
        if (championData.data[champion].key == championId) {
            return championData.data[champion].name;
        }
    }
    return null;
}