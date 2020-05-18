def refactor_none_object(line_data):
    """ """
    for i in range(len(line_data)):
        if ' None ' in line_data[i][2]:
            line_data[i][2] = line_data[i][2].replace(' None ', ' undefined ')
    return line_data


if __name__ == "__main__":
    pass  # TODO: implement test
