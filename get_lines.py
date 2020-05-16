from pprint import pprint


def get_lines(file_name):
    """ """
    f = open('./test_files/{}.py'.format(file_name))
    lines = f.readlines()
    f.close()
    return lines


if __name__ == "__main__":
    pprint(get_lines("JsonRecords"))