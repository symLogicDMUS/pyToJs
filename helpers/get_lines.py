from pprint import pprint
import os


def get_lines(file_name):
    """ """
    if 'test_files' not in os.listdir('.'):
        os.chdir('..')
    f = open('./test_files/{}.py'.format(file_name))
    lines = f.readlines()
    f.close()
    lines = list(filter(lambda line: not line.isspace(), lines))
    return lines


if __name__ == "__main__":
    pprint(get_lines("JsonRecords"))