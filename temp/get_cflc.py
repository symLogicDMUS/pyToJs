from print_list import print_list


def get_cflc(indexs_cflc, line_data):
    cflc = []
    for i in indexs_cflc:
        cflc.append([line_data[i][0], line_data[i][1], line_data[i][2]])
    return cflc


if __name__ == "__main__":
    line_data =\
    [
        [0, 0, 'from custom_except import *\n'],
        [1, 0, 'from coordType.to_xy import to_xy\n'],
        [2, 0, 'from coordType.to_rankfile import to_rankfile\n'],
        [3, 0, 'from getters.get_piece_type import get_piece_type\n'],
        [4, 0, 'from getters.get_piece_types import get_piece_types\n'],
        [5, 0, 'from misc.g_status_types import *\n'],
        [6, 0, 'from misc.JsonRecordError import JsonRecordError\n'],
        [7, 0, 'import json\n'],
        [8, 1, '\n'],
        [9, 1, '\n'],
        [10, 0, 'class JsonRecords(object):\n'],
        [11, 4, '    """contains info for new or saved game relevant to perfoming a castle or en_passant"""\n'],
        [12, 1, '\n'],
        [13, 4, '    def __init__(self, file, board, j_records=None):\n'],
        [14, 1, '\n'],
        [15, 8, '        if j_records is None:\n'],
        [16, 12, '            f = open(file, "r")\n'],
        [17, 12, '            json_data = f.read()\n'],
        [18, 12, '            records = json.loads(json_data)\n'],
        [19, 12, '            json.dumps(records, indent=4, sort_keys=False)\n'],
        [20, 12, '            f.close()\n'],
        [21, 8, '        else:\n'],
        [22, 12, '            records = j_records\n'],
        [23, 1, '\n'],
        [24, 8, "        self.rooks_moved = records['rooks_moved']\n"],
        [25, 8, "        self.kings_moved = records['kings_moved']\n"],
        [26, 8, "        self.pawn_histories = records['pawn_histories']\n"],
        [27, 8, "        self.last_pawn_move = records['last_pawn_move']\n"],
        [28, 8, "        self.num_consecutive_non_pawn_moves = records['num_consecutive_non_pawn_moves']\n"],
        [29, 8, "        self.game_status = records['game_status']\n"],
        [30, 8, "        self.condition = records['condition']\n"],
        [31, 8, "        self.winner = records['winner']\n"],
        [32, 1, '\n'],
        [33, 8, '        if j_records is None:\n'],
        [34, 12, '            self._init_pawn_ids(board, file=file)\n'],
        [35, 12, '            self._rankfile_to_tuple()\n'],
        [36, 8, '        else:\n'],
        [37, 12, '            self._rankfile_to_tuple(from_web=True)\n'],
        [38, 1, '\n'],
        [39, 4, '    def _init_pawn_ids(self, board, file=""):\n'],
        [40, 8, '        """exchange the sqr that pawn started the game with, with the id for that pawn"""\n'],
        [41, 8, '        pawn_histories = {}\n'],
        [42, 8, '        for hist in self.pawn_histories.values():\n'],
        [43, 12, '            sqr1 = hist[-1]\n'],
        [44, 12, '            id_ = board[sqr1]\n'],
        [45, 12, '            pawn_histories[id_] = hist\n'],
        [46, 12, "            if get_piece_type(id_) != 'Pawn':\n"],
        [47, 16, '                print("ERROR: Pawn history not correct")\n'],
        [48, 16, '                print(file)\n'],
        [49, 16, '                print(sqr1)\n'],
        [50, 16, '                print(id_)\n'],
        [51, 16, '                raise JsonRecordError\n'],
        [52, 8, '        self.pawn_histories = pawn_histories\n'],
        [53, 1, '\n'],
        [54, 4, '    def _init_pawn_locs(self):\n'],
        [55, 8, '        """swap the key of each pawn_history entry with the coordinate of its current location"""\n'],
        [56, 8, '        pawn_histories = {}\n'],
        [57, 8, '        for hist in self.pawn_histories.values():\n'],
        [58, 12, '            sqr = hist[-1]\n'],
        [59, 12, '            pawn_histories[sqr] = hist\n'],
        [60, 8, '        self.pawn_histories = pawn_histories\n'],
        [61, 1, '\n'],
        [62, 4, '    def _rankfile_to_tuple(self, from_web=False):\n'],
        [63, 8, '        """convert the keys and ids for each type of record from a rankfile to a tuple"""\n'],
        [64, 8, '        rooks_moved = {}\n'],
        [65, 8, '        kings_moved = {}\n'],
        [66, 8, '        pawn_histories = {}\n'],
        [67, 8, '        last_pawn_move = None\n'],
        [68, 1, '\n'],
        [69, 8, '        for rf in self.rooks_moved.keys():\n'],
        [70, 12, '            xy = to_xy(rf)\n'],
        [71, 12, '            rooks_moved[xy] = self.rooks_moved[rf]\n'],
        [72, 8, '        for rf in self.kings_moved.keys():\n'],
        [73, 12, '            xy = to_xy(rf)\n'],
        [74, 12, '            kings_moved[xy] = self.kings_moved[rf]\n'],
        [75, 8, '        if from_web:\n'],
        [76, 12, '            for id_ in self.pawn_histories.keys():\n'],
        [77, 16,
         '                self.pawn_histories[id_] = list(map(lambda li: to_xy(li), self.pawn_histories[id_]))\n'],
        [78, 8, '        else:\n'],
        [79, 12, '            for rf1 in self.pawn_histories.keys():\n'],
        [80, 16, '                xy1 = to_xy(rf1)\n'],
        [81, 16, '                pawn_histories[xy1] = []\n'],
        [82, 16, '                for rf2 in self.pawn_histories[rf1]:\n'],
        [83, 20, '                    xy2 = to_xy(rf2)\n'],
        [84, 20, '                    pawn_histories[xy1].append(xy2)\n'],
        [85, 8, '        self.rooks_moved = rooks_moved\n'],
        [86, 8, '        self.kings_moved = kings_moved\n'],
        [87, 8, '        self.pawn_histories = pawn_histories\n'],
        [88, 8, "        if self.last_pawn_move != 'None':\n"],
        [89, 12, '            self.last_pawn_move = to_xy(self.last_pawn_move)\n'],
        [90, 1, '\n'],
        [91, 4, '    def _tuple_to_rankfile(self, for_web=False):\n'],
        [92, 8, '        """convert the keys and ids for each type of record from a tuple to a rankfile"""\n'],
        [93, 8, '        rooks_moved = {}\n'],
        [94, 8, '        kings_moved = {}\n'],
        [95, 8, '        pawn_histories = {}\n'],
        [96, 8, '        self._init_pawn_locs()\n'],
        [97, 8, '        for xy in self.rooks_moved.keys():\n'],
        [98, 12, '            rf = to_rankfile(xy)\n'],
        [99, 12, '            rooks_moved[rf] = self.rooks_moved[xy]\n'],
        [100, 8, '        for xy in self.kings_moved.keys():\n'],
        [101, 12, '            rf = to_rankfile(xy)\n'],
        [102, 12, '            kings_moved[rf] = self.kings_moved[xy]\n'],
        [103, 8, '        if for_web:\n'],
        [104, 12, '            for id_ in self.pawn_histories.keys():\n'],
        [105, 16,
         '                self.pawn_histories[id_] = list(map(lambda li: to_rankfile(li), self.pawn_histories[id_]))\n'],
        [106, 8, '        else:\n'],
        [107, 12, '            for xy1 in self.pawn_histories.keys():\n'],
        [108, 16, '                rf1 = to_rankfile(xy1)\n'],
        [109, 16, '                pawn_histories[rf1] = []\n'],
        [110, 16, '                for xy2 in self.pawn_histories[xy1]:\n'],
        [111, 20, '                    rf2 = to_rankfile(xy2)\n'],
        [112, 20, '                    pawn_histories[rf1].append(rf2)\n'],
        [113, 8, '        self.rooks_moved = rooks_moved\n'],
        [114, 8, '        self.kings_moved = kings_moved\n'],
        [115, 8, '        self.pawn_histories = pawn_histories\n'],
        [116, 8, "        if self.last_pawn_move != 'None':\n"],
        [117, 12, '            self.last_pawn_move = to_rankfile(self.last_pawn_move)\n'],
        [118, 1, '\n'],
        [119, 4, '    def update_hist(self, id_, start, dest, promo_flag):\n'],
        [120, 8, '        """update json records depending on the piece type of id_ at location start"""\n'],
        [121, 8, '        p_type = get_piece_type(id_)\n'],
        [122, 8, '        if p_type != "Pawn":\n'],
        [123, 12, '            self.num_consecutive_non_pawn_moves += 1\n'],
        [124, 12, "            if p_type == 'Rook' and start in self.rooks_moved.keys():\n"],
        [125, 16, '                self.update_rooks_moved(start)\n'],
        [126, 12, "            elif p_type == 'King' and start in self.kings_moved.keys():\n"],
        [127, 16, '                self.update_kings_moved(start)\n'],
        [128, 8, '        else:\n'],
        [129, 12, '            self.reset_non_pawn_moves()\n'],
        [130, 12, '            self.last_pawn_move = dest\n'],
        [131, 12, '            self.update_pawn_history(id_, dest, promo_flag)\n'],
        [132, 8, '        return\n'],
        [133, 1, '\n'],
        [134, 4, '    def update_state(self, board, ranges, enemy_color, npck):\n'],
        [135, 8, '        """\n'],
        [136, 9, '         update the status of the game: OVER or IN_PROGRESS\n'],
        [137, 9, "         update the winner of the game: 'w', 'b', or '-' (neither)\n"],
        [138, 9, "         udpate the condition of the enemy king: 'check', 'checkmate', 'stalemate', or 'safe'\n"],
        [139, 9, '         :param board: dict, game board\n'],
        [140, 9, '         :param npck: int, number of pieces checking the king\n'],
        [141, 9, '         :param ranges: dict, ranges of pieces of color\n'],
        [142, 9, '         :param enemy_color: str, color of king\n'],
        [143, 8, '        """\n'],
        [144, 1, '\n'],
        [145, 8, '        if not any(ranges.values()):\n'],
        [146, 12, '            if npck > 0:\n'],
        [147, 16, "                self.condition, self.game_status, self.winner = 'checkmate', OVER, enemy_color\n"],
        [148, 12, '            else:\n'],
        [149, 16, "                self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'\n"],
        [150, 12, '            return\n'],
        [151, 1, '\n'],
        [152, 8, '        piece_types = get_piece_types(board)\n'],
        [153, 8,
         "        if piece_types in [['King', 'King'], ['Bishop', 'King', 'King'], ['King', 'King', 'Knight']]:\n"],
        [154, 12, "            self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'\n"],
        [155, 8, '        elif npck > 0:\n'],
        [156, 12, "            self.condition, self.game_status, self.winner = 'check', IN_PROGRESS, '-'\n"],
        [157, 8, '        else:\n'],
        [158, 12, "            self.condition, self.game_status, self.winner = '', IN_PROGRESS, '-'\n"],
        [159, 1, '\n'],
        [160, 4, '    def update_rooks_moved(self, sqr):\n'],
        [161, 8, '        """update rooks_moved because rook that start game at sqr has moved"""\n'],
        [162, 8, '        self.rooks_moved[sqr] = True\n'],
        [163, 1, '\n'],
        [164, 4, '    def update_kings_moved(self, sqr):\n'],
        [165, 8, '        """update kings_moved because king that started game at sqr has moved"""\n'],
        [166, 8, '        self.kings_moved[sqr] = True\n'],
        [167, 1, '\n'],
        [168, 4, '    def update_pawn_history(self, id_, new_loc, promo):\n'],
        [169, 8, '        """update location of pawn by appending its new location to its history"""\n'],
        [170, 8, '        if promo:\n'],
        [171, 12, '            del self.pawn_histories[id_]\n'],
        [172, 8, '        else:\n'],
        [173, 12, '            self.pawn_histories[id_].append(new_loc)\n'],
        [174, 1, '\n'],
        [175, 4, '    def get_records(self, for_web=False):\n'],
        [176, 8, '        """return the json records as one python dict"""\n'],
        [177, 8, '        if for_web:\n'],
        [178, 12, '            self._tuple_to_rankfile(for_web=True)\n'],
        [179, 8, "        return {'rooks_moved': self.rooks_moved, 'kings_moved': self.kings_moved,\n"],
        [180, 16, "                'pawn_histories': self.pawn_histories, 'last_pawn_move': self.last_pawn_move,\n"],
        [181, 16, "                'num_consecutive_non_pawn_moves': self.num_consecutive_non_pawn_moves,\n"],
        [182, 16,
         "                'game_status': self.game_status, 'condition': self.condition, 'winner': self.winner}\n"],
        [183, 1, '\n'],
        [184, 4, '    def reset_non_pawn_moves(self):\n'],
        [185, 8, '        """ a pawn has just moved, so reset number of consecutive non pawn moves to 0"""\n'],
        [186, 8, '        self.num_consecutive_non_pawn_moves = 0\n'],
        [187, 1, '\n'],
        [188, 4, '    def delete_pawn(self, id):\n'],
        [189, 8, '        """delete pawn with id from pawn histories"""\n'],
        [190, 8, '        del self.pawn_histories[id]\n'],
        [191, 1, '\n'],
        [192, 4, '    def has_king_moved(self, color):\n'],
        [193, 8, '        """return true/false of if the King of color has moved from its starting position"""\n'],
        [194, 8, "        if color == 'W':\n"],
        [195, 12, '            return self.kings_moved[(5, 1)]\n'],
        [196, 8, "        elif color == 'B':\n"],
        [197, 12, '            return self.kings_moved[(5, 8)]\n'],
        [198, 8, '        else:\n'],
        [199, 12, "            print('error: not a valid color\\n')\n"],
        [200, 12, '            return -1\n'],
        [201, 1, '\n'],
        [202, 4, '    def get_start_king(self, color):\n'],
        [203, 8, '        """get starting position of king based off of color"""\n'],
        [204, 8, "        if color == 'W':\n"],
        [205, 12, '            return (5, 1)\n'],
        [206, 8, "        elif color == 'B':\n"],
        [207, 12, '            return (5, 8)\n'],
        [208, 8, '        else:\n'],
        [209, 12, "            print('error:invalid color')\n"],
        [210, 12, '            return -1\n'],
        [211, 1, '\n'],
        [212, 4, '    def update_rook_dict(self, rooks_moved):\n'],
        [213, 8, '        """update rooks_moved dict to a new one"""\n'],
        [214, 8, '        self.rooks_moved = rooks_moved\n'],
        [215, 1, '\n'],
        [216, 4, '    def queen_side_rook_moved(self, color):\n'],
        [217, 8, '        """return true if the queen side rook of the given color has moved, otherwise false"""\n'],
        [218, 1, '\n'],
        [219, 8, "        if color == 'W':\n"],
        [220, 12, '            return self.rooks_moved[(1, 1)]\n'],
        [221, 8, "        elif color == 'B':\n"],
        [222, 12, '            return self.rooks_moved[(1, 8)]\n'],
        [223, 1, '\n'],
        [224, 4, '    def king_side_rook_moved(self, color):\n'],
        [225, 8, '        """return true if the king side rook of the given color has moved, otherwise false"""\n'],
        [226, 1, '\n'],
        [227, 8, "        if color == 'W':\n"],
        [228, 12, '            return self.rooks_moved[(8, 1)]\n'],
        [229, 8, "        elif color == 'B':\n"],
        [230, 12, '            return self.rooks_moved[(8, 8)]\n'],
        [231, 1, '\n'],
        [232, 4, '    def __str__(self):\n'],
        [233, 8, '        """called when object is argument to print"""\n'],
        [234, 1, '\n'],
        [235, 8, '        str_ = ""\n'],
        [236, 1, '\n'],
        [237, 8, '        str_ += \'"rooks_moved": {\\n\'\n'],
        [238, 8, '        for k, v in self.rooks_moved.items():\n'],
        [239, 12, '            str_ += str(k)\n'],
        [240, 12, "            str_ += ':'\n"],
        [241, 12, '            str_ += str(v)\n'],
        [242, 12, "            str_ += '\\n'\n"],
        [243, 8, "        str_ += '},\\n'\n"],
        [244, 1, '\n'],
        [245, 8, '        str_ += \'"kings_moved": {\\n\'\n'],
        [246, 8, '        for k, v in self.kings_moved.items():\n'],
        [247, 12, '            str_ += str(k)\n'],
        [248, 12, "            str_ += ':'\n"],
        [249, 12, '            str_ += str(v)\n'],
        [250, 12, "            str_ += '\\n'\n"],
        [251, 8, "        str_ += '},\\n'\n"],
        [252, 1, '\n'],
        [253, 8, '        str_ += \'"pawn_histories": {\\n\'\n'],
        [254, 8, '        for k, v in self.pawn_histories.items():\n'],
        [255, 12, '            str_ += str(k)\n'],
        [256, 12, "            str_ += ':'\n"],
        [257, 12, '            str_ += str(v)\n'],
        [258, 12, "            str_ += '\\n'\n"],
        [259, 8, "        str_ += '},\\n'\n"],
        [260, 1, '\n'],
        [261, 8, "        str_ += 'last_pawn_move'\n"],
        [262, 8, "        str_ += ':'\n"],
        [263, 8, '        str_ += str(self.last_pawn_move)\n'],
        [264, 8, "        str_ += ',\\n'\n"],
        [265, 1, '\n'],
        [266, 8, "        str_ += 'num_consecutive_non_pawn_moves'\n"],
        [267, 8, "        str_ += ':'\n"],
        [268, 8, '        str_ += str(self.num_consecutive_non_pawn_moves)\n'],
        [269, 8, "        str_ += ',\\n'\n"],
        [270, 1, '\n'],
        [271, 8, "        str_ += 'game_status'\n"],
        [272, 8, "        str_ += ':'\n"],
        [273, 8, '        str_ += str(self.game_status)\n'],
        [274, 8, "        str_ += ',\\n'\n"],
        [275, 1, '\n'],
        [276, 8, "        str_ += 'winner'\n"],
        [277, 8, "        str_ += ':'\n"],
        [278, 8, '        str_ += str(self.winner)\n'],
        [279, 8, "        str_ += ',\\n'\n"],
        [280, 1, '\n'],
        [281, 8, '        return str_\n'],
        [282, 1, '\n'],
        [283, 1, '\n'],
        [284, 0, 'if __name__ == "__main__":\n'],
        [285, 4, '    pass  # TODO: implement test']
    ]
    indexs =\
    [
        10,
        13,
        15,
        21,
        33,
        36,
        39,
        42,
        46,
        54,
        57,
        62,
        69,
        72,
        75,
        76,
        78,
        79,
        82,
        88,
        91,
        97,
        100,
        103,
        104,
        106,
        107,
        110,
        116,
        119,
        122,
        124,
        126,
        128,
        134,
        145,
        146,
        148,
        153,
        155,
        157,
        160,
        164,
        168,
        170,
        172,
        175,
        177,
        184,
        188,
        192,
        194,
        196,
        198,
        202,
        204,
        206,
        208,
        212,
        216,
        219,
        221,
        224,
        227,
        229,
        232,
        238,
        246,
        254,
        284
    ]
    print_list(get_cflc(indexs, line_data))
