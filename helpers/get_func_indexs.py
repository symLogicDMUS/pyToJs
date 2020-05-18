import re
from helpers.print_list import print_list


def get_func_indexs(line_data):
    """ """
    for i in range(len(line_data)):
        if re.search(r'[a-zA-Z_][a-zA-Z_0-9]*\(.*\)') is not None:
            pass