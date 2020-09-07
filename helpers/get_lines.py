from pprint import pprint
import os


def get_lines(file_path):
    """ """
    f = open(file_path, 'r')
    lines = f.readlines()
    f.close()
    lines = list(filter(lambda line: not line.isspace(), lines))
    return lines


if __name__ == "__main__":
    pass  # TODO: implement test
