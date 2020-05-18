import os
from helpers.get_lines import get_lines
from helpers.get_line_data import get_line_data
from helpers.get_indexs_cflc import get_indexs_cflc
from helpers.get_future_brace_locations import get_future_brace_locations
from helpers.add_closing_brace import add_closing_brace
from helpers.re_index import re_index
from helpers.get_indexs_cb import get_indexs_cb
from helpers.get_cflc_indexs_sorted_by_indent import get_cflc_indexs_sorted_by_indent
from helpers.update_cb_indents import update_cb_indents
from helpers.cb_loc_add_check_col import cb_loc_add_check_col
from helpers.refactor_conditionals import refactor_conditionals
from helpers.refactor_methods import refactor_methods
from helpers.refactor_classes import refactor_classes
from helpers.refactor_imports import refactor_imports
from helpers.refactor_identifiers import refactor_identifiers
from helpers.refactor_comments import refactor_comments
from helpers.refactor_doc_strings import refactor_doc_strings
from helpers.refactor_for_range import refactor_for_range
from helpers.refactor_for_in import refactor_for_in
from helpers.refactor_dict_methods import refactor_dict_methods
from helpers.refactor_in_operator import refactor_in_operator
from helpers.refactor_tuple_decs import refactor_tuple_decs
from helpers.refactor_none_object import refactor_none_object
from helpers.refactor_double_equals import refactor_double_equals
from helpers.refactor_true_and_false import refactor_true_and_false
from helpers.snake_to_camel import snake_to_camel


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
    line_data = refactor_comments(line_data)
    line_data = refactor_doc_strings(line_data)
    line_data = refactor_for_range(line_data)
    line_data = refactor_for_in(line_data)
    line_data = refactor_dict_methods(line_data)
    line_data = refactor_in_operator(line_data)
    line_data = refactor_tuple_decs(line_data)
    line_data = refactor_none_object(line_data)
    line_data = refactor_double_equals(line_data)
    line_data = refactor_true_and_false(line_data)
    lines = list(map(lambda line: line[2], line_data))
    lines = snake_to_camel(lines)
    if 'result_files' not in os.listdir('.'):
        os.chdir('..')
    f = open('./result_files/{}.js'.format(file_name), 'w')
    f.writelines(lines)
    f.close()


if __name__ == "__main__":
    py_to_js('JsonRecords', 4)
