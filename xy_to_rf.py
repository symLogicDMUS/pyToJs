import os
import re
from pprint import pprint
from to_rankfile import to_rankfile


def xy_to_rf(file_path):
    """ """
    f = open(file_path, 'r')
    file_str = f.read()
    f.close()
    coords = re.findall("(\(\d, \d\)):", file_str)
    rankfiles = list(map(lambda m: to_rankfile(m), coords))
    if len(rankfiles) != len(coords):
        print("ERROR in xy_to_rf.py")
    for i in range(len(coords)):
        file_str = file_str.replace(coords[i], '"{}"'.format(rankfiles[i]))
    f = open(file_path, 'w')
    f.write(file_str)
    f.close()


if __name__ == "__main__":
    for root, dirs, files in os.walk("./ckc-game-logic"):
        for file in files:
            if file.endswith('.js'):
                path = os.path.join(root, file)
                path = os.path.realpath(path)
                xy_to_rf(path)