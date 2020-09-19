import re
from pprint import pprint
from to_rankfile import to_rankfile


def str_xy_to_rf(code_str):
    """ """
    coords = re.findall("(\[\d, \d\])", code_str)
    rankfiles = list(map(lambda m: to_rankfile(m), coords))
    if len(rankfiles) != len(coords):
        print("ERROR in xy_to_rf.py")
    for i in range(len(coords)):
        code_str = code_str.replace(coords[i], '"{}"'.format(rankfiles[i]))
    return code_str


if __name__ == "__main__":
    code_str = \
        """
        [[7, 3], [4, 7], [1, 3], [4, 8], [5, 6], [2, 8], [6, 6], [7, 7], 
        [2, 1], [6, 2], [1, 6], [3, 7], [2, 5], [5, 1], [8, 5], [5, 8], 
        [7, 2], [1, 2], [6, 7], [3, 3], [5, 5], [8, 1], [7, 6], [4, 4], 
        [6, 3], [1, 5], [3, 6], [2, 2], [8, 6], [4, 1], [1, 1], [6, 4], 
        [3, 2], [2, 6], [5, 4], [8, 2], [7, 1], [4, 5], [5, 2], [1, 4], 
        [7, 5], [2, 3], [8, 7], [4, 2], [6, 5], [3, 5], [2, 7], [5, 3], 
        [7, 8], [8, 3], [4, 6], [6, 8], [6, 1], [3, 1], [5, 7], [3, 8], 
        [7, 4], [1, 8], [8, 8], [4, 3], [1, 7], [3, 4], [2, 4], [8, 4]]
        """
    pprint(str_xy_to_rf(code_str))
