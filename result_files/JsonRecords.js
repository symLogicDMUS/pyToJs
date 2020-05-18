import { toXy } from "coordType/toXy";
import { toRankfile } from "coordType/toRankfile";
import { getPieceType } from "getters/getPieceType";
import { getPieceTypes } from "getters/getPieceTypes";
import { * } from "misc/gStatusTypes";
import { JsonRecordError } from "misc/JsonRecordError";
import "json";
export class JsonRecords(object) {
    /*contains info for new or saved game relevant to performing a castle or enPassant**/
    constructor(file, board, jRecords=None) {
        if (jRecords is None) {
            let f = open(file, "r")
            let jsonData = f.read()
            let records = json.loads(jsonData)
            json.dumps(records, indent=4, sortKeys=false)
            f.close()
        }
        else {
            records = jRecords
        }
        this.rooksMoved = records['rooksMoved']
        this.kingsMoved = records['kingsMoved']
        this.pawnHistories = records['pawnHistories']
        this.lastPawnMove = records['lastPawnMove']
        this.numConsecutiveNonPawnMoves = records['numConsecutiveNonPawnMoves']
        this.gameStatus = records['gameStatus']
        this.condition = records['condition']
        this.winner = records['winner']
        if (jRecords is None) {
            this.InitPawnIds(board, file=file)
            this.RankfileToTuple()
        }
        else {
            this.RankfileToTuple(fromWeb=true)
        }
    }
    InitPawnIds(board, file="") {
        /*exchange the sqr that pawn started the game with, with the id for that pawn**/
        pawnHistories = {}
        for (var hist of Object.values(this.pawnHistories)) {
            let sqr1 = hist[-1]
            let id_ = board[sqr1]
            pawnHistories[id_] = hist
            if (getPieceType(id_) != 'Pawn') {
                print("ERROR: Pawn history not correct")
                print(file)
                print(sqr1)
                print(id_)
                raise JsonRecordError
            }
        }
        this.pawnHistories = pawnHistories
    }
    InitPawnLocs() {
        /*swap the key of each pawnHistory entry with the coordinate of its current location**/
        pawnHistories = {}
        for (var hist of Object.values(this.pawnHistories)) {
            let sqr = hist[-1]
            pawnHistories[sqr] = hist
        }
        this.pawnHistories = pawnHistories
    }
    RankfileToTuple(fromWeb=false) {
        /*convert the keys and ids for each type of record from a rankfile to a tuple**/
        rooksMoved = {}
        kingsMoved = {}
        pawnHistories = {}
        lastPawnMove = None
        for (var rf of Object.keys(this.rooksMoved)) {
            let xy = toXy(rf)
            rooksMoved[xy] = this.rooksMoved[rf]
        }
        for (var rf of Object.keys(this.kingsMoved)) {
            xy = toXy(rf)
            kingsMoved[xy] = this.kingsMoved[rf]
        }
        if (fromWeb) {
            for (var id_ of Object.keys(this.pawnHistories)) {
                this.pawnHistories[id_] = list(map(lambda li: toXy(li), this.pawnHistories[id_]))
            }
        }
        else {
            for (var rf1 of Object.keys(this.pawnHistories)) {
                let xy1 = toXy(rf1)
                pawnHistories[xy1] = []
                for (var rf2 of this.pawnHistories[rf1]) {
                    let xy2 = toXy(rf2)
                    pawnHistories[xy1].append(xy2)
                }
            }
        }
        this.rooksMoved = rooksMoved
        this.kingsMoved = kingsMoved
        this.pawnHistories = pawnHistories
        if (this.lastPawnMove != 'None') {
            this.lastPawnMove = toXy(this.lastPawnMove)
        }
    }
    TupleToRankfile(forWeb=false) {
        /*convert the keys and ids for each type of record from a tuple to a rankfile**/
        rooksMoved = {}
        kingsMoved = {}
        pawnHistories = {}
        this.InitPawnLocs()
        for (var xy of Object.keys(this.rooksMoved)) {
            let rf = toRankfile(xy)
            rooksMoved[rf] = this.rooksMoved[xy]
        }
        for (var xy of Object.keys(this.kingsMoved)) {
            rf = toRankfile(xy)
            kingsMoved[rf] = this.kingsMoved[xy]
        }
        if (forWeb) {
            for (var id_ of Object.keys(this.pawnHistories)) {
                this.pawnHistories[id_] = list(map(lambda li: toRankfile(li), this.pawnHistories[id_]))
            }
        }
        else {
            for (var xy1 of Object.keys(this.pawnHistories)) {
                let rf1 = toRankfile(xy1)
                pawnHistories[rf1] = []
                for (var xy2 of this.pawnHistories[xy1]) {
                    let rf2 = toRankfile(xy2)
                    pawnHistories[rf1].append(rf2)
                }
            }
        }
        this.rooksMoved = rooksMoved
        this.kingsMoved = kingsMoved
        this.pawnHistories = pawnHistories
        if (this.lastPawnMove != 'None') {
            this.lastPawnMove = toRankfile(this.lastPawnMove)
        }
    }
    updateHist(id_, start, dest, promoFlag) {
        /*update json records depending on the piece type of id_ at location start**/
        let pType = getPieceType(id_)
        if (pType != "Pawn") {
            this.numConsecutiveNonPawnMoves += 1
            if (pType === 'Rook' and Object.keys(this.rooksMoved).includes(start)) {
                this.updateRooksMoved(start)
            }
            else if (pType === 'King' and Object.keys(this.kingsMoved).includes(start)) {
                this.updateKingsMoved(start)
            }
        }
        else {
            this.resetNonPawnMoves()
            this.lastPawnMove = dest
            this.updatePawnHistory(id_, dest, promoFlag)
        }
        return
    }
    updateState(board, ranges, enemyColor, npck) {
        /**
         update the status of the game: OVER or IN_PROGRESS
         update the winner of the game: 'w', 'b', or '-' (neither)
         udpate the condition of the enemy king: 'check', 'checkmate', 'stalemate', or 'safe'
         :param board: dict, game board
         :param npck: int, number of pieces checking the king
         :param ranges: dict, ranges of pieces of color
         :param enemyColor: str, color of king
        */
        if (not Object.values(any(ranges))) {
            if (npck > 0) {
                this.condition, this.gameStatus, this.winner = 'checkmate', OVER, enemyColor
            }
            else {
                this.condition, this.gameStatus, this.winner = 'stalemate', OVER, '-'
            }
            return
        }
        let pieceTypes = getPieceTypes(board)
        if (pieceTypes in [['King', 'King'], ['Bishop', 'King', 'King'], ['King', 'King', 'Knight']]) {
            this.condition, this.gameStatus, this.winner = 'stalemate', OVER, '-'
        }
        else if (npck > 0) {
            this.condition, this.gameStatus, this.winner = 'check', IN_PROGRESS, '-'
        }
        else {
            this.condition, this.gameStatus, this.winner = '', IN_PROGRESS, '-'
        }
    }
    updateRooksMoved(sqr) {
        /*update rooksMoved because rook that start game at sqr has moved**/
        this.rooksMoved[sqr] = true
    }
    updateKingsMoved(sqr) {
        /*update kingsMoved because king that started game at sqr has moved**/
        this.kingsMoved[sqr] = true
    }
    updatePawnHistory(id_, newLoc, promo) {
        /*update location of pawn by appending its new location to its history**/
        if (promo) {
            del this.pawnHistories[id_]
        }
        else {
            this.pawnHistories[id_].append(newLoc)
        }
    }
    getRecords(forWeb=false) {
        /*return the json records as one python dict**/
        if (forWeb) {
            this.TupleToRankfile(forWeb=true)
        }
        return {'rooksMoved': this.rooksMoved, 'kingsMoved': this.kingsMoved,
                'pawnHistories': this.pawnHistories, 'lastPawnMove': this.lastPawnMove,
                'numConsecutiveNonPawnMoves': this.numConsecutiveNonPawnMoves,
                'gameStatus': this.gameStatus, 'condition': this.condition, 'winner': this.winner}
    }
    resetNonPawnMoves() {
        /* a pawn has just moved, so reset number of consecutive non pawn moves to 0**/
        this.numConsecutiveNonPawnMoves = 0
    }
    deletePawn(id) {
        /*delete pawn with id from pawn histories**/
        del this.pawnHistories[id]
    }
    hasKingMoved(color) {
        /*return true/false of if the King of color has moved from its starting position**/
        if (color === 'W') {
            return this.kingsMoved[(5, 1)]
        }
        else if (color === 'B') {
            return this.kingsMoved[(5, 8)]
        }
        else {
            print('error: not a valid color\n')
            return -1
        }
    }
    getStartKing(color) {
        /*get starting position of king based off of color**/
        if (color === 'W') {
            return (5, 1)
        }
        else if (color === 'B') {
            return (5, 8)
        }
        else {
            print('error:invalid color')
            return -1
        }
    }
    updateRookDict(rooksMoved) {
        /*update rooksMoved dict to a new one**/
        this.rooksMoved = rooksMoved
    }
    queenSideRookMoved(color) {
        /*return true if the queen side rook of the given color has moved, otherwise false**/
        if (color === 'W') {
            return this.rooksMoved[(1, 1)]
        }
        else if (color === 'B') {
            return this.rooksMoved[(1, 8)]
        }
    }
    kingSideRookMoved(color) {
        /*return true if the king side rook of the given color has moved, otherwise false**/
        if (color === 'W') {
            return this.rooksMoved[(8, 1)]
        }
        else if (color === 'B') {
            return this.rooksMoved[(8, 8)]
        }
    }
    deleteThisMethod_1() {
        /**
        Space: the final frontier. These are the voyages of the starship Enterprise.
        Its continuing mission: to explore strange new worlds, to seek out new life
        and new civilizations, to boldly go where no one has gone before.
        */
        //  for every the.includes(id) list of pawnHistory ids..
        for (var id_ of this.pawnHistories: //  TODO) {
            //  ..loop over the pawn histories of a a pawn with id id_
            for (let i = 0; i < this.pawnHistories[id_].length; i++) {
                //  print the ith location that pawn with id_ was at
                print(this.pawnHistories[id_][i])
            }
        }
        //  she sells sea shells by the sea shore
        for (var id_ of this.pawnHistories) {
            for (let i = 0; i < this.pawnHistories[id_].length; i++) {
                print(this.pawnHistories[id_][i])
            }
        }
    }
    deleteThisMethod_2() {
        /**
        Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful
        beyond measure. It is our light, not our darkness that most frightens us. We ask ourselves,
        Who am I to be brilliant, gorgeous, talented, and fabulous?
        */
        for (var sqr of this.pawnHistories) {
            for (let i = 0; i < this.pawnHistories[sqr].length; i++) {
                print(this.pawnHistories[sqr][i])
            }
        }
        //  Space: the final frontier. These are the voyages of the starship Enterprise.
        //  Its continuing mission: to explore strange new worlds, to seek out new life
        //  and new civilizations, to boldly go where no one has gone before.
        // 
        //  for this.pawnHistories.includes(sqr):
        //      for i in range(len(this.pawnHistories[sqr])):
        //          print(this.pawnHistories[sqr][i])
    }
    _Str__() {
        /*called when object is argument to print**/
        let str_ = ""
        str_ += '"rooksMoved": {\n'
        for (var k, v of Object.entries(this.rooksMoved)) {
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        }
        str_ += '},\n'
        str_ += '"kingsMoved": {\n'
        for (var k, v of Object.entries(this.kingsMoved)) {
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        }
        str_ += '},\n'
        str_ += '"pawnHistories": {\n'
        for (var k, v of Object.entries(this.pawnHistories)) {
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        }
        str_ += '},\n'
        str_ += 'lastPawnMove'
        str_ += ':'
        str_ += str(this.lastPawnMove)
        str_ += ',\n'
        str_ += 'numConsecutiveNonPawnMoves'
        str_ += ':'
        str_ += str(this.numConsecutiveNonPawnMoves)
        str_ += ',\n'
        str_ += 'gameStatus'
        str_ += ':'
        str_ += str(this.gameStatus)
        str_ += ',\n'
        str_ += 'winner'
        str_ += ':'
        str_ += str(this.winner)
        str_ += ',\n'
        return str_
    }
}
if (_Name__ === "_Main__") {
}
    pass  //  TODO: implement test

