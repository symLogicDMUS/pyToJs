import re
from print_list import print_list


def refactor_conditionals(line_data):
    for i in range(len(line_data)):
        if re.match(r'(^\s*)(if|elif|for|while)(\s*)(.*):', line_data[i][1]) is not None:
            line = line_data[i][1]
            match = re.search(r'(^\s*)(if|elif|for|while)(\s*)(.*):', line)
            line = match.group(1) + match.group(2) + match.group(3) + "(" + match.group(4) + ")" + " {\n"
            if 'elif' in line:
                line = line.replace('elif', 'else if')
            line_data[i] = (line_data[i][0], line)
        elif re.match(r'^\s*else:', line_data[i][1]) is not None:
            line = line_data[i][1]
            match = re.search(r'^\s*else:', line)
            line = match.group() + ' {'
            line_data[i] = (line_data[i][0], line)
    return line_data


if __name__ == "__main__":
    line_data = \
        [
            (0, 'from custom_except import *\n'),
            (0, 'from coordType.to_xy import to_xy\n'),
            (0, 'from coordType.to_rankfile import to_rankfile\n'),
            (0, 'from getters.get_piece_type import get_piece_type\n'),
            (0, 'from getters.get_piece_types import get_piece_types\n'),
            (0, 'from misc.g_status_types import *\n'),
            (0, 'from misc.JsonRecordError import JsonRecordError\n'),
            (0, 'import json\n'),
            (1, '\n'),
            (1, '\n'),
            (0, 'class JsonRecords(object):\n'),
            (4, '    """contains info for new or saved game relevant to perfoming a castle or en_passant"""\n'),
            (1, '\n'),
            (4, '    def __init__(self, file, board, j_records=None):\n'),
            (1, '\n'),
            (8, '        if j_records is None:\n'),
            (12, '            f = open(file, "r")\n'),
            (12, '            json_data = f.read()\n'),
            (12, '            records = json.loads(json_data)\n'),
            (12, '            json.dumps(records, indent=4, sort_keys=False)\n'),
            (12, '            f.close()\n'),
            (8, '        else:\n'),
            (12, '            records = j_records\n'),
            (1, '\n'),
            (8, "        self.rooks_moved = records['rooks_moved']\n"),
            (8, "        self.kings_moved = records['kings_moved']\n"),
            (8, "        self.pawn_histories = records['pawn_histories']\n"),
            (8, "        self.last_pawn_move = records['last_pawn_move']\n"),
            (8, "        self.num_consecutive_non_pawn_moves = records['num_consecutive_non_pawn_moves']\n"),
            (8, "        self.game_status = records['game_status']\n"),
            (8, "        self.condition = records['condition']\n"),
            (8, "        self.winner = records['winner']\n"),
            (1, '\n'),
            (8, '        if j_records is None:\n'),
            (12, '            self._init_pawn_ids(board, file=file)\n'),
            (12, '            self._rankfile_to_tuple()\n'),
            (8, '        else:\n'),
            (12, '            self._rankfile_to_tuple(from_web=True)\n'),
            (1, '\n'),
            (4, '    def _init_pawn_ids(self, board, file=""):\n'),
            (8, '        """exchange the sqr that pawn started the game with, with the id for that pawn"""\n'),
            (8, '        pawn_histories = {}\n'),
            (8, '        for hist in self.pawn_histories.values():\n'),
            (12, '            sqr1 = hist[-1]\n'),
            (12, '            id_ = board[sqr1]\n'),
            (12, '            pawn_histories[id_] = hist\n'),
            (12, "            if get_piece_type(id_) != 'Pawn':\n"),
            (16, '                print("ERROR: Pawn history not correct")\n'),
            (16, '                print(file)\n'),
            (16, '                print(sqr1)\n'),
            (16, '                print(id_)\n'),
            (16, '                raise JsonRecordError\n'),
            (8, '        self.pawn_histories = pawn_histories\n'),
            (1, '\n'),
            (4, '    def _init_pawn_locs(self):\n'),
            (8, '        """swap the key of each pawn_history entry with the coordinate of its current location"""\n'),
            (8, '        pawn_histories = {}\n'),
            (8, '        for hist in self.pawn_histories.values():\n'),
            (12, '            sqr = hist[-1]\n'),
            (12, '            pawn_histories[sqr] = hist\n'),
            (8, '        self.pawn_histories = pawn_histories\n'),
            (1, '\n'),
            (4, '    def _rankfile_to_tuple(self, from_web=False):\n'),
            (8, '        """convert the keys and ids for each type of record from a rankfile to a tuple"""\n'),
            (8, '        rooks_moved = {}\n'),
            (8, '        kings_moved = {}\n'),
            (8, '        pawn_histories = {}\n'),
            (8, '        last_pawn_move = None\n'),
            (1, '\n'),
            (8, '        for rf in self.rooks_moved.keys():\n'),
            (12, '            xy = to_xy(rf)\n'),
            (12, '            rooks_moved[xy] = self.rooks_moved[rf]\n'),
            (8, '        for rf in self.kings_moved.keys():\n'),
            (12, '            xy = to_xy(rf)\n'),
            (12, '            kings_moved[xy] = self.kings_moved[rf]\n'),
            (8, '        if from_web:\n'),
            (12, '            for id_ in self.pawn_histories.keys():\n'),
            (16,
             '                self.pawn_histories[id_] = list(map(lambda li: to_xy(li), self.pawn_histories[id_]))\n'),
            (8, '        else:\n'),
            (12, '            for rf1 in self.pawn_histories.keys():\n'),
            (16, '                xy1 = to_xy(rf1)\n'),
            (16, '                pawn_histories[xy1] = []\n'),
            (16, '                for rf2 in self.pawn_histories[rf1]:\n'),
            (20, '                    xy2 = to_xy(rf2)\n'),
            (20, '                    pawn_histories[xy1].append(xy2)\n'),
            (8, '        self.rooks_moved = rooks_moved\n'),
            (8, '        self.kings_moved = kings_moved\n'),
            (8, '        self.pawn_histories = pawn_histories\n'),
            (8, "        if self.last_pawn_move != 'None':\n"),
            (12, '            self.last_pawn_move = to_xy(self.last_pawn_move)\n'),
            (1, '\n'),
            (4, '    def _tuple_to_rankfile(self, for_web=False):\n'),
            (8, '        """convert the keys and ids for each type of record from a tuple to a rankfile"""\n'),
            (8, '        rooks_moved = {}\n'),
            (8, '        kings_moved = {}\n'),
            (8, '        pawn_histories = {}\n'),
            (8, '        self._init_pawn_locs()\n'),
            (8, '        for xy in self.rooks_moved.keys():\n'),
            (12, '            rf = to_rankfile(xy)\n'),
            (12, '            rooks_moved[rf] = self.rooks_moved[xy]\n'),
            (8, '        for xy in self.kings_moved.keys():\n'),
            (12, '            rf = to_rankfile(xy)\n'),
            (12, '            kings_moved[rf] = self.kings_moved[xy]\n'),
            (8, '        if for_web:\n'),
            (12, '            for id_ in self.pawn_histories.keys():\n'),
            (16,
             '                self.pawn_histories[id_] = list(map(lambda li: to_rankfile(li), self.pawn_histories[id_]))\n'),
            (8, '        else:\n'),
            (12, '            for xy1 in self.pawn_histories.keys():\n'),
            (16, '                rf1 = to_rankfile(xy1)\n'),
            (16, '                pawn_histories[rf1] = []\n'),
            (16, '                for xy2 in self.pawn_histories[xy1]:\n'),
            (20, '                    rf2 = to_rankfile(xy2)\n'),
            (20, '                    pawn_histories[rf1].append(rf2)\n'),
            (8, '        self.rooks_moved = rooks_moved\n'),
            (8, '        self.kings_moved = kings_moved\n'),
            (8, '        self.pawn_histories = pawn_histories\n'),
            (8, "        if self.last_pawn_move != 'None':\n"),
            (12, '            self.last_pawn_move = to_rankfile(self.last_pawn_move)\n'),
            (1, '\n'),
            (4, '    def update_hist(self, id_, start, dest, promo_flag):\n'),
            (8, '        """update json records depending on the piece type of id_ at location start"""\n'),
            (8, '        p_type = get_piece_type(id_)\n'),
            (8, '        if p_type != "Pawn":\n'),
            (12, '            self.num_consecutive_non_pawn_moves += 1\n'),
            (12, "            if p_type == 'Rook' and start in self.rooks_moved.keys():\n"),
            (16, '                self.update_rooks_moved(start)\n'),
            (12, "            elif p_type == 'King' and start in self.kings_moved.keys():\n"),
            (16, '                self.update_kings_moved(start)\n'),
            (8, '        else:\n'),
            (12, '            self.reset_non_pawn_moves()\n'),
            (12, '            self.last_pawn_move = dest\n'),
            (12, '            self.update_pawn_history(id_, dest, promo_flag)\n'),
            (8, '        return\n'),
            (1, '\n'),
            (4, '    def update_state(self, board, ranges, enemy_color, npck):\n'),
            (8, '        """\n'),
            (9, '         update the status of the game: OVER or IN_PROGRESS\n'),
            (9, "         update the winner of the game: 'w', 'b', or '-' (neither)\n"),
            (9, "         udpate the condition of the enemy king: 'check', 'checkmate', 'stalemate', or 'safe'\n"),
            (9, '         :param board: dict, game board\n'),
            (9, '         :param npck: int, number of pieces checking the king\n'),
            (9, '         :param ranges: dict, ranges of pieces of color\n'),
            (9, '         :param enemy_color: str, color of king\n'),
            (8, '        """\n'),
            (1, '\n'),
            (8, '        if not any(ranges.values()):\n'),
            (12, '            if npck > 0:\n'),
            (16, "                self.condition, self.game_status, self.winner = 'checkmate', OVER, enemy_color\n"),
            (12, '            else:\n'),
            (16, "                self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'\n"),
            (12, '            return\n'),
            (1, '\n'),
            (8, '        piece_types = get_piece_types(board)\n'),
            (8,
             "        if piece_types in [['King', 'King'], ['Bishop', 'King', 'King'], ['King', 'King', 'Knight']]:\n"),
            (12, "            self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'\n"),
            (8, '        elif npck > 0:\n'),
            (12, "            self.condition, self.game_status, self.winner = 'check', IN_PROGRESS, '-'\n"),
            (8, '        else:\n'),
            (12, "            self.condition, self.game_status, self.winner = '', IN_PROGRESS, '-'\n"),
            (1, '\n'),
            (4, '    def update_rooks_moved(self, sqr):\n'),
            (8, '        """update rooks_moved because rook that start game at sqr has moved"""\n'),
            (8, '        self.rooks_moved[sqr] = True\n'),
            (1, '\n'),
            (4, '    def update_kings_moved(self, sqr):\n'),
            (8, '        """update kings_moved because king that started game at sqr has moved"""\n'),
            (8, '        self.kings_moved[sqr] = True\n'),
            (1, '\n'),
            (4, '    def update_pawn_history(self, id_, new_loc, promo):\n'),
            (8, '        """update location of pawn by appending its new location to its history"""\n'),
            (8, '        if promo:\n'),
            (12, '            del self.pawn_histories[id_]\n'),
            (8, '        else:\n'),
            (12, '            self.pawn_histories[id_].append(new_loc)\n'),
            (1, '\n'),
            (4, '    def get_records(self, for_web=False):\n'),
            (8, '        """return the json records as one python dict"""\n'),
            (8, '        if for_web:\n'),
            (12, '            self._tuple_to_rankfile(for_web=True)\n'),
            (8, "        return {'rooks_moved': self.rooks_moved, 'kings_moved': self.kings_moved,\n"),
            (16, "                'pawn_histories': self.pawn_histories, 'last_pawn_move': self.last_pawn_move,\n"),
            (16, "                'num_consecutive_non_pawn_moves': self.num_consecutive_non_pawn_moves,\n"),
            (16,
             "                'game_status': self.game_status, 'condition': self.condition, 'winner': self.winner}\n"),
            (1, '\n'),
            (4, '    def reset_non_pawn_moves(self):\n'),
            (8, '        """ a pawn has just moved, so reset number of consecutive non pawn moves to 0"""\n'),
            (8, '        self.num_consecutive_non_pawn_moves = 0\n'),
            (1, '\n'),
            (4, '    def delete_pawn(self, id):\n'),
            (8, '        """delete pawn with id from pawn histories"""\n'),
            (8, '        del self.pawn_histories[id]\n'),
            (1, '\n'),
            (4, '    def has_king_moved(self, color):\n'),
            (8, '        """return true/false of if the King of color has moved from its starting position"""\n'),
            (8, "        if color == 'W':\n"),
            (12, '            return self.kings_moved[(5, 1)]\n'),
            (8, "        elif color == 'B':\n"),
            (12, '            return self.kings_moved[(5, 8)]\n'),
            (8, '        else:\n'),
            (12, "            print('error: not a valid color\\n')\n"),
            (12, '            return -1\n'),
            (1, '\n'),
            (4, '    def get_start_king(self, color):\n'),
            (8, '        """get starting position of king based off of color"""\n'),
            (8, "        if color == 'W':\n"),
            (12, '            return (5, 1)\n'),
            (8, "        elif color == 'B':\n"),
            (12, '            return (5, 8)\n'),
            (8, '        else:\n'),
            (12, "            print('error:invalid color')\n"),
            (12, '            return -1\n'),
            (1, '\n'),
            (4, '    def update_rook_dict(self, rooks_moved):\n'),
            (8, '        """update rooks_moved dict to a new one"""\n'),
            (8, '        self.rooks_moved = rooks_moved\n'),
            (1, '\n'),
            (4, '    def queen_side_rook_moved(self, color):\n'),
            (8, '        """return true if the queen side rook of the given color has moved, otherwise false"""\n'),
            (1, '\n'),
            (8, "        if color == 'W':\n"),
            (12, '            return self.rooks_moved[(1, 1)]\n'),
            (8, "        elif color == 'B':\n"),
            (12, '            return self.rooks_moved[(1, 8)]\n'),
            (1, '\n'),
            (4, '    def king_side_rook_moved(self, color):\n'),
            (8, '        """return true if the king side rook of the given color has moved, otherwise false"""\n'),
            (1, '\n'),
            (8, "        if color == 'W':\n"),
            (12, '            return self.rooks_moved[(8, 1)]\n'),
            (8, "        elif color == 'B':\n"),
            (12, '            return self.rooks_moved[(8, 8)]\n'),
            (1, '\n'),
            (4, '    def __str__(self):\n'),
            (8, '        """called when object is argument to print"""\n'),
            (1, '\n'),
            (8, '        str_ = ""\n'),
            (1, '\n'),
            (8, '        str_ += \'"rooks_moved": {\\n\'\n'),
            (8, '        for k, v in self.rooks_moved.items():\n'),
            (12, '            str_ += str(k)\n'),
            (12, "            str_ += ':'\n"),
            (12, '            str_ += str(v)\n'),
            (12, "            str_ += '\\n'\n"),
            (8, "        str_ += '},\\n'\n"),
            (1, '\n'),
            (8, '        str_ += \'"kings_moved": {\\n\'\n'),
            (8, '        for k, v in self.kings_moved.items():\n'),
            (12, '            str_ += str(k)\n'),
            (12, "            str_ += ':'\n"),
            (12, '            str_ += str(v)\n'),
            (12, "            str_ += '\\n'\n"),
            (8, "        str_ += '},\\n'\n"),
            (1, '\n'),
            (8, '        str_ += \'"pawn_histories": {\\n\'\n'),
            (8, '        for k, v in self.pawn_histories.items():\n'),
            (12, '            str_ += str(k)\n'),
            (12, "            str_ += ':'\n"),
            (12, '            str_ += str(v)\n'),
            (12, "            str_ += '\\n'\n"),
            (8, "        str_ += '},\\n'\n"),
            (1, '\n'),
            (8, "        str_ += 'last_pawn_move'\n"),
            (8, "        str_ += ':'\n"),
            (8, '        str_ += str(self.last_pawn_move)\n'),
            (8, "        str_ += ',\\n'\n"),
            (1, '\n'),
            (8, "        str_ += 'num_consecutive_non_pawn_moves'\n"),
            (8, "        str_ += ':'\n"),
            (8, '        str_ += str(self.num_consecutive_non_pawn_moves)\n'),
            (8, "        str_ += ',\\n'\n"),
            (1, '\n'),
            (8, "        str_ += 'game_status'\n"),
            (8, "        str_ += ':'\n"),
            (8, '        str_ += str(self.game_status)\n'),
            (8, "        str_ += ',\\n'\n"),
            (1, '\n'),
            (8, "        str_ += 'winner'\n"),
            (8, "        str_ += ':'\n"),
            (8, '        str_ += str(self.winner)\n'),
            (8, "        str_ += ',\\n'\n"),
            (1, '\n'),
            (8, '        return str_\n'),
            (1, '\n'),
            (1, '\n'),
            (0, 'if __name__ == "__main__":\n'),
            (4, '    pass  # TODO: implement test')
        ]
    print_list(refactor_conditionals(line_data))