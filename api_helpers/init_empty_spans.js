import { pprint } from "pprint";
import { getJson } from "gameLogic/testObjects/getJson";
export function initEmptySpans(export functions) {
    /* **/
    for (var pieceName of Object.keys(defs)) {
        for (var color of ['W', 'B']) {
            if ('spans' defs.includes(not)[pieceName][color].keys()) {
                defs[pieceName][color]['spans'] = []
            }
        }
    }
    return defs
}
if (_Name__ === "_Main__") {
    pprint(initEmptySpans(
}
        getJson("/home/brian/ChessKingsCouncil/pythonBackend/gameLogic/testObjects/defs/defs1.json")))

