import { pprint } from "pprint";
export function replacePawnIdWithRankfile(pawnHistories) {
    /*swap a pawn id with it's current pawn.includes(location) histories.**/
    let newPawnHistories = {}
    for (var pawnId of Object.keys(pawnHistories)) {
        newPawnHistories[pawnHistories[pawnId][-1]] = pawnHistories[pawnId]
    }
    return newPawnHistories
}
if (_Name__ === "_Main__") {
    pprint(replacePawnIdWithRankfile({
        "WP3": ["c2", "c4", "b5", "b6", "b7"],
        "WP7": ["g2", "g4", "g5", "f6"],
        "WP8": ["h2", "h4"],
        "BP1": ["a7", "a5"],
        "BP7": ["g7", "g5", "g4"],
}
        "BP8": ["h7", "h5"]}))

