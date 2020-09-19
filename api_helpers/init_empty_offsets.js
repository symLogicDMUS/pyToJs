import { pprint } from "pprint";
import { getJson } from "gameLogic/testObjects/getJson";
export function initEmptyOffsets(export functions) {
    /* **/
    for (var pieceName of Object.keys(defs)) {
        for (var color of ['W', 'B']) {
            if ('offsets' defs.includes(not)[pieceName][color].keys()) {
                defs[pieceName][color]['offsets'] = []
            }
        }
    }
    return defs
}
if (_Name__ === "_Main__") {
    pprint(initEmptyOffsets(
}
        getJson("/home/brian/ChessKingsCouncil/pythonBackend/gameLogic/testObjects/defs/defs1.json")))

