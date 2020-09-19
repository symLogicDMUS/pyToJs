import "json";
import "os";
export function addFileType(folder, extention) {
    /* **/
    for (var gameName of os.listdir("../../{}".format(folder))) {
        let f = open('../../{}/{}/{}.{}'.format(folder, gameName, gameName, extention), 'w')
        f.close()
    }
}
export function addData(folder, data, extention) {
    /* **/
    for (var gameName of os.listdir("../../{}".format(folder))) {
        f = open("../../{}/{}/{}.{}".format(folder, gameName, gameName, extention), 'w')
        f.write(data)
        f.close()
    }
}
export function addDataJson(folder, data, extention) {
    /* **/
    for (var gameName of os.listdir("../../{}".format(folder))) {
        with open('../../{}/{}/{}.{}'.format(folder, gameName, gameName, extention), 'w') as outfile:
            json.dump(data, outfile, indent=4, sortKeys=false)
        outfile.close()
    }
}
if (_Name__ === "_Main__") {
    addFileType("exampleGames", "promos")
    addFileType("saved games", "promos")
    addDataJson("exampleGames", ["Queen", "Rook", "Bishop", "Knight"], "promos")
}
    addDataJson("saved games", ["Queen", "Rook", "Bishop", "Knight"], "promos")

