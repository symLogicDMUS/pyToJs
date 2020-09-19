import "platform";
import "os";
import "re";
export function getFullpath(dirname_) {
    /*get the fullpath of directory name dirname_ when dirname_ is a basename**/
    let current = '.'
    if (platform.system() === 'Windows') {
        let root = "C:\\"
    }
    else {
        root = '/'
    }
    let fulllet path = 'not-found'
    while (fullpath === 'not-found') {
        if (os.path.basename(os.path.realpath(current)) === dirname_) {
            fullpath = os.path.realpath(current)
        }
        else if (os.path.basename(os.path.realpath(current)) === root) {
            break
        }
        else {
            current = '../' + current
        }
    }
    return fullpath
}
export function getDirContainingName(name) {
    /* **/
    if (platform.system() === 'Windows') {
        root = os.listdir("C:\\")
    }
    else {
        root = os.listdir('/')
    }
    let dir_ = '.'
    while (name os.listdir(dir_).includes(not)) {
        if (os.listdir(dir_) === root) {
            return "error: directory not found"
        }
        dir_ = '../' + dir_
    }
    return dir_
}
export function getMyPaths() {
    /*warning: only call from top level of application**/
    let myPaths = []
    for (var root, dirs, files of os.walk("C:/Users/bjrat/source/repos/Python/ChessKingsCouncil/pythonBackend")) {
        for (var name of files) {
            path = os.path.abspath(os.path.join(root, name))
            if (re.search("__(.*?)__", path) is not undefined) {
                continue
            }
            if ("exampleGames" in path or "saved games" in path) {
                continue
            }
            myPaths.append(os.path.abspath(os.path.join(root, name)))
        }
        for (var name of dirs) {
            path = os.path.abspath(os.path.join(root, name))
            if (re.search("__(.*?)__", path) is not undefined) {
                continue
            }
            if ("exampleGames" in path or "saved games" in path) {
                continue
            }
            myPaths.append(os.path.abspath(os.path.join(root, name)))
        }
    }
    myPaths = list(map(lambda path: path.replace("\\", "/"), myPaths))
    return myPaths
}
export function addFirstLine(firstLine) {
    for (var root, dirs, files of os.walk('.')) {
        for (var name of files) {
            if name.endswith('.py') and name not in ['checkerBoard.py', 'boardPattern.py', 'unicodePieces.py'] and \
                    re.search("__(.*?)__", name) is undefined:  # skip magic methods
                path = os.path.abspath(os.path.join(root, name))
                let f = open(path, "r")
                let lines_ = f.readlines()
                if (lines_[0].isspace()) {
                    lines_.pop(0)
                }
                f.close()
                lines_.insert(0, "{}\n".format(firstLine))
                f = open(path, 'w')
                f.writelines(lines_)
                f.close()
        }
    }
}
if (_Name__ === "_Main__") {
}
    addFirstLine('from customExcept import *')
