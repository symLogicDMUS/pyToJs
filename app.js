# import os
import "json";
import "firebaseAdmin";
import { pprint } from "pprint";
import { credentials } from "firebaseAdmin";
import { Flask } from "flask";
import { getNextColor } from "gameLogic/color/getNextColor";
import { JsonRecords } from "gameLogic/JsonRecords/JsonRecords";
import { getFen } from "gameLogic/fenParser/getFen/top/getFen";
import { mapRfToXy } from "gameLogic/coordType/xy/mapRfToXy";
import { getAiColor } from "gameLogic/color/getAiColor";
import { getFullFen } from "gameLogic/fenParser/getFullFen";
import { offsetStrsToList } from "apiHelpers/offsetStrsToList";
import { gameDefsOffsetListsToStrs } from "apiHelpers/gameDefsOffsetListsToStrs";
import { ddOffsetStrsToList } from "apiHelpers/ddOffsetStrsToList";
import { initEmptyRanges } from "apiHelpers/initEmptyRanges";
import { initDdEmptyLists } from "apiHelpers/initDdEmptyLists";
import { idAssign } from "apiHelpers/idAssign_/top/idAssign";
import { getTurnData } from "apiHelpers/getTurnData";
import { parseData } from "apiHelpers/parseData";
let app = Flask(_Name__)
let cred = credentials.Certificate('./ckc-firebase-admin-sdk.json')
firebaseAdmin.initializeApp(cred, {
    'databaseURL': "https://chess-king-council.firebaseio.com/",
})
@app.route('/update', methods=['POST', 'GET'])
export function update() {
    /*update the ranges of pieces and the state of the game and return to React **/
    print("POST request, update()""")
    let data = request.getData(asText=true)
    data = json.loads(data)
    board, let records = mapRfToXy(data['board']), mapRfToXy(data['records'])
    color, aiColor, pieceDefs, let idDict = data['color'], getAiColor(data['pt']), data['pieceDefs'], data['idDict']
    let jsonRecords = JsonRecords(records)  # pawn hist ids prev initialized
    let turnData = getTurnData(board, color, aiColor, jsonRecords, pieceDefs, idDict)
    let enemyTurnData = getTurnData(board, getEnemyColor(color), aiColor, jsonRecords, pieceDefs, idDict)
    turnData.update({'enemyRanges': enemyTurnData['ranges']})
    return jsonify(turnData)
}
@app.route('/updateCouncil', methods=['POST', 'GET'])
export function updateCouncil() {
    /* **/
    pass  # TODO: implement same as update except updated for game with multiple kings
}
@app.route('/assignIds', methods=['POST', 'GET'])
export function assignIds() {
    /**called by NewGame component on the front end. create id:piece-name arrangement unique to new game. substitute
    custom-piece(s) for of Rook, Bishop, Knight, or Queen, by assigning its usual id to the custom-piece name and
    custom-piece range-def. add custom pieces selected to be a pawn promotion choice.
    */
    data = request.getData()
    data = json.loads(data)
    pieceNames, let subs = data['names'], data['subs']
    let pieceNames = idAssign(pieceNames, subs)
    return jsonify(pieceNames)
}
@app.route('/getDataDict', methods=['POST', 'GET'])
export function getDataDict() {
    /*get all the saved game data at the start of the game**/
    print('GET request, getting data of all the games')
    data = request.getData(asText=true)
    data = json.loads(data)
    let dataDict = db.reference().child('games').child('{}'.format(data['user'])).get()
    dataDict = initDdEmptyLists(dataDict)
    dataDict = ddOffsetStrsToList(dataDict)
    for (var gameName of Object.keys(dataDict)) {
        dataDict[gameName] = parseData(dataDict[gameName])
    }
}
@app.route('/getDefs', methods=['POST', 'GET'])
export function getExport functions() {
    /*get the JSON object inside defs.json**/
    print('GET request, getting data from defs.json')
    data = request.getData(asText=true)
    data = json.loads(data)
    let defs = db.reference().child('defs').child('{}'.format(data['user'])).get()
    defs = initEmptyRanges(defs)
    defs = offsetStrsToList(defs)
    return jsonify(defs)
}
@app.route('/saveDef', methods=['POST', 'GET'])
export function saveExport function() {
    /*save a piece definition to defs.json**/
    print("saving piece definition to defs.json")
    data = request.getData(asText=true)
    data = json.loads(data)
    db.reference().child('defs').child('{}'.format(data['user'])).update(
        offsetsToStrs({data['pieceName'] { data['pieceExport function']})
    )
    return "SUCCESSFULLY SAVED PIECE!", 201
}
@app.route('/deleteDef', methods=['POST', 'GET'])
export function deleteExport function() {
    /*deleting a piece definition from defs.json**/
    print('deleting a piece definition from defs.json')
    data = request.getData(asText=true)
    data = json.loads(data)
    db.reference().child('defs').child('{}'.format(data['user'])).child(data['pieceName']).delete()
    return "SUCCESSFULLY DELETED PIECE", 200
}
@app.route('/save', methods=["POST", "GET"])
export function save() {
    /**save information about game as a db collection with documents being the different types of information
    gameName: name of the game being saved.
    board: data describing game board.
    jsonRecords: data for special moves and other things (the dict, not the object)
    idDict: key is id for piece, name is name of piece.
    rangeExport functions { describes how each piece can move
    success or failure integer and message to backend.
    */
    print("POST request, save()""")
    data = request.getData(asText=true)
    data = json.loads(data)
    pprint(data)
    let fen = getFen(mapRfToXy(data['board']))
    fen = getFullFen(fen, data['fenObj'])
    db.reference().child('games').child('{}'.format(data['user'])).update({data['gameName']: {
        'fen': fen,
        'type': data['gameType'],
        'pt': data['playerType'],
        'status': data['status'],
        'promos': data['promos'],
        'json': data['jsonRecords'],
        'export functions' { offsetsToStrs(data['pieceExport functions']),
        'ids': data['idDict']
    }})
    return "SUCCESSFULLY SAVED GAME!", 200
}
@app.route('/getGameNames', methods=["POST", "GET"])  # route should really be /getGameNames
export function getGameNames() {
    # /* **/
    data = request.getData(asText=true)
    data = json.loads(data)
    let gameNames = db.reference().child('game names').child('{}'.format(data['user'])).get()
    return jsonify(gameNames)
}
@app.route('/getGame', methods=["POST", "GET"])
export function getGame() {
    /* **/
    data = request.getData(asText=true)
    data = json.loads(data)
    user, let gameName = data['user'], data['gameName']
    let gameData = db.reference().child('games').child('{}'.format(user)).child('{}'.format(gameName)).get()
    gameData['defs'] = initEmptyRanges(gameData['defs'])
    gameData['defs'] = offsetStrsToList(gameData['defs'])
    gameData = parseData(gameData)
    return jsonify(gameData)
    let games = {
        "kingRangeTest": {
            "fen": "4k3/6pp/8/8/3Pp3/2bK4/4B3/8 w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {
                    "d2": [
                        "d2",
                        "d4"
                    ],
                    "e7": [
                        "e7",
                        "e5",
                        "e4"
                    ],
                    "g7": [
                        "g7"
                    ],
                    "h7": [
                        "h7"
                    ]
                },
                "lastPawnMove": "undefined",
                "numConsecutiveNonPawnMoves": 0
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "check",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "rangesTest": {
            "fen": "8/8/3k4/rnbq1bnr/8/RNBQ1BNR/8/1RBRK3 w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {},
                "lastPawnMove": "f7",
                "numConsecutiveNonPawnMoves": 15
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "castleTest5": {
            "fen": "r3kbnr/p2ppppp/bqn5/1pp5/1PP5/B1N5/P1QPPPPP/R3KBNR b KQkq - 7 6",
            "json": {
                "rooksMoved": {
                    "a1": false,
                    "a8": false,
                    "h1": false,
                    "h8": false
                },
                "kingsMoved": {
                    "e1": false,
                    "e8": false
                },
                "pawnHistories": {
                    "BP1": [
                        "a7"
                    ],
                    "BP2": [
                        "b7",
                        "b5"
                    ],
                    "BP3": [
                        "c7",
                        "c5"
                    ],
                    "BP4": [
                        "d7"
                    ],
                    "BP5": [
                        "e7"
                    ],
                    "BP6": [
                        "f7"
                    ],
                    "BP7": [
                        "g7"
                    ],
                    "BP8": [
                        "h7"
                    ],
                    "WP1": [
                        "a2"
                    ],
                    "WP2": [
                        "b2",
                        "b4"
                    ],
                    "WP3": [
                        "c2",
                        "c4"
                    ],
                    "WP4": [
                        "d2"
                    ],
                    "WP5": [
                        "e2"
                    ],
                    "WP6": [
                        "f2"
                    ],
                    "WP7": [
                        "g2"
                    ],
                    "WP8": [
                        "h2"
                    ]
                },
                "lastPawnMove": "undefined",
                "numConsecutiveNonPawnMoves": 0
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "pinnedEx2": {
            "fen": "q2r2b1/kN1B1Q2/8/qP1K1R1r/8/1P1B1N2/b7/3r3b w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {
                    "b2": [
                        "b2",
                        "b3"
                    ],
                    "c2": [
                        "c2",
                        "c4",
                        "b5"
                    ]
                },
                "lastPawnMove": "b5",
                "numConsecutiveNonPawnMoves": 6
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "enpassantTest1": {
            "fen": "rnbqkb1r/p1pppppp/5n2/1pP5/8/8/PP1PPPPP/RNBQKBNR w KQkq b6 0 3",
            "json": {
                "rooksMoved": {
                    "h1": false,
                    "a1": false,
                    "h8": false,
                    "a8": false
                },
                "kingsMoved": {
                    "e1": false,
                    "e8": false
                },
                "pawnHistories": {
                    "a2": [
                        "a2"
                    ],
                    "b2": [
                        "b2"
                    ],
                    "c2": [
                        "c2",
                        "c4",
                        "c5"
                    ],
                    "d2": [
                        "d2"
                    ],
                    "e2": [
                        "e2"
                    ],
                    "f2": [
                        "f2"
                    ],
                    "g2": [
                        "g2"
                    ],
                    "h2": [
                        "h2"
                    ],
                    "a7": [
                        "a7"
                    ],
                    "b7": [
                        "b7",
                        "b5"
                    ],
                    "c7": [
                        "c7"
                    ],
                    "d7": [
                        "d7"
                    ],
                    "e7": [
                        "e7"
                    ],
                    "f7": [
                        "f7"
                    ],
                    "g7": [
                        "g7"
                    ],
                    "h7": [
                        "h7"
                    ]
                },
                "lastPawnMove": "b5",
                "numConsecutiveNonPawnMoves": 0
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "pawnPromo": {
            "fen": "r1bqkbnr/1P1p2p1/2n5/4pp1p/P3P1P1/N3B3/2p2P1P/R2QKBNR b KQkq - 1 11",
            "json": {
                "rooksMoved": {
                    "h1": false,
                    "a1": false,
                    "h8": false,
                    "a8": false
                },
                "kingsMoved": {
                    "e1": false,
                    "e8": false
                },
                "pawnHistories": {
                    "a2": [
                        "a2",
                        "a4"
                    ],
                    "c2": [
                        "c2",
                        "c3",
                        "c4",
                        "c5",
                        "c6",
                        "b7"
                    ],
                    "e2": [
                        "e2",
                        "e4"
                    ],
                    "f2": [
                        "f2"
                    ],
                    "g2": [
                        "g2",
                        "g4"
                    ],
                    "h2": [
                        "h2"
                    ],
                    "b7": [
                        "b7",
                        "b5",
                        "b4",
                        "b3",
                        "c2"
                    ],
                    "d7": [
                        "d7"
                    ],
                    "e7": [
                        "e7",
                        "e5"
                    ],
                    "f7": [
                        "f7",
                        "f5"
                    ],
                    "g7": [
                        "g7"
                    ],
                    "h7": [
                        "h7",
                        "h5"
                    ]
                },
                "lastPawnMove": "c2",
                "numConsecutiveNonPawnMoves": 0
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "fundementalExport functionense" { {
            "fen": "r4rk1/1pp1qppp/2nbbn2/pP1pp3/3PP3/2NBBN2/P1P1QPPP/R3K2R w KQ a6 0 10",
            "json": {
                "rooksMoved": {
                    "h1": false,
                    "a1": false,
                    "h8": true,
                    "a8": false
                },
                "kingsMoved": {
                    "e1": false,
                    "e8": true
                },
                "pawnHistories": {
                    "a2": [
                        "a2"
                    ],
                    "b2": [
                        "b2",
                        "b4",
                        "b5"
                    ],
                    "c2": [
                        "c2"
                    ],
                    "d2": [
                        "d2",
                        "d4"
                    ],
                    "e2": [
                        "e2",
                        "e4"
                    ],
                    "f2": [
                        "f2"
                    ],
                    "g2": [
                        "g2"
                    ],
                    "h2": [
                        "h2"
                    ],
                    "a7": [
                        "a7",
                        "a5"
                    ],
                    "b7": [
                        "b7"
                    ],
                    "c7": [
                        "c7"
                    ],
                    "d7": [
                        "d7",
                        "d5"
                    ],
                    "e7": [
                        "e7",
                        "e5"
                    ],
                    "f7": [
                        "f7"
                    ],
                    "g7": [
                        "g7"
                    ],
                    "h7": [
                        "h7"
                    ]
                },
                "lastPawnMove": "a5",
                "numConsecutiveNonPawnMoves": 0
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "stalemateExp1": {
            "fen": "3r1k2/8/8/8/b7/2n3nb/r7/4K3 w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {},
                "lastPawnMove": "h5",
                "numConsecutiveNonPawnMoves": 30
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 0,
                "condition": "stalemate",
                "winner": "X"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "checkExample1": {
            "fen": "1n5r/8/6N1/3pK3/2k1P3/7q/1nb5/3r1B1R b - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {
                    "e2": [
                        "e2",
                        "e4"
                    ],
                    "d7": [
                        "d7",
                        "d5"
                    ]
                },
                "lastPawnMove": "d5",
                "numConsecutiveNonPawnMoves": 15
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "check",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "superCheckmateImpossibleExample": {
            "fen": "5rk1/3np1p1/r4K2/8/7b/8/8/q4r2 w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {
                    "e7": [
                        "e7"
                    ],
                    "g7": [
                        "g7"
                    ]
                },
                "lastPawnMove": "g2",
                "numConsecutiveNonPawnMoves": 20
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 0,
                "condition": "checkmate",
                "winner": "B"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        },
        "pinnedEx1": {
            "fen": "8/rNQK1B1q/2R5/1N1R1N2/b2n4/7b/8/1k1r4 w - - 0 1",
            "json": {
                "rooksMoved": {
                    "h1": true,
                    "a1": true,
                    "h8": true,
                    "a8": true
                },
                "kingsMoved": {
                    "e1": true,
                    "e8": true
                },
                "pawnHistories": {},
                "lastPawnMove": "c2",
                "numConsecutiveNonPawnMoves": 20
            },
            "type": "standard",
            "pt": "W",
            "status": {
                "status": 1,
                "condition": "",
                "winner": "-"
            },
            "ids": {
                "k": "King",
                "q": "Queen",
                "r": "Rook",
                "b": "Bishop",
                "n": "Knight",
                "p": "Pawn"
            },
            "export functions" { {
                "Bishop": {
                    "B": {
                        "img": "BB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr225d",
                            "step_1sqr315d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WB.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr45d",
                            "step_1sqr135d",
                            "step_1sqr225d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Knight": {
                    "B": {
                        "img": "BN.svg",
                        "offsets": [
                            [
                                -1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                1,
                                2
                            ],
                            [
                                -2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                2,
                                1
                            ]
                        ],
                        "spans": []
                    },
                    "W": {
                        "img": "WN.svg",
                        "offsets": [
                            [
                                1,
                                2
                            ],
                            [
                                1,
                                -2
                            ],
                            [
                                -1,
                                2
                            ],
                            [
                                -1,
                                -2
                            ],
                            [
                                2,
                                1
                            ],
                            [
                                2,
                                -1
                            ],
                            [
                                -2,
                                1
                            ],
                            [
                                -2,
                                -1
                            ]
                        ],
                        "spans": []
                    }
                },
                "Queen": {
                    "B": {
                        "img": "BQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d",
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr45d",
                            "step_1sqr135d"
                        ]
                    },
                    "W": {
                        "img": "WQ.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr45d",
                            "step_1sqr90d",
                            "step_1sqr135d",
                            "step_1sqr180d",
                            "step_1sqr225d",
                            "step_1sqr270d",
                            "step_1sqr315d"
                        ]
                    }
                },
                "Rook": {
                    "B": {
                        "img": "BR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr180d",
                            "step_1sqr270d",
                            "step_1sqr0d",
                            "step_1sqr90d"
                        ]
                    },
                    "W": {
                        "img": "WR.svg",
                        "offsets": [],
                        "spans": [
                            "step_1sqr0d",
                            "step_1sqr90d",
                            "step_1sqr180d",
                            "step_1sqr270d"
                        ]
                    }
                }
            },
            "promos": [
                "Queen",
                "Rook",
                "Bishop",
                "Knight"
            ]
        }
    }
    return jsonify(games[gameName])
}
if (_Name__ === '_Main__') {
}
    app.run(debug=true, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
