from itertools import repeat
from helpers.print_list import print_list


def cb_loc_add_check_col(cb_locations):
    """ """
    cb_locations = list(zip(cb_locations, list(repeat(False, len(cb_locations)))))
    cb_locations = list(map(lambda loc: list(loc), cb_locations))
    return cb_locations


if __name__ == "__main__":
    cb_locations = \
        [
            16,
            19,
            31,
            34,
            35,
            49,
            50,
            52,
            59,
            61,
            71,
            75,
            79,
            80,
            88,
            89,
            90,
            96,
            97,
            107,
            111,
            115,
            116,
            124,
            125,
            126,
            132,
            133,
            141,
            144,
            145,
            150,
            152,
            166,
            169,
            171,
            175,
            178,
            181,
            182,
            186,
            190,
            195,
            198,
            199,
            204,
            209,
            213,
            217,
            222,
            225,
            229,
            230,
            235,
            238,
            242,
            243,
            247,
            252,
            255,
            256,
            261,
            264,
            265,
            275,
            283,
            291,
            310,
            311,
            313
        ]
    print_list(cb_loc_add_check_col(cb_locations))