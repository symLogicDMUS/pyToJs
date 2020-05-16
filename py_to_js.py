from get_lines import get_lines
from get_line_data import get_line_data
from temp.get_first_indent import get_first_indent
from temp.get_blocks import get_blocks
from temp.ending_curly_braces import ending_curly_braces
from temp.refactor_conditionals import refactor_conditionals
from temp.refactor_methods import refactor_methods
from temp.refactor_classes import refactor_classes
from temp.refactor_identifiers import refactor_identifiers
from snake_to_camel import snake_to_camel
from temp.to_lines import to_lines
from pprint import pprint


def py_to_js(file_name, multiples):
    """ """
    lines = get_lines(file_name)
    line_data = get_line_data(lines)
    num_spaces = get_first_indent(line_data)
    blocks = get_blocks(0, num_spaces, line_data, [])
    blocks = ending_curly_braces(blocks, multiples)
    lines = refactor_identifiers(blocks)
    lines = snake_to_camel(lines)
    line_data = get_line_data(lines)
    line_data = refactor_conditionals(line_data)
    line_data = refactor_methods(line_data)
    line_data = refactor_classes(line_data)
    lines = to_lines(line_data)
    pprint(lines)
    # f = open('./result_files/{}.js'.format(file_name), 'w')
    # f.writelines(lines)
    # f.close()


if __name__ == "__main__":
    py_to_js('JsonRecords', 4)
