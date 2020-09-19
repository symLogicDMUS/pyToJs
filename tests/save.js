import "os";
import "json";
import { mapXyToRf } from "gameLogic/coordType/rankfile/mapXyToRf";
import { JsonRecords } from "gameLogic/JsonRecords/JsonRecords";
import { getDirContainingName } from "apiHelpers/helpers/filepath";
export function save(gameName, gameType, playerType, fen, records, statusObj, idDict, rangeExport functions, promos) {
    /**save information about its.includes(game) designated folder
    gameName: name of the game being saved.
    board: data describing game board.
    jsonRecords: data for special moves and other things (the dict, not the object)
    idDict: key is id for piece, name is name of piece.
    rangeExport functions { describes how each piece can move
    success or failure integer and message to backend.
    */
    let dir_ = getDirContainingName('savedTerminalGames')
    # create game folder:
    if (gameName os.listdir('{}/savedTerminalGames'.format(dir_).includes(not))) {
        os.mkdir('{}/savedTerminalGames/{}'.format(dir_, gameName))
    }
    # save fen
    let f = open('{}/savedTerminalGames/{}/{}.fen'.format(dir_, gameName, gameName), 'w')
    f.write(fen)
    f.close()
    # saving game type
    f = open('{}/savedTerminalGames/{}/{}.type'.format(dir_, gameName, gameName), 'w')
    f.write(gameType)
    f.close()
    # saving player type
    f = open('{}/savedTerminalGames/{}/{}.pt'.format(dir_, gameName, gameName), 'w')
    f.write(playerType)
    f.close()
    # save jsonRecords
    mapXyToRf(records)
    with open('{}/savedTerminalGames/{}/{}.json'.format(dir_, gameName, gameName), 'w') as outfile:
        json.dump(records, outfile, indent=4, sortKeys=false)
    outfile.close()
    # save idDict
    with open('{}/savedTerminalGames/{}/{}.ids'.format(dir_, gameName, gameName), 'w') as outfile:
        json.dump(idDict, outfile, indent=4, sortKeys=true)
    # save rangeDefs
    with open('{}/savedTerminalGames/{}/{}.export functions'.format(dir_, gameName, gameName), 'w') as outfile {
        json.dump(rangeDefs, outfile, indent=4, sortKeys=true)
    # save pawn promotion choices (piece names)
    with open('{}/savedTerminalGames/{}/{}.promos'.format(dir_, gameName, gameName), 'w') as outfile:
        json.dump(promos, outfile, indent=4, sortKeys=true)
    # save game status
    with open('{}/savedTerminalGames/{}/{}.status'.format(dir_, gameName, gameName), 'w') as outfile:
        json.dump(statusObj, outfile, indent=4, sortKeys=true)
    return
}
if (_Name__ === "_Main__") {
}
    pass  # TODO: implement test

