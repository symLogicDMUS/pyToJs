import { pprint } from "pprint";
export function filterEmptyRanges(ranges) {
    /* **/
    let aiRanges = {}
    for (var pieceId of Object.keys(ranges)) {
        if (ranges[pieceId]) {
            aiRanges[pieceId] = ranges[pieceId]
        }
    }
    return aiRanges
}
if (_Name__ === "_Main__") {
    pprint(filterEmptyRanges({'BB1': [],
                                'BB2': [],
                                'BK1': [],
                                'BN1': [(1, 6), (3, 6)],
                                'BN2': [(6, 6), (8, 6)],
                                'BP1': [(1, 6), (1, 5)],
                                'BP2': [(2, 6), (2, 5)],
                                'BP3': [(3, 6), (3, 5)],
                                'BP4': [(4, 6), (4, 5)],
                                'BP5': [(5, 6), (5, 5)],
                                'BP6': [(6, 6), (6, 5)],
                                'BP7': [(7, 6), (7, 5)],
                                'BP8': [(8, 6), (8, 5)],
                                'BQ1': [],
                                'BR1': [],
                                'BR2': []}))
    pprint(filterEmptyRanges({'BB1': [],
                                'BB2': [],
                                'BK1': [],
                                'BN1': [],
                                'BN2': [],
                                'BP1': [],
                                'BP2': [],
                                'BP3': [],
                                'BP4': [],
                                'BP5': [],
                                'BP6': [],
                                'BP7': [],
                                'BP8': [],
                                'BQ1': [],
                                'BR1': [],
}
                                'BR2': []}))

