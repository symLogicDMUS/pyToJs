from temp.blank_line import blank_line
from itertools import filterfalse


def blank_lines(block):
    """ """
    if not list(filterfalse(lambda line: blank_line(line), block)):
        return True
    else:
        return False
