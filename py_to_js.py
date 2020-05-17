from get_lines import get_lines
from get_line_data import get_line_data
from get_indexs_cflc import get_indexs_cflc
from get_future_brace_locations import get_future_brace_locations
from add_closing_brace import add_closing_brace
from re_index import re_index
from get_indexs_cb import get_indexs_cb
from get_cflc_indexs_sorted_by_indent import get_cflc_indexs_sorted_by_indent
from update_cb_indents import update_cb_indents
from cb_loc_add_check_col import cb_loc_add_check_col
from refactor_conditionals import refactor_conditionals
from refactor_methods import refactor_methods
from refactor_classes import refactor_classes
from refactor_imports import refactor_imports
from refactor_identifiers import refactor_identifiers
from snake_to_camel import snake_to_camel
from print_list import print_list


def py_to_js(file_name, multiples):
    """ """
    lines = get_lines(file_name)
    line_data, line_data_dict = get_line_data(lines)
    cflc_indexs = get_indexs_cflc(line_data)
    cb_locations = get_future_brace_locations(line_data, line_data_dict, cflc_indexs)
    line_data = add_closing_brace(cb_locations, line_data, line_data_dict)
    ine_data_dict, line_data = re_index(line_data)
    cb_locations = get_indexs_cb(line_data)
    cb_locations = cb_loc_add_check_col(cb_locations)
    cflc_indexs = get_cflc_indexs_sorted_by_indent(line_data)
    line_data = update_cb_indents(cflc_indexs, cb_locations, line_data)
    line_data = refactor_conditionals(line_data)
    line_data = refactor_methods(line_data)
    line_data = refactor_classes(line_data)
    line_data = refactor_imports(line_data)
    line_data, line_data_dict = refactor_identifiers(line_data, file_name)
    print_list(line_data)
    # other refactors go here
    lines = list(map(lambda line: line[2], line_data))
    lines = snake_to_camel(lines)
    f = open('./result_files/{}.js'.format(file_name), 'w')
    f.writelines(lines)
    f.close()


if __name__ == "__main__":
    py_to_js('JsonRecords', 4)
