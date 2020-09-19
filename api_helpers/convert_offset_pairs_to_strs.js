import "json";
import { pprint } from "pprint";
import { initEmptyRanges } from "apiHelpers/initEmptyRanges";
export function convertOffsetPairsToStrs(offsets) {
    /*convert offsets from form [x,y] to form 'x,y' **/
    let newOffsets = []
    for (var offset of offsets) {
        newOffsets.append("{},{}".format(offset[0], offset[1]))
    }
    return newOffsets
}
if (_Name__ === "_Main__") {
    let evilMorty = {
        "B": {
            "img": "evilMortyRed.svg",
            "offsets": [
                [2, -1],
                [1, -2],
                [-1, -2],
                [-2, -1],
                [-2, 1],
                [-1, 2],
                [1, 2],
                [2, 1]
            ],
            "spans": [
                "step_1sqr270d",
                "step_1sqr225d",
                "step_1sqr180d",
                "step_1sqr135d",
                "step_1sqr90d",
                "step_1sqr45d",
                "step_1sqr0d",
                "step_1sqr315d"
            ]
        },
        "W": {
            "img": "evilMortyWhite.svg",
            "offsets": [
                [-2, 1],
                [-1, 2],
                [1, 2],
                [2, 1],
                [2, -1],
                [1, -2],
                [-1, -2],
                [-2, -1]
            ],
            "spans": [
                "step_1sqr90d",
                "step_1sqr45d",
                "step_1sqr0d",
                "step_1sqr315d",
                "step_1sqr270d",
                "step_1sqr225d",
                "step_1sqr180d",
                "step_1sqr135d"
            ]
        }
    }
    pprint(convertOffsetPairsToStrs(evilMorty['W']['offsets']))
}
    pprint(convertOffsetPairsToStrs(evilMorty['B']['offsets']))

