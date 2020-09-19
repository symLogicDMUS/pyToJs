import "os";
export function alterNames(dir_, old, new) {
    /* **/
    for (var file of os.listdir(dir_)) {
        let path = dir_ + '/' + file
        let newPath = path.replace(old, new)
        os.rename(path, newPath)
    }
}
if (_Name__ === "_Main__") {
}
     pass # TODO: implement test

