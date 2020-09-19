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
        {(1, 1): false, (2, 1): false, (3, 1): false, (4, 1): false, (5, 1): false, (6, 1): false, (7, 1): false,
         (8, 1): false, (1, 2): false, (2, 2): false, (3, 2): false, (4, 2): false, (5, 2): false, (6, 2): false,
         (7, 2): false, (8, 2): false, (1, 3): false, (2, 3): false, (3, 3): false, (4, 3): false, (5, 3): false,
         (6, 3): false, (7, 3): false, (8, 3): false, (1, 4): false, (2, 4): false, (3, 4): false, (4, 4): false,
         (5, 4): false, (6, 4): false, (7, 4): false, (8, 4): false, (1, 5): false, (2, 5): false, (3, 5): false,
         (4, 5): false, (5, 5): false, (6, 5): false, (7, 5): false, (8, 5): false, (1, 6): false, (2, 6): false,
         (3, 6): false, (4, 6): false, (5, 6): false, (6, 6): false, (7, 6): false, (8, 6): false, (1, 7): false,
         (2, 7): false, (3, 7): false, (4, 7): false, (5, 7): false, (6, 7): false, (7, 7): false, (8, 7): false,
         (1, 8): false, (2, 8): false, (3, 8): false, (4, 8): false, (5, 8): false, (6, 8): false, (7, 8): false,
         (8, 8): false}
}
export function getResultBoard() {
    /* **/
    return \
        {(1, 1): mrd(), (2, 1): mrd(), (3, 1): mrd(), (4, 1): mrd(), (5, 1): mrd(), (6, 1): mrd(), (7, 1): mrd(),
         (8, 1): mrd(), (1, 2): mrd(), (2, 2): mrd(), (3, 2): mrd(), (4, 2): mrd(), (5, 2): mrd(), (6, 2): mrd(),
         (7, 2): mrd(), (8, 2): mrd(), (1, 3): mrd(), (2, 3): mrd(), (3, 3): mrd(), (4, 3): mrd(), (5, 3): mrd(),
         (6, 3): mrd(), (7, 3): mrd(), (8, 3): mrd(), (1, 4): mrd(), (2, 4): mrd(), (3, 4): mrd(), (4, 4): mrd(),
         (5, 4): mrd(), (6, 4): mrd(), (7, 4): mrd(), (8, 4): mrd(), (1, 5): mrd(), (2, 5): mrd(), (3, 5): mrd(),
         (4, 5): mrd(), (5, 5): mrd(), (6, 5): mrd(), (7, 5): mrd(), (8, 5): mrd(), (1, 6): mrd(), (2, 6): mrd(),
         (3, 6): mrd(), (4, 6): mrd(), (5, 6): mrd(), (6, 6): mrd(), (7, 6): mrd(), (8, 6): mrd(), (1, 7): mrd(),
         (2, 7): mrd(), (3, 7): mrd(), (4, 7): mrd(), (5, 7): mrd(), (6, 7): mrd(), (7, 7): mrd(), (8, 7): mrd(),
         (1, 8): mrd(), (2, 8): mrd(), (3, 8): mrd(), (4, 8): mrd(), (5, 8): mrd(), (6, 8): mrd(), (7, 8): mrd(),
         (8, 8): mrd()}
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
            for (var x1 of range(1, 9)) {
                for (var y2 of range(8, 0, -1)) {
                    for (var x2 of range(1, 9)) {
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
                        let kLolet c = getKingLocs(board, color)
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
        for (var x1 of range(1, 9)) {
            if (skipEmpty and (uniBoard[x1, y1] === '▯' or uniBoard[x1, y1] === '▮')) {
                continue
            }
            if (specificType is not undefined and unicodePiecesRk[uniBoard[x1, y1]] != specificType) {
                continue
            }
            print("====================================================== {} ======================================================".format((x1, y1)))
            for (var y2 of range(8, 0, -1)) {
                for (var x2 of range(1, 9)) {
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

