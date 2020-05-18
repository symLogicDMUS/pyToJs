import os


def get_file_str(file_name, line_data):
    lines = list(map(lambda line: line[2], line_data))

    if 'result_files' not in os.listdir('.'):
        os.chdir('..')

    f = open('./result_files/{}.js'.format(file_name), 'w')
    f.writelines(lines)
    f.close()

    f = open('./result_files/{}.js'.format(file_name), 'r')
    file_str = f.read()
    f.close()

    return file_str
