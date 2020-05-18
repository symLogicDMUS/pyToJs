import re


def line_to_tuple(i, line):
    """ """
    return [i, len(re.match(r'^\s*', line).group()), line]
