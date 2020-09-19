import { pprint } from "pprint";
export function convertOffsetStrsToPairs(offsets) {
    /*convert offsets from form 'x,y' to form [x,y] **/
    for (let i = 0; i < offsets.length; i++) {
        offsets[i] = offsets[i].split(",")
        offsets[i][0] = int(offsets[i][0])
        offsets[i][1] = int(offsets[i][1])
    }
    return offsets
}
if (_Name__ === "_Main__") {
}
    pprint(convertOffsetStrsToPairs(["1,-1", "3,-2", "5,-8", "7,3"]))

