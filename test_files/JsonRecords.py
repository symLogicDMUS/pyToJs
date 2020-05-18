from coordType.to_xy import to_xy
from coordType.to_rankfile import to_rankfile
from getters.get_piece_type import get_piece_type
from getters.get_piece_types import get_piece_types
from misc.g_status_types import *
from misc.JsonRecordError import JsonRecordError
import json


class JsonRecords(object):
    """contains info for new or saved game relevant to perfoming a castle or en_passant"""

    def __init__(self, file, board, j_records=None):

        if j_records is None:
            f = open(file, "r")
            json_data = f.read()
            records = json.loads(json_data)
            json.dumps(records, indent=4, sort_keys=False)
            f.close()
        else:
            records = j_records

        self.rooks_moved = records['rooks_moved']
        self.kings_moved = records['kings_moved']
        self.pawn_histories = records['pawn_histories']
        self.last_pawn_move = records['last_pawn_move']
        self.num_consecutive_non_pawn_moves = records['num_consecutive_non_pawn_moves']
        self.game_status = records['game_status']
        self.condition = records['condition']
        self.winner = records['winner']

        if j_records is None:
            self._init_pawn_ids(board, file=file)
            self._rankfile_to_tuple()
        else:
            self._rankfile_to_tuple(from_web=True)

    def _init_pawn_ids(self, board, file=""):
        """exchange the sqr that pawn started the game with, with the id for that pawn"""
        pawn_histories = {}
        for hist in self.pawn_histories.values():
            sqr1 = hist[-1]
            id_ = board[sqr1]
            pawn_histories[id_] = hist
            if get_piece_type(id_) != 'Pawn':
                print("ERROR: Pawn history not correct")
                print(file)
                print(sqr1)
                print(id_)
                raise JsonRecordError
        self.pawn_histories = pawn_histories

    def _init_pawn_locs(self):
        """swap the key of each pawn_history entry with the coordinate of its current location"""
        pawn_histories = {}
        for hist in self.pawn_histories.values():
            sqr = hist[-1]
            pawn_histories[sqr] = hist
        self.pawn_histories = pawn_histories

    def _rankfile_to_tuple(self, from_web=False):
        """convert the keys and ids for each type of record from a rankfile to a tuple"""
        rooks_moved = {}
        kings_moved = {}
        pawn_histories = {}
        last_pawn_move = None

        for rf in self.rooks_moved.keys():
            xy = to_xy(rf)
            rooks_moved[xy] = self.rooks_moved[rf]
        for rf in self.kings_moved.keys():
            xy = to_xy(rf)
            kings_moved[xy] = self.kings_moved[rf]
        if from_web:
            for id_ in self.pawn_histories.keys():
                self.pawn_histories[id_] = list(map(lambda li: to_xy(li), self.pawn_histories[id_]))
        else:
            for rf1 in self.pawn_histories.keys():
                xy1 = to_xy(rf1)
                pawn_histories[xy1] = []
                for rf2 in self.pawn_histories[rf1]:
                    xy2 = to_xy(rf2)
                    pawn_histories[xy1].append(xy2)
        self.rooks_moved = rooks_moved
        self.kings_moved = kings_moved
        self.pawn_histories = pawn_histories
        if self.last_pawn_move != 'None':
            self.last_pawn_move = to_xy(self.last_pawn_move)

    def _tuple_to_rankfile(self, for_web=False):
        """convert the keys and ids for each type of record from a tuple to a rankfile"""
        rooks_moved = {}
        kings_moved = {}
        pawn_histories = {}
        self._init_pawn_locs()
        for xy in self.rooks_moved.keys():
            rf = to_rankfile(xy)
            rooks_moved[rf] = self.rooks_moved[xy]
        for xy in self.kings_moved.keys():
            rf = to_rankfile(xy)
            kings_moved[rf] = self.kings_moved[xy]
        if for_web:
            for id_ in self.pawn_histories.keys():
                self.pawn_histories[id_] = list(map(lambda li: to_rankfile(li), self.pawn_histories[id_]))
        else:
            for xy1 in self.pawn_histories.keys():
                rf1 = to_rankfile(xy1)
                pawn_histories[rf1] = []
                for xy2 in self.pawn_histories[xy1]:
                    rf2 = to_rankfile(xy2)
                    pawn_histories[rf1].append(rf2)
        self.rooks_moved = rooks_moved
        self.kings_moved = kings_moved
        self.pawn_histories = pawn_histories
        if self.last_pawn_move != 'None':
            self.last_pawn_move = to_rankfile(self.last_pawn_move)

    def update_hist(self, id_, start, dest, promo_flag):
        """update json records depending on the piece type of id_ at location start"""
        p_type = get_piece_type(id_)
        if p_type != "Pawn":
            self.num_consecutive_non_pawn_moves += 1
            if p_type == 'Rook' and start in self.rooks_moved.keys():
                self.update_rooks_moved(start)
            elif p_type == 'King' and start in self.kings_moved.keys():
                self.update_kings_moved(start)
        else:
            self.reset_non_pawn_moves()
            self.last_pawn_move = dest
            self.update_pawn_history(id_, dest, promo_flag)
        return

    def update_state(self, board, ranges, enemy_color, npck):
        """
         update the status of the game: OVER or IN_PROGRESS
         update the winner of the game: 'w', 'b', or '-' (neither)
         udpate the condition of the enemy king: 'check', 'checkmate', 'stalemate', or 'safe'
         :param board: dict, game board
         :param npck: int, number of pieces checking the king
         :param ranges: dict, ranges of pieces of color
         :param enemy_color: str, color of king
        """

        if not any(ranges.values()):
            if npck > 0:
                self.condition, self.game_status, self.winner = 'checkmate', OVER, enemy_color
            else:
                self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'
            return

        piece_types = get_piece_types(board)
        if piece_types in [['King', 'King'], ['Bishop', 'King', 'King'], ['King', 'King', 'Knight']]:
            self.condition, self.game_status, self.winner = 'stalemate', OVER, '-'
        elif npck > 0:
            self.condition, self.game_status, self.winner = 'check', IN_PROGRESS, '-'
        else:
            self.condition, self.game_status, self.winner = '', IN_PROGRESS, '-'

    def update_rooks_moved(self, sqr):
        """update rooks_moved because rook that start game at sqr has moved"""
        self.rooks_moved[sqr] = True

    def update_kings_moved(self, sqr):
        """update kings_moved because king that started game at sqr has moved"""
        self.kings_moved[sqr] = True

    def update_pawn_history(self, id_, new_loc, promo):
        """update location of pawn by appending its new location to its history"""
        if promo:
            del self.pawn_histories[id_]
        else:
            self.pawn_histories[id_].append(new_loc)

    def get_records(self, for_web=False):
        """return the json records as one python dict"""
        if for_web:
            self._tuple_to_rankfile(for_web=True)
        return {'rooks_moved': self.rooks_moved, 'kings_moved': self.kings_moved,
                'pawn_histories': self.pawn_histories, 'last_pawn_move': self.last_pawn_move,
                'num_consecutive_non_pawn_moves': self.num_consecutive_non_pawn_moves,
                'game_status': self.game_status, 'condition': self.condition, 'winner': self.winner}

    def reset_non_pawn_moves(self):
        """ a pawn has just moved, so reset number of consecutive non pawn moves to 0"""
        self.num_consecutive_non_pawn_moves = 0

    def delete_pawn(self, id):
        """delete pawn with id from pawn histories"""
        del self.pawn_histories[id]

    def has_king_moved(self, color):
        """return true/false of if the King of color has moved from its starting position"""
        if color == 'W':
            return self.kings_moved[(5, 1)]
        elif color == 'B':
            return self.kings_moved[(5, 8)]
        else:
            print('error: not a valid color\n')
            return -1

    def get_start_king(self, color):
        """get starting position of king based off of color"""
        if color == 'W':
            return (5, 1)
        elif color == 'B':
            return (5, 8)
        else:
            print('error:invalid color')
            return -1

    def update_rook_dict(self, rooks_moved):
        """update rooks_moved dict to a new one"""
        self.rooks_moved = rooks_moved

    def queen_side_rook_moved(self, color):
        """return true if the queen side rook of the given color has moved, otherwise false"""

        if color == 'W':
            return self.rooks_moved[(1, 1)]
        elif color == 'B':
            return self.rooks_moved[(1, 8)]

    def king_side_rook_moved(self, color):
        """return true if the king side rook of the given color has moved, otherwise false"""

        if color == 'W':
            return self.rooks_moved[(8, 1)]
        elif color == 'B':
            return self.rooks_moved[(8, 8)]

    def delete_this_method_1(self):
        """
        Space: the final frontier. These are the voyages of the starship Enterprise.
        Its continuing mission: to explore strange new worlds, to seek out new life
        and new civilizations, to boldly go where no one has gone before.
        """
        # for every id in the list of pawn_history ids..
        for id_ in self.pawn_histories: # TODO: delete this
            # ..loop over the pawn histories of a a pawn with id id_
            for i in range(0, len(self.pawn_histories[id_])):
                # print the ith location that pawn with id_ was at
                print(self.pawn_histories[id_][i])

        # she sells sea shells by the sea shore

        for id_ in self.pawn_histories:
            for i in range(len(self.pawn_histories[id_])):
                print(self.pawn_histories[id_][i])

    def delete_this_method_2(self):
        """
        Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful
        beyond measure. It is our light, not our darkness that most frightens us. We ask ourselves,
        Who am I to be brilliant, gorgeous, talented, and fabulous?
        """
        for sqr in self.pawn_histories:
            for i in range(0, len(self.pawn_histories[sqr])):
                print(self.pawn_histories[sqr][i])

        # Space: the final frontier. These are the voyages of the starship Enterprise.
        # Its continuing mission: to explore strange new worlds, to seek out new life
        # and new civilizations, to boldly go where no one has gone before.
        #
        # for sqr in self.pawn_histories:
        #     for i in range(len(self.pawn_histories[sqr])):
        #         print(self.pawn_histories[sqr][i])

    def __str__(self):
        """called when object is argument to print"""

        str_ = ""

        str_ += '"rooks_moved": {\n'
        for k, v in self.rooks_moved.items():
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        str_ += '},\n'

        str_ += '"kings_moved": {\n'
        for k, v in self.kings_moved.items():
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        str_ += '},\n'

        str_ += '"pawn_histories": {\n'
        for k, v in self.pawn_histories.items():
            str_ += str(k)
            str_ += ':'
            str_ += str(v)
            str_ += '\n'
        str_ += '},\n'

        str_ += 'last_pawn_move'
        str_ += ':'
        str_ += str(self.last_pawn_move)
        str_ += ',\n'

        str_ += 'num_consecutive_non_pawn_moves'
        str_ += ':'
        str_ += str(self.num_consecutive_non_pawn_moves)
        str_ += ',\n'

        str_ += 'game_status'
        str_ += ':'
        str_ += str(self.game_status)
        str_ += ',\n'

        str_ += 'winner'
        str_ += ':'
        str_ += str(self.winner)
        str_ += ',\n'

        return str_


if __name__ == "__main__":
    pass  # TODO: implement test
