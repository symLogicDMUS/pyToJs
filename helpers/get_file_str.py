import os


def get_file_str(file_path, line_data):
    lines = list(map(lambda line: line[2], line_data))

    f = open(file_path, 'w')
    f.writelines(lines)
    f.close()

    f = open(file_path, 'r')
    file_str = f.read()
    f.close()

    return file_str
