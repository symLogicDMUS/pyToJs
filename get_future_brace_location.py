

def get_future_brace_location(cflc_i, line_data_dict, line_data):
    """ """
    line = line_data_dict[cflc_i]
    true_i = line_data.index(line)
    loc = -1
    while true_i < len(line_data) - 1:
        true_i += 1
        if line_data[true_i][1] <= line[1]:
            loc = line_data.index(line_data[true_i])
            break
    else:
        loc = len(line_data) - 1
    return loc


if __name__ == "__main__":
    pass  # TODO: implement test
