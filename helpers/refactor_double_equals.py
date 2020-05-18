def refactor_double_equals(line_data):
    """ """
    for i in range(len(line_data)):
        if '==' in line_data[i][2]:
            line_data[i][2] = line_data[i][2].replace('==', '===')
    return line_data


if __name__ == '__main__':
    pass  # TODO: implement test
