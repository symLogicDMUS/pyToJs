import { pprint } from "pprint";
import { initEmptySpans } from "apiHelpers/initEmptySpans";
import { initEmptyOffsets } from "apiHelpers/initEmptyOffsets";
import { getJson } from "gameLogic/testObjects/getJson";
export function initEmptyRanges(export functions) {
    /* **/
    let defs = initEmptySpans(defs)
    defs = initEmptyOffsets(defs)
    return defs
}
if (_Name__ === "_Main__") {
    pprint(initEmptyRanges(
}
        getJson("/home/brian/ChessKingsCouncil/pythonBackend/gameLogic/testObjects/defs/defs1.json")))

