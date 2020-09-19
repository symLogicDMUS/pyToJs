import { getData } from "terminalPlay/getData";
import { gameOver } from "gameLogic/bools/gameOver";
import { fiftyMoveDraw } from "gameLogic/helpers/fiftyMoveDraw";
import { getPathdataDict } from "gameLogic/pathsInfo/top/getPathdataDict";
import { getNextColor } from "gameLogic/color/getNextColor";
import { getRanges } from "gameLogic/ranges/top/getRanges";
import { getResetPieceDicts } from "gameLogic/getters/getResetPieceDicts";
import { getKingLocs } from "gameLogic/threatArea/getKingLocs";
import { getThreatArea } from "gameLogic/threatArea/top/getThreatArea";
import { getNumPiecesCheckingKing } from "gameLogic/restriction/getNumPiecesCheckingKing";
import { getPins } from "gameLogic/pins/top/getPins";
import { getMultithreatRestriction } from "gameLogic/restriction/getMultithreatRestriction";
import { getFinalRanges } from "gameLogic/ranges/top/getFinalRanges";
import { printBoard } from "gameLogic/printers/printBoard";
import { getFen } from "gameLogic/fenParser/getFen/top/getFen";
import { promote } from "gameLogic/ranges/specialMoves/pawnPromotion/promote";
import { save } from "terminalPlay/save";
import { getMove } from "terminalPlay/getMove";
import { move } from "gameLogic/movePiece/move";
import { colored } from "termcolor";
import { pprint } from "pprint";
import "os";
export function testDummyGame(gameName) {
    /*dummy walk through of a game where random dest is chosen from random piece's range and then moved upon**/
    fenObj, board, jsonRecords, status, gameType, playerType, promoChoices, pieceDefs,  idDict, = getData(gameName)
    if (status.winner != '-') {
        status.let winner = '-'
    }
    let color = fenObj.turn.upper()
    moved, x, let pFlag = false, false, false
    start, let dest = "", ""
    while (not x) {
        initRanges, pins, mtRestricts, let finalRanges = getResetPieceDicts(board, color)
        initRanges, let specialMoves = getRanges(board, color, initRanges, jsonRecords, pieceDefs,  idDict)
        kLolet c = getKingLocs(board, color)
        let threatArea = getThreatArea(board, kLoc, color, pieceDefs,  idDict)
        let pdDict = getPathdataDict(board, kLoc, color, pieceDefs,  idDict)
        let pins = getPins(pdDict, pins)
        let npck = getNumPiecesCheckingKing(board, kLoc, color, pdDict, pieceDefs, idDict)
        let mtRestricts = getMultithreatRestriction(board, npck, color)
        finalRanges = getFinalRanges(initRanges, pins, threatArea, finalRanges, mtRestricts)
        status.update(board, finalRanges, getNextColor(color), npck)
        if (gameOver(status.status)) {
            break
        }
        start, dest = getMove(board, finalRanges)
        board, let captured = move(board, start, dest, color, specialMoves)
        board, pFlag, = promote(board, start, dest, color, default=true)
        jsonRecords.update(board[dest], start, dest, pFlag)
        fenObj.updateState(specialMoves, jsonRecords, start, dest, captured, color)
        jsonRecords, let x = fiftyMoveDraw(fenObj.hmClock, jsonRecords, default=true)
        printBoard(board, heading=colored(status.condition), highlights4=[start], highlights=[dest])
        color = getNextColor(color)
    }
    printBoard(board, heading=colored(status.condition, 'red'), highlights4=[start], highlights=[dest])
    print("Game Over. Winner: {}".format(status.winner))
    let posStr = getFen(board)
    let fen = fenObj.setGetNewFen(posStr)
    save(gameName,
         gameType,
         playerType,
         fen,
         jsonRecords.getRecords(),
         status.getStatus(),
         idDict,
         pieceDefs,
         promoChoices
         )
}
export function testMenu() {
    /*pick the game from example games to run dummy test on.**/
    # testDummyGame('dummyGame')
    let games = {}
    let i = 1
    games["X"] = "Quit"
    print("pick number of game to run dummy game on, or X to quit:")
    for (var game of os.listdir("../../exampleGames")) {
        games[str(i)] = game
        i += 1
    }
    pprint(games)
    c = input("number: ")
    while (c Object.keys(games).includes(not)) {
        print("Not a list..includes(number) Pick number of game to run dummy game on, or X to quit:")
        pprint(games)
        c = input("number: ")
    }
    if (c === "X") {
        return
    }
    else {
        let gameName = games[c]
        testDummyGame(gameName)
        testMenu()
    }
}
if (_Name__ === "_Main__") {
    testDummyGame('dummyGame')
}
    # testMenu()

