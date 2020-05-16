from pprint import pprint


def get_child_lines_helper(block):
    """ """
    if block['child'] != {}:
        block['lines'].extend(get_child_lines_helper(block['child']))
    return block['lines']


def get_child_lines(blocks):
    for i in range(len(blocks)):
        if blocks[i]['child'] != {}:
            blocks[i]['lines'].extend(get_child_lines_helper(blocks[i]['child']))
    return blocks


if __name__ == "__main__":
    blocks =\
    [{'child': {'child': {},
                'lines': [(12, '            f = open(file, "r")\n'),
                          (12, '            json_data = f.read()\n'),
                          (12, '            records = json.loads(json_data)\n'),
                          (12,
                           '            json.dumps(records, indent=4, '
                           'sort_keys=False)\n'),
                          (12, '            f.close()\n')]},
      'lines': [(8, '        if j_records is None:\n')]},
     {'child': {'child': {'child': {},
                          'lines': [(12, '            f = open(file, "r")\n'),
                                    (12, '            json_data = f.read()\n'),
                                    (12,
                                     '            records = '
                                     'json.loads(json_data)\n'),
                                    (12,
                                     '            json.dumps(records, indent=4, '
                                     'sort_keys=False)\n'),
                                    (12, '            f.close()\n')]},
                'lines': [(8, '        if j_records is None:\n')]},
      'lines': [(4,
                 '    """contains info for new or saved game relevant to perfoming '
                 'a castle or en_passant"""\n'),
                (1, '\n'),
                (4, '    def __init__(self, file, board, j_records=None):\n'),
                (1, '\n')]},
     {'child': {'child': {'child': {'child': {},
                                    'lines': [(12,
                                               '            f = open(file, "r")\n'),
                                              (12,
                                               '            json_data = '
                                               'f.read()\n'),
                                              (12,
                                               '            records = '
                                               'json.loads(json_data)\n'),
                                              (12,
                                               '            json.dumps(records, '
                                               'indent=4, sort_keys=False)\n'),
                                              (12, '            f.close()\n')]},
                          'lines': [(8, '        if j_records is None:\n')]},
                'lines': [(4,
                           '    """contains info for new or saved game relevant to '
                           'perfoming a castle or en_passant"""\n'),
                          (1, '\n'),
                          (4,
                           '    def __init__(self, file, board, '
                           'j_records=None):\n'),
                          (1, '\n')]},
      'lines': [(0, 'from custom_except import *\n'),
                (0, 'from coordType.to_xy import to_xy\n'),
                (0, 'from coordType.to_rankfile import to_rankfile\n'),
                (0, 'from getters.get_piece_type import get_piece_type\n'),
                (0, 'from getters.get_piece_types import get_piece_types\n'),
                (0, 'from misc.g_status_types import *\n'),
                (0, 'from misc.JsonRecordError import JsonRecordError\n'),
                (0, 'import json\n'),
                (1, '\n'),
                (1, '\n'),
                (0, 'class JsonRecords(object):\n')]}
     ]
    pprint(get_child_lines(blocks))