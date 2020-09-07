import re
from is_rankfile import is_rankfile
from rankmap import rankmap


def to_rankfile(sqr):
    """take '(x,y)' and convert to rankfile"""
    xy = re.findall('\d', sqr)
    x, file = int(xy[0]), xy[1]
    rank = rankmap[x]
    return rank + file


if __name__ == "__main__":
    print(to_rankfile('(1, 2'))