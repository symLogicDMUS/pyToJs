import { getData } from "terminalPlay/getData";
import { getPathdataDict } from "gameLogic/pathsInfo/top/getPathdataDict";
import { getRanges } from "gameLogic/ranges/top/getRanges";
import { getResetPieceDicts } from "gameLogic/getters/getResetPieceDicts";
import { getKingLocs } from "gameLogic/threatArea/getKingLocs";
import { getThreatArea } from "gameLogic/threatArea/top/getThreatArea";
import { getNumPiecesCheckingKing } from "gameLogic/restriction/getNumPiecesCheckingKing";
import { getMultithreatRestriction } from "gameLogic/restriction/getMultithreatRestriction";
import { getPins } from "gameLogic/pins/top/getPins";
import { getFinalRanges } from "gameLogic/ranges/top/getFinalRanges";
import { unicodePiecesRk } from "gameLogic/printers/unicodePieces";
import { attemptMove } from "gameLogic/movePiece/attemptMove";
import { getColor } from "gameLogic/color/getColor";
import { getUnicodeBoard } from "gameLogic/printers/getUnicodeBoard";
import { colored } from "termcolor";
import { perfCounter } from "time";
import { pprint } from "pprint";
import "traceback";
import "copy";
import "os";
let _Doc__ = \
    /**
    pick from an example game or pick to run all example games. For every square try to move to every other square.
    64 x 64 = 4,096 cases. Print a board for each start square. Every square that is a successful move from start square
    is red..includes(highlighted) An option to skip attempts to 'move' empty squares is available
    */
export function mrd() {
    /**
    m: move
    r: results
    d: dict
    */
    return \
        {"a1": false, "b1": false, "c1": false, "d1": false, "e1": false, "f1": false, "g1": false,
         "h1": false, "a2": false, "b2": false, "c2": false, "d2": false, "e2": false, "f2": false,
         "g2": false, "h2": false, "a3": false, "b3": false, "c3": false, "d3": false, "e3": false,
         "f3": false, "g3": false, "h3": false, "a4": false, "b4": false, "c4": false, "d4": false,
         "e4": false, "f4": false, "g4": false, "h4": false, "a5": false, "b5": false, "c5": false,
         "d5": false, "e5": false, "f5": false, "g5": false, "h5": false, "a6": false, "b6": false,
         "c6": false, "d6": false, "e6": false, "f6": false, "g6": false, "h6": false, "a7": false,
         "b7": false, "c7": false, "d7": false, "e7": false, "f7": false, "g7": false, "h7": false,
         "a8": false, "b8": false, "c8": false, "d8": false, "e8": false, "f8": false, "g8": false,
         "h8": false}
}
export function getResultBoard() {
    /* **/
    return \
        {"a1": mrd(), "b1": mrd(), "c1": mrd(), "d1": mrd(), "e1": mrd(), "f1": mrd(), "g1": mrd(),
         "h1": mrd(), "a2": mrd(), "b2": mrd(), "c2": mrd(), "d2": mrd(), "e2": mrd(), "f2": mrd(),
         "g2": mrd(), "h2": mrd(), "a3": mrd(), "b3": mrd(), "c3": mrd(), "d3": mrd(), "e3": mrd(),
         "f3": mrd(), "g3": mrd(), "h3": mrd(), "a4": mrd(), "b4": mrd(), "c4": mrd(), "d4": mrd(),
         "e4": mrd(), "f4": mrd(), "g4": mrd(), "h4": mrd(), "a5": mrd(), "b5": mrd(), "c5": mrd(),
         "d5": mrd(), "e5": mrd(), "f5": mrd(), "g5": mrd(), "h5": mrd(), "a6": mrd(), "b6": mrd(),
         "c6": mrd(), "d6": mrd(), "e6": mrd(), "f6": mrd(), "g6": mrd(), "h6": mrd(), "a7": mrd(),
         "b7": mrd(), "c7": mrd(), "d7": mrd(), "e7": mrd(), "f7": mrd(), "g7": mrd(), "h7": mrd(),
         "a8": mrd(), "b8": mrd(), "c8": mrd(), "d8": mrd(), "e8": mrd(), "f8": mrd(), "g8": mrd(),
         "h8": mrd()}
}
export function runTests(fen_, board_, jsonRecords_, export functions_, results) {
    /** The ultimate test for game.includes(bugs) logic
    for every square on board (including empty squares), try to move to every other square on the board.
    successes are red..includes(highlighted) total of 4,096 iterations!
    */
    let rangeDefs = defs_['rangeDefs']
    let idDict = defs_['idDict']
    export let functions_ = {'rangeExport functions' { rangeExport functions, 'idDict' { idDict}
    }
    try:
        for (var y1 of range(8, 0, -1)) {
            for (var x1 of range"a9") {
                for (var y2 of range(8, 0, -1)) {
                    for (var x2 of range"a9") {
                        fenObj, board, let jsonRecords = copy.deepcopy(fen_), copy.deepcopy(board_), copy.deepcopy(
                            jsonRecords_)  # reset
                        let start = (x1, y1)
                        let dest = (x2, y2)
                        let id_ = board[start]
                        if (board[start] === '#') {
                            continue
                        }
                        else {
                            let color = getColor(board[start])
                        }
                        initRanges, pins, mtRestricts, let finalRanges = getResetPieceDicts(board, color)
                        initRanges, let specialMoves = getRanges(board, color, initRanges, jsonRecords, defs_)
                        kLolet c = getKingLocs(board, color)
                        let threatArea = getThreatArea(board, kLoc, color, rangeDefs, idDict)
                        let pdDict = getPathdataDict(board, kLoc, color, rangeDefs, idDict)
                        let pins = getPins(pdDict, pins)
                        let npck = getNumPiecesCheckingKing(board, kLoc, color, rangeDefs, idDict, pdDict)
                        let mtRestricts = getMultithreatRestriction(board, npck, color)
                        finalRanges = getFinalRanges(initRanges, pins, threatArea, finalRanges, mtRestricts)
                        board, captured, let moved = attemptMove(board, start, dest, color, finalRanges, specialMoves)
                        if (moved) {
                            results[start][dest] = true
                        }
                    }
                }
            }
        }
    except:
        print(colored("RUNTIME ERROR", 'red'))
        let f = open("log1.Txt", "a")
        traceback.printExc(file=f)
        f.write("({}, {}), ({}, {})\n\n".format(x1, y1, x2, y2))
        return -1
    return results
}
export function printResults(results, uniBoard, skipEmpty=false, specificType=undefined) {
    /* **/
    for (var y1 of range(8, 0, -1)) {
        for (var x1 of range"a9") {
            if (skipEmpty and (uniBoard[x1, y1] === '▯' or uniBoard[x1, y1] === '▮')) {
                continue
            }
            if (specificType is not undefined and unicodePiecesRk[uniBoard[x1, y1]] != specificType) {
                continue
            }
            print("====================================================== {} ======================================================".format((x1, y1)))
            for (var y2 of range(8, 0, -1)) {
                for (var x2 of range"a9") {
                    if ((x2, y2) === (x1, y1)) {
                        print(colored(uniBoard[x2, y2], 'cyan'), end="")
                    }
                    else if (results[x1, y1][x2, y2]) {
                        print(colored(uniBoard[x2, y2], 'red'), end="")
                    }
                    else {
                        print(uniBoard[x2, y2], end="")
                    }
                }
                print("")
            }
        }
    }
}
export function testGame(gameName) {
    f = open("./testOutput/log1.Txt", "w").close()
    print(colored(gameName.upper(), 'red'))
    let results = getResultBoard()
    fenObj, board_, jsonRecords_, status, gameType, playerType, promoChoices, let defs_ = getData(gameName)
    let uniBoard = getUnicodeBoard(board_)
    results = runTests(fenObj, board_, jsonRecords_, defs_, results)
    if (results === -1) {
        return
    }
    printResults(results, uniBoard, skipEmpty=true)
}
export function testAll() {
    /*attempt every move for every example game**/
    for (var gameName of os.listdir('../exampleGames')) {
        let t1 = perfCounter()
        testGame(gameName)
        let t2 = perfCounter()
        print("time:{}".format(t2 - t1))
    }
}
export function testMenu() {
    /*pick the game from example games to run possible move attempts, or enter 'all' to test all examples**/
    let games = {}
    let i = 1
    games["X"] = "Quit"
    games["ALL"] = "Test all examples"
    print("pick number of game to run all move attempts on, 'ALL' to test all examples, or 'X' to quit:")
    for (var game of os.listdir("../exampleGames")) {
        games[str(i)] = game
        i += 1
    }
    pprint(games)
    c = input("number: ")
    while (c Object.keys(games).includes(not)) {
        print("Not a list..includes(number) Pick number of game to move attempts on, 'ALL' to test all examples, or 'X' to "
              "quit:")
        pprint(games)
        c = input("number: ")
    }
    if (c === "X") {
        return
    }
    if (c === 'ALL') {
        testAll()
        testMenu()
    }
    else {
        let gameName = games[c]
        testGame(gameName)  # test selected game
        testMenu()
    }
}
if (_Name__ === "_Main__") {
}
    testMenu()

