
def refactor_true_and_false(line_data):
    """ """
    for i in range(len(line_data)):
        if 'True' in line_data[i][2]:
            line_data[i][2] = line_data[i][2].replace('True', 'true')
        if 'False' in line_data[i][2]:
            line_data[i][2] = line_data[i][2].replace('False', 'false')
    return line_data


if __name__ == "__main__":
    pass # TODO: implement test