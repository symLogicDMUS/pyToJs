import "json";
import { pprint } from "pprint";
import { convertOffsetStrsToPairs } from "apiHelpers/convertOffsetStrsToPairs";
export function mapExport functions(export functions) {
    /* **/
    for (var pieceName of Object.keys(defs)) {
        for (var color of ['W', 'B']) {
            defs[pieceName][color]['offsets'] = convertOffsetStrsToPairs(defs[pieceName][color]['offsets'])
        }
    }
    return defs
}
if (_Name__ === "_Main__") {
    let f = open("../defs.json", "r")
    let data = f.read()
    let defs = json.loads(data)
    json.dumps(defs, indent=4, sortKeys=true)
    defs = mapDefs(defs)
}
    pprint(defs)

