
def is_legal(ranges, board, start, dest):
    """return True if piece with id at location start can move to dest, otherwise False"""
    id_ = board[start]
    if id_ == "#":
        return False
    if dest not in ranges[id_]:
        return False
    return True


if __name__ == "__main__":
    pass  # TODO: implement test
