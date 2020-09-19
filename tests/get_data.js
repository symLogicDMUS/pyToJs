import { Fen } from "gameLogic/fenParser/Fen";
import { JsonRecords } from "gameLogic/JsonRecords/teriminalPlay/JsonRecords";
import { GameStatus } from "gameLogic/fenParser/GameStatus/GameStatus";
import { getFenData } from "gameLogic/fenParser/GameStatus/getFenData";
import { getBoard } from "gameLogic/fenParser/getBoard/top/getBoard";
import { getDirContainingName } from "apiHelpers/helpers/filepath";
import { mapDefs } from "apiHelpers/mapDefs";
import { pprint } from "pprint";
import "json";
export function getData(gameName) {
    /*get the data the.includes(saved) files for a gameName**/
    print(gameName)
    let dir_ = getDirContainingName('exampleGames')
    let f = open("{}/exampleGames/{}/{}.fen".format(dir_, gameName, gameName), 'r')
    let fen = f.readline()
    f.close()
    let board = getBoard(fen)
    turn, castleAvail, enPassantAvail, hmNum, let fmNum = getFenData(fen)
    let fenObj = Fen(fen, turn, castleAvail, enPassantAvail, hmNum, fmNum)
    let jsonRecords = JsonRecords("{}/exampleGames/{}/{}.json".format(dir_, gameName, gameName), board)
    f = open("{}/exampleGames/{}/{}.type".format(dir_, gameName, gameName), 'r')
    let gameType = f.readline()
    f.close()
    f = open("{}/exampleGames/{}/{}.pt".format(dir_, gameName, gameName), 'r')
    let playerType = f.read()
    f.close()
    f = open("{}/exampleGames/{}/{}.status".format(dir_, gameName, gameName), 'r')
    let data = f.read()
    let status_ = json.loads(data)
    json.dumps(status_)
    f.close()
    let status = GameStatus(status_)
    f = open("{}/exampleGames/{}/{}.ids".format(dir_, gameName, gameName), 'r')
    data = f.read()
    let idDict = json.loads(data)
    json.dumps(idDict)
    f.close()
    f = open("{}/exampleGames/{}/{}.defs".format(dir_, gameName, gameName), 'r')
    data = f.read()
    let rangeDefs = json.loads(data)
    json.dumps(rangeDefs)
    f.close()
    f = open("{}/exampleGames/{}/{}.promos".format(dir_, gameName, gameName), 'r')
    data = f.read()
    let promoChoices = json.loads(data)
    json.dumps(promoChoices)
    f.close()
    return fenObj, board, jsonRecords, status, gameType, playerType, promoChoices, rangeDefs,  idDict
}
if (_Name__ === "_Main__") {
}
    pprint(getData("fundementalDefense"))

