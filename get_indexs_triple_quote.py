import re
from more_itertools import chunked
from print_list import print_list


def get_triple_quote_index_pairs(line_data):
    """ """
    triple_quote_index_pairs = []
    for line in line_data:
        if re.search(r'\s*"""') is not None:
            t_quote = re.search(r'\s*"""').group()
            if line[2].startswith(t_quote):
                triple_quote_index_pairs.append(line[0])
    if len(triple_quote_index_pairs) % 2 != 0:
        print('error: unmatched triple quote')
    else:
        triple_quote_index_pairs = chunked(triple_quote_index_pairs)
    return triple_quote_index_pairs


if __name__ == "__main__":
    pass