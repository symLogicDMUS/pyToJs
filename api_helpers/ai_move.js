import "copy";
import "random";
import { getMoveSimplest } from "apiHelpers/getMoveSimplest";
import { filterEmptyRanges } from "apiHelpers/filterEmpyRanges";
import { sampleBoardDicts } from "gameLogic/testObjects/sampleBoardDicts";
import { move } from "gameLogic/movePiece/move";
import { SpecialMoves } from "gameLogic/ranges/specialMoves/SpecialMoves";
import { printBoard } from "gameLogic/printers/printBoard";
import { pprint } from "pprint";
export function aiMove(board, ranges, color, specialMoves) {
    /* **/
    let responseBoard = copy.deepcopy(board)
    let aiLet ranges = filterEmptyRanges(ranges)
    let pieceId = Object.keys(random.choice(list(aiRanges)))
    start, let dest = getMoveSimplest(responseBoard, pieceId, aiRanges)
    responseBoard, let captured = move(responseBoard, start, dest, color, specialMoves)
    if (captured === "undefined") {
        captured = false
    }
    return captured, start, dest
}
if (_Name__ === "_Main__") {
    ranges = {'BB1': [],
              'BB2': [],
              'BK1': [],
              'BN1': [(1, 6), (3, 6)],
              'BN2': [(6, 6), (8, 6)],
              'BP1': [(1, 6), (1, 5)],
              'BP2': [(2, 6), (2, 5)],
              'BP3': [(3, 6), (3, 5)],
              'BP4': [(4, 6), (4, 5)],
              'BP5': [(5, 6), (5, 5)],
              'BP6': [(6, 6), (6, 5)],
              'BP7': [(7, 6), (7, 5)],
              'BP8': [(8, 6), (8, 5)],
              'BQ1': [],
              'BR1': [],
              'BR2': []}
    captured, start, dest = aiMove(sampleBoardDicts['singleMove'], ranges, 'B', SpecialMoves())
    pprint([captured, start, dest])
}
    printBoard(sampleBoardDicts['singleMove'], highlights=[start, dest])

