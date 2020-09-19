import { filterEmptyRanges } from "apiHelpers/filterEmpyRanges";
import { getMoveSimplest } from "apiHelpers/getMoveSimplest";
import "random";
export function getMove(board, ranges) {
    /* **/
    let aiRanges = filterEmptyRanges(ranges)
    let pieceId = Object.keys(random.choice(list(aiRanges)))
    start, let dest = getMoveSimplest(board, pieceId, aiRanges)
}
    return start, dest

