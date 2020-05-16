from operator import itemgetter
from print_list import print_list


def sort_cflc(cflc):
    """ """
    cflc = sorted(cflc, key=itemgetter(1, 0))
    cflc.reverse()
    return cflc


if __name__ == "__main__":
    cflc = \
    [
        [7, 0, 'class JsonRecords(object):\n'],
        [9, 4, '    def __init__(self, file, board, j_records=None):\n'],
        [10, 8, '        if j_records is None:\n'],
        [17, 8, '        else:\n'],
        [28, 8, '        if j_records is None:\n'],
        [32, 8, '        else:\n'],
        [36, 4, '    def _init_pawn_ids(self, board, file=""):\n'],
        [39, 8, '        for hist in self.pawn_histories.values():\n'],
        [43, 12, "            if get_piece_type(id_) != 'Pawn':\n"],
        [53, 4, '    def _init_pawn_locs(self):\n'],
        [56, 8, '        for hist in self.pawn_histories.values():\n'],
        [62, 4, '    def _rankfile_to_tuple(self, from_web=False):\n'],
        [68, 8, '        for rf in self.rooks_moved.keys():\n'],
        [72, 8, '        for rf in self.kings_moved.keys():\n'],
        [76, 8, '        if from_web:\n'],
        [77, 12, '            for id_ in self.pawn_histories.keys():\n'],
        [81, 8, '        else:\n'],
        [82, 12, '            for rf1 in self.pawn_histories.keys():\n'],
        [85, 16, '                for rf2 in self.pawn_histories[rf1]:\n'],
        [94, 8, "        if self.last_pawn_move != 'None':\n"],
        [98, 4, '    def _tuple_to_rankfile(self, for_web=False):\n'],
        [104, 8, '        for xy in self.rooks_moved.keys():\n'],
        [108, 8, '        for xy in self.kings_moved.keys():\n'],
        [112, 8, '        if for_web:\n'],
        [113, 12, '            for id_ in self.pawn_histories.keys():\n'],
        [117, 8, '        else:\n'],
        [118, 12, '            for xy1 in self.pawn_histories.keys():\n'],
        [121, 16, '                for xy2 in self.pawn_histories[xy1]:\n'],
        [130, 8, "        if self.last_pawn_move != 'None':\n"],
        [134, 4, '    def update_hist(self, id_, start, dest, promo_flag):\n'],
        [137, 8, '        if p_type != "Pawn":\n'],
        [139, 12, "            if p_type == 'Rook' and start in self.rooks_moved.keys():\n"],
        [142, 12, "            elif p_type == 'King' and start in self.kings_moved.keys():\n"],
        [146, 8, '        else:\n'],
        [153, 4, '    def update_state(self, board, ranges, enemy_color, npck):\n'],
        [163, 8, '        if not any(ranges.values()):\n'],
        [164, 12, '            if npck > 0:\n'],
        [167, 12, '            else:\n'],
        [173, 8,
         "        if piece_types in [['King', 'King'], ['Bishop', 'King', 'King'], ['King', 'King', 'Knight']]:\n"],
        [176, 8, '        elif npck > 0:\n'],
        [179, 8, '        else:\n'],
        [183, 4, '    def update_rooks_moved(self, sqr):\n'],
        [187, 4, '    def update_kings_moved(self, sqr):\n'],
        [191, 4, '    def update_pawn_history(self, id_, new_loc, promo):\n'],
        [193, 8, '        if promo:\n'],
        [196, 8, '        else:\n'],
        [200, 4, '    def get_records(self, for_web=False):\n'],
        [202, 8, '        if for_web:\n'],
        [210, 4, '    def reset_non_pawn_moves(self):\n'],
        [214, 4, '    def delete_pawn(self, id):\n'],
        [218, 4, '    def has_king_moved(self, color):\n'],
        [220, 8, "        if color == 'W':\n"],
        [223, 8, "        elif color == 'B':\n"],
        [226, 8, '        else:\n'],
        [231, 4, '    def get_start_king(self, color):\n'],
        [233, 8, "        if color == 'W':\n"],
        [236, 8, "        elif color == 'B':\n"],
        [239, 8, '        else:\n'],
        [244, 4, '    def update_rook_dict(self, rooks_moved):\n'],
        [248, 4, '    def queen_side_rook_moved(self, color):\n'],
        [250, 8, "        if color == 'W':\n"],
        [253, 8, "        elif color == 'B':\n"],
        [257, 4, '    def king_side_rook_moved(self, color):\n'],
        [259, 8, "        if color == 'W':\n"],
        [262, 8, "        elif color == 'B':\n"],
        [266, 4, '    def __str__(self):\n'],
        [270, 8, '        for k, v in self.rooks_moved.items():\n'],
        [278, 8, '        for k, v in self.kings_moved.items():\n'],
        [286, 8, '        for k, v in self.pawn_histories.items():\n'],
        [312, 0, 'if __name__ == "__main__":\n']
    ]
print_list(sort_cflc(cflc))
