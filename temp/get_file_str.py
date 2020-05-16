from more_itertools import collapse


def get_file_str(blocks):
    """ """
    blocks = collapse(blocks)
    blocks = list(filter(lambda e: type(e) != int, blocks))
    return "".join(blocks)
