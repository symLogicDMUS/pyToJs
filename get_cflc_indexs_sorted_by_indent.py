from get_cflc import get_cflc
from sort_cflc import sort_cflc


def get_cflc_indexs_sorted_by_indent(line_data):
    """ """
    cflc = get_cflc(line_data)
    cflc = sort_cflc(cflc)
    indexs_cflc = list(map(lambda e: e[0], cflc))
    return indexs_cflc


if __name__ == "__main__":
    pass