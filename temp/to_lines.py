from more_itertools import flatten


def to_lines(line_data):
    """ """
    lines = flatten(line_data)
    return list(filter(lambda line: type(line) == str, lines))
