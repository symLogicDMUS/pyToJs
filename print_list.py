from pprint import pprint


def print_list(list_, pprint_=False):
    """ """
    print("[")
    for i in range(len(list_) - 1):
        if pprint_:
            pprint(list_[i])
            print(",")
        else:
            print(list_[i], ",")
    if pprint_:
        pprint(list_[-1])
    else:
        print(list_[-1])
    print("]")