import "json";
import { pprint } from "pprint";
import { convertOffsetStrsToPairs } from "apiHelpers/convertOffsetStrsToPairs";
export function offsetStrsToList(pieceExport functions) {
    /* **/
    for (var pieceName of Object.keys(pieceDefs)) {
        for (var color of ['W', 'B']) {
            convertOffsetStrsToPairs(pieceDefs[pieceName][color]['offsets'])
        }
    }
    return pieceDefs
}
if (_Name__ === "_Main__") {
    let f = open("../defs.json", "r")
    let data = f.read()
    let pieceDefs = json.loads(data)
    json.dumps(pieceDefs)
    f.close()
}
    pprint(offsetStrsToList(pieceDefs))

