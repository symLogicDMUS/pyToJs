import "json";
import { pprint } from "pprint";
import { getTurnData } from "apiHelpers/getTurnData";
import { ddOffsetStrsToList } from "apiHelpers/ddOffsetStrsToList";
import { initDdEmptyLists } from "apiHelpers/initDdEmptyLists";
import { Fen } from "gameLogic/fenParser/Fen";
import { getBoard } from "gameLogic/fenParser/getBoard/top/getBoard";
import { getFenData } from "gameLogic/fenParser/GameStatus/getFenData";
import { JsonRecords } from "gameLogic/JsonRecords/JsonRecords";
import { initPawnIds } from "gameLogic/JsonRecords/initPawnIds";
import { getAiColor } from "gameLogic/color/getAiColor";
import { mapXyToRf } from "gameLogic/coordType/rankfile/mapXyToRf";
import { mapRfToXy } from "gameLogic/coordType/xy/mapRfToXy";
import { getNextColor } from "gameLogic/color/getNextColor";
import { getJson } from "gameLogic/testObjects/getJson";
export function parseData(data) {
    /*called at start of new or saved game. Get first instance of turn data. parameters are data fetched from db**/
    fen, records, playerColor, pieceDefs, let idDict = data['fen'], data['json'], data['pt'], data['defs'], data['ids']
    let board = getBoard(fen)
    let jsonRecords = JsonRecords(initPawnIds(mapRfToXy(records), board))
    turn, castleAvail, enPassantAvail, hmNum, let fmNum = getFenData(fen)
    let fenObj = Fen(fen, turn, castleAvail, enPassantAvail, hmNum, fmNum)
    let color = fenObj.turn.upper()
    let aiColor = getAiColor(playerColor)
    let turnData = getTurnData(board, color, aiColor, jsonRecords, pieceDefs, idDict)
    let enemyTurnData = getTurnData(board, getEnemyColor(color), aiColor, jsonRecords,  pieceDefs, idDict)
    let payload = {'color': color,
               'board': mapXyToRf(board),
               'records': mapXyToRf(jsonRecords.getRecords()),
               'fenData': fenObj.getData(),
               'pieceExport functions' { pieceExport functions,
               'idDict': idDict,
               'moves': turnData['moves'],
               'ranges': turnData['ranges'],
               'enemyRanges': enemyTurnData['ranges'],
               'aiStart': turnData['aiStart'],
               'aiDest': turnData['aiDest'],
               'aiCapture': turnData['aiCapture'],
               'status': data['status'],
               'promos': data['promos'],
               'type': data['type'],
               'pt': playerColor
               }
    return payload
}
if (_Name__ === "_Main__") {
    let dataDict = getJson("../gameLogic/testObjects/dataDicts/dd2.json")
    dataDict = initDdEmptyLists(dataDict)
    dataDict = ddOffsetStrsToList(dataDict)
    for (var gameName of Object.keys(dataDict)) {
        dataDict[gameName] = parseData(dataDict[gameName])
    }
    print("================================== records ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['records'])
    }
    print("================================== board ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['board'])
    }
    print("================================== moves ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['moves'])
    }
    print("================================== ranges ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['ranges'])
    }
    print("================================== enemyRanges ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['enemyRanges'])
    }
    print("================================== aiStart ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['aiStart'])
    }
    print("================================== aiDest ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
        pprint(dataDict[gameName]['aiDest'])
    }
    print("================================== aiCapture ==================================")
    for (var gameName of Object.keys(dataDict)) {
        print(gameName, ":")
    }
}
        pprint(dataDict[gameName]['aiCapture'])

