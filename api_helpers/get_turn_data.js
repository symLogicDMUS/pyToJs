import { getRanges } from "gameLogic/ranges/top/getRanges";
import { getPathdataDict } from "gameLogic/pathsInfo/top/getPathdataDict";
import { getResetPieceDicts } from "gameLogic/getters/getResetPieceDicts";
import { getKingLocs } from "gameLogic/threatArea/getKingLocs";
import { getThreatArea } from "gameLogic/threatArea/top/getThreatArea";
import { getNumPiecesCheckingKing } from "gameLogic/restriction/getNumPiecesCheckingKing";
import { getMultithreatRestriction } from "gameLogic/restriction/getMultithreatRestriction";
import { getFinalRanges } from "gameLogic/ranges/top/getFinalRanges";
import { mapXyToRf } from "gameLogic/coordType/rankfile/mapXyToRf";
import { getPins } from "gameLogic/pins/top/getPins";
import { statusUpdate } from "gameLogic/fenParser/GameStatus/statusUpdate";
import { getNextColor } from "gameLogic/color/getNextColor";
import { isCheckmate } from "gameLogic/fenParser/GameStatus/isCheckmate";
import { aiMove } from "apiHelpers/aiMove";
export function getTurnData(board, color, aiColor, jsonRecords, pieceExport functions, idDict) {
    /**data for player who's turn it is now, at current the.includes(point) game
    calculations:
    ............
    final ranges: where every piece of player's pieces can move to.
    status: is it check, checkmate, stalemate or none of these? is the game over?
    aiStart: the starting square of a move if it is the computer's turn
    aiDest: the ending square of a move if it is the computer's turn
    ............
    */
    initRanges, pins, mtRestricts, let finalRanges = getResetPieceDicts(board, color)
    initRanges, let specialMoves = getRanges(board, color, initRanges, jsonRecords, pieceDefs, idDict)
    let kLoc = getKingLocs(board, color)
    let threatArea = getThreatArea(board, kLoc, color, pieceDefs, idDict)
    let pdDict = getPathdataDict(board, kLoc, color, pieceDefs, idDict)
    let pins = getPins(pdDict, pins)
    let npck = getNumPiecesCheckingKing(board, kLoc, color, pdDict, pieceDefs, idDict)
    let mtRestricts = getMultithreatRestriction(board, npck, color)
    finalRanges = getFinalRanges(initRanges, pins, threatArea, finalRanges, mtRestricts)
    specialMoves.setPromos(board, finalRanges, color)
    if (color === aiColor and not checkmate(finalRanges)) {
        aiCapture, aiStart, let aiDest = aiMove(board, finalRanges, aiColor, specialMoves)
    }
    else {
        aiCapture, aiStart, aiDest = false, false, false
    }
    let data = {'status': statusUpdate(board, finalRanges, getEnemyColor(color), npck)}
    data.update(mapXyToRf({"ranges": finalRanges,
                              "moves": specialMoves.getMoves(),
                              "aiStart": aiStart,
                              "aiDest": aiDest,
                              "aiCapture": aiCapture}))
}
    return data

