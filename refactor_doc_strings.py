import re
from print_list import print_list


def refactor_doc_strings(line_data):
    """ """
    for i in range(len(line_data)):
        if re.search(r'"""(.*)"""', line_data[i][2]) is not None:
            doc = re.search(r'"""(.*)"""', line_data[i][2]).group(1)
            line_data[i][2] = '/**' + doc + '*/'
