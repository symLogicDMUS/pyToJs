import "os";
import "platform";
export function getFullpath(dirname_) {
    /*get the fullpath of directory name dirname_ when dirname_ is a basename**/
    let current = '.'
    if (platform.system() === 'Windows') {
        let root = "C:\\"
    }
    else {
        root = '/'
    }
    let fullpath = 'not-found'
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
if (_Name__ === "_Main__") {
}
    print(getFullpath('pythonBackend'))
