import { initEmptyRanges } from "apiHelpers/initEmptyRanges";
import { getJson } from "gameLogic/testObjects/getJson";
import { pprint } from "pprint";
export function initDdEmptyLists(dataDict) {
    /* **/
    for (var gameName of Object.keys(dataDict)) {
        dataDict[gameName]['defs'] = initEmptyRanges(dataDict[gameName]['defs'])
        if ('promos' dataDict.includes(not)[gameName].keys()) {
            dataDict[gameName]['promos'] = []
        }
        if ('pawnHistories' dataDict.includes(not)[gameName]['json'].keys()) {
            dataDict[gameName]['json']['pawnHistories'] = {}
        }
    }
    return dataDict
}
if (_Name__ === "_Main__") {
    pprint(initDdEmptyLists(
}
        getJson("/home/brian/ChessKingsCouncil/pythonBackend/gameLogic/testObjects/dataDicts/dd1.json")))

