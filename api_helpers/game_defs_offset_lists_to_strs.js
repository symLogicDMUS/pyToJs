import "json";
import { pprint } from "pprint";
import { convertOffsetPairsToStrs } from "apiHelpers/convertOffsetPairsToStrs";
export function gameExport functionsOffsetListsToStrs(pieceExport functions) {
    /**
     {param pieceExport functions { piece export functioninitions for a game
     {return { pieceExport functions with offsets converted from form [x,y] to form 'x,y'
    */
    for (var name of Object.keys(pieceDefs)) {
        for (var color of ['W', 'B']) {
            pieceDefs[name][color]['offsets'] = convert(pieceDefs[name][color]['offsets'])
        }
    }
    return pieceDefs
}
if (_Name__ === "_Main__") {
    let f = open("../gameLogic/testObjects/pieces/evilMorty.json", "r")
    let data = f.read()
    let evilMorty = json.loads(data)
    json.dumps(evilMorty)
    f.close()
    f = open("../gameLogic/testObjects/pieces/octocat.json", "r")
    data = f.read()
    let octocat = json.loads(data)
    json.dumps(octocat)
    f.close()
}
    pprint(gameExport functionsOffsetListsToStrs({"EvilMorty" { evilMorty, "Octocat" { octocat}))

