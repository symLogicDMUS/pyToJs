import { offsetStrsToList } from "apiHelpers/offsetStrsToList";
import { initDdEmptyLists } from "apiHelpers/initDdEmptyLists";
import { getJson } from "gameLogic/testObjects/getJson";
import { pprint } from "pprint";
export function ddOffsetStrsToList(dataDict) {
    /* **/
    for (var gameName of Object.keys(dataDict)) {
        dataDict[gameName]['defs'] = offsetStrsToList(dataDict[gameName]['defs'])
    }
    return dataDict
}
if (_Name__ === "_Main__") {
    let dataDict = initDdEmptyLists(getJson('/home/brian/ChessKingsCouncil/pythonBackend/gameLogic/testObjects'
                                              '/dataDicts/dd1.json'))
}
    pprint(ddOffsetStrsToList(dataDict))

