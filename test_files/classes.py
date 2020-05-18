from sympy import *
import pygame
from pprint import pprint
import copy
import os
import io
from random import randint
from PIL import Image, ImageOps
import matplotlib.pyplot as plt
from pathlib import Path
import random

imageTable = {}
_uniqueIDs = []
bossPurple = (145, 67, 200)
display_width = 1000
display_height = 1000

operatorList = ['+', '*', '-', '/', '**', '=']


class Route:
    def __init__(self, direction, dest):
        s = self
        s.direction = direction
        s.dest = dest


class Operator(pygame.sprite.Sprite):
    def __init__(self, opString):

        pygame.sprite.Sprite.__init__(self)
        s = self
        s.node = opString

        def loadOpImage(opString):
            """
            Operator class method intrnal to constructor

            all operator images are saved at begining of program, so class 
            only needs to load operator image (not save).
            """
            imageFilePath = imageTable[opString]
            return pygame.image.load(imageTable[opString])

        if s.node == None:
            s.image = None
        else:
            s.image = loadOpImage(opString)
            s.rect = s.image.get_rect()

    def __repr__(self):
        return 'Operator({}) centerx: {}'.format(str(self.node), self.rect.centerx)

    def __str__(self):
        return self.__repr__()

    def update(self, code_str, *args):
        """
        """
        s = self
        exec(code_str)
        return

    def position(self, pos, rectKeyword):

        """
        argument parameter 'pos' is a tuple.
        if no rectKeyword then the elements of tuple are x and y coordinates,
        otherwise use rectKeyword as the keyword argument in get_rect() function
        call.
        """
        if rectKeyword == None:
            x, y = pos[0], pos[1]
            self.rect = self.image.get_rect()
            self.rect.centerx = x
            self.rect.centerx = y
        else:
            exec('self.rect = self.image.get_rect({}={})'.format(rectKeyword, pos))

    # def position(self, pos):
    #    """
    #    """
    #    self.rect = self.image.get_rect(center=pos)

    def get_x_dist_apart(self, leaderX):
        """
        return the x distance between the parameter passed in, and the centerx
        coordinate of self.rect
        """
        return self.rect.centerx - leaderX

    def set_x_dist_to_trav_rel_lead(self, x_dist, x_dest):
        """
        see followTheLeader method.

        x_dest: leader's destinataion
        x_dist: distance between self and leader

        self.x_dist_to_trav_rel_lead is x destination relative to the leader
        """
        s = self
        s.x_dist_to_trav_rel_lead = x_dest - x_dist


def getOpStr(sympyObj):
    """
    """
    if sympyObj.is_Add:
        return '+'
    elif sympyObj.is_Mul:
        return '*'
    elif sympyObj.is_Rational:
        return '/'
    elif sympyObj.is_Pow:
        return '**'


def saveOperatorImage(op):
    """
    (#1): create the entry
    (#2): value of the dict entry is an file path to a image where the 
          name of the image is the id of the dict entry
    (#3): image is created
    (#4): image object is loaded in from pic specified in dict
    (#5): the image was already put in the table, so simply upload it.
    """

    def _saveOperatorImage(strOp):
        """
        modified from:
        https://stackoverflow.com/questions/36191953/matplotlib-save-only-text-without-whitespace 
        author: martain evans
        (#6): here we are getting text of current operator in Latex form
        (#7): create a matplotlib figure (window pops up)
        (#8): draw the Latex on the figure at the specified coordinates
        (#9): initially the figure has white background
        (#10): an xy plane is shown by default, turn it off
        (#11): make text fit inside the figure
        """

        lat = latex(op)
        fig = plt.figure()
        t = plt.text(0.001, 0.001, r"$%s$" % lat, fontsize=30)  # 8
        fig.patch.set_facecolor('white')  # 9
        plt.axis('off')  # 10
        plt.tight_layout()  # 11

        with io.BytesIO() as png_buf:
            plt.savefig(png_buf, transparent=True, bbox_inches='tight', pad_inches=0)
            png_buf.seek(0)
            image = Image.open(png_buf)
            image.load()
            inverted_image = ImageOps.invert(image.convert("RGB"))
            cropped = image.crop(inverted_image.getbbox())
            cropped.save(imageTable[strOp])

    if str(op) not in imageTable.keys():
        id_ = random.randint(10000, 99999)  # 1 is lowest number
        while id_ in _uniqueIDs:
            id_ = random.randint(10000, 99999)  # 1 is lowest number

        imageTable[str(op)] = "uniqueSyms/{}.png".format(str(id_))  # 2
        _saveOperatorImage(str(op))  # 3

    return


def mkDirUniqueSyms(dirName):
    """
    makes directory named uniqueSyms that contains subdirectories each with a 
    sympy image
    """
    os.mkdir('uniqueSyms')


class Root(pygame.sprite.Sprite):
    def __init__(self, expr, operator=None):

        def buildGroups():
            """
            method internal to Root class constructor.

            Every node n in the tree does a depth first traversal of the
            subtree where n is root. every node n calls the buildSpriteGroup()
            method of each of its children. leaf nodes buildSpriteGroup() method
            return a list of lenght 1 holding a reference to themself as soon 
            as the method is entered. n that are non-leaf nodes return a list 
            consisting of:

            a. everything that each of n's child returned.
            b. the operator attribute of n appearing the
               right number of times.
               ex: 2*4*x 
               returns [Node(4), Node(2), Node(x), Operator(*), Operator(*)]

            """
            s.exprTree.buildSpriteGroup()

        def oraganizeGroups():
            s.exprTree.organizeGroup()

        # __init__ attributes:
        pygame.sprite.Sprite.__init__(self)
        s = self
        s.expr = expr
        s.exprTree = Node(expr, self)
        s.actionList = []
        buildGroups()

        # note Root object does not need its own OrderedUpdates attribute unless it is an operation
        # get every leaf in exprTree sprite group it to operation, along with operator
        if operator != None:
            s.op = operator
            s.operation = pygame.sprite.OrderedUpdates(Operator(s.op))
            s.operation.add(pygame.sprite.Group.copy(s.exprTree.leafsAndOps))
        else:
            s.operation = None

    def setOperationCoords(self, startx, starty, mul_pow_offset=None):
        """
        (#1): set position first leaf in expression
        (#2): if the leaf position we about to set is '*', offset of 20.
        (#3): same as number 2 but '**'
        (#4): if the last leaf position set was '*', then offest of 20.
        (#5): same as number 4 but '**'
        """
        s = self

        if mul_pow_offset == None:
            mul_pow_offset = 10

        if len(s.operation._spritelist) > 0:

            s.operation._spritelist[0].position((startx, starty), rectKeyword='midleft')  # 1
            posX = s.operation._spritelist[0].rect.right
            posY = s.operation._spritelist[0].rect.centery

            for i in range(1, len(s.operation._spritelist)):
                if (s.operation._spritelist[i].node == '*'  # 2
                        or s.operation._spritelist[i].node == '**'  # 3
                        or s.operation._spritelist[i - 1].node == '*'  # 4
                        or s.operation._spritelist[i - 1].node == '**'):

                    posX = s.operation._spritelist[i - 1].rect.right + mul_pow_offset
                    posY = s.operation._spritelist[i - 1].rect.centery
                else:
                    posX = s.operation._spritelist[i - 1].rect.right + 20
                    posY = s.operation._spritelist[i - 1].rect.centery

                s.operation._spritelist[i].position((posX, posY), rectKeyword='midleft')
                # , rectKeyword='midleft'
        else:
            s.exprTree.position((startx, starty))

    def setCoords(self, startx, starty, mul_pow_offset=None):
        """
        (#1): set position first leaf in expression
        (#2): if the leaf position we about to set is '*', offset of 20.
        (#3): same as number 2 but '**'
        (#4): if the last leaf position set was '*', then offest of 20.
        (#5): same as number 4 but '**'
        """
        s = self

        if mul_pow_offset == None:
            mul_pow_offset = 10

        if len(s.exprTree.leafsAndOps._spritelist) > 0:

            s.exprTree.leafsAndOps._spritelist[0].position((startx, starty), rectKeyword='midleft')  # 1
            posX = s.exprTree.leafsAndOps._spritelist[0].rect.right
            posY = s.exprTree.leafsAndOps._spritelist[0].rect.centery

            for i in range(1, len(s.exprTree.leafsAndOps._spritelist)):
                if (s.exprTree.leafsAndOps._spritelist[i].node == '*'  # 2
                        or s.exprTree.leafsAndOps._spritelist[i].node == '**'  # 3
                        or s.exprTree.leafsAndOps._spritelist[i - 1].node == '*'  # 4
                        or s.exprTree.leafsAndOps._spritelist[i - 1].node == '**'):

                    posX = s.exprTree.leafsAndOps._spritelist[i - 1].rect.right + mul_pow_offset
                    posY = s.exprTree.leafsAndOps._spritelist[i - 1].rect.centery
                else:
                    posX = s.exprTree.leafsAndOps._spritelist[i - 1].rect.right + 20
                    posY = s.exprTree.leafsAndOps._spritelist[i - 1].rect.centery

                s.exprTree.leafsAndOps._spritelist[i].position((posX, posY), rectKeyword='midleft')
                # , rectKeyword='midleft'
        else:
            s.exprTree.position((startx, starty))


class Node(pygame.sprite.Sprite):
    def __init__(self, node, parent):
        """
        """
        pygame.sprite.Sprite.__init__(self)
        s = self
        s.node = node
        s.parent = parent
        s._children = []
        s.leafsAndOps = pygame.sprite.OrderedUpdates()
        s.image = None
        s.rect = None
        s.operators = []
        s.appList = []

        if not s.node.is_Number:
            s.degree = degree(s.node)
        else:
            s.degree = 0

        if s.node.args != ():  # if node DOES have args

            for child in s.node.args:
                self._children.append(Node(child, s))

            opCount = len(s.node.args) - 1

            for i in range(opCount):
                s.operators.append(Operator(getOpStr(s.node)))

        else:  # leaf
            s.saveImage(s.node)  # only want to save pictures of leaf nodes
            s.loadImage()

    def get_x_dist_apart(self, leaderX):
        """
        return the x distance between the parameter passed in, and the centerx
        coordinate of self.rect
        """
        return self.rect.centerx - leaderX

    def update(self, code_str, *args):
        """
        """
        s = self
        exec(code_str)
        return

    def buildSpriteGroup(self):
        """
        see class Root __init__ inner method buildGroups
        every group consists of the leaf nodes that are below that node and 
        the operator of the node.
        """
        s = self
        if s.node.args == ():
            s.leafsAndOps.add(self)
            return [self]

        for child in s._children:
            spriteList = child.buildSpriteGroup()
            s.leafsAndOps.add(*spriteList)
            if len(s.operators) > 0:
                op = s.operators.pop(0)
                s.leafsAndOps.add(op)

        return s.leafsAndOps._spritelist

    def moveTo(self, x, y):
        """
        """
        self.rect.move_ip(x, y)

    def position(self, pos, rectKeyword=None):
        """
        argument parameter 'pos' is a tuple.
        if no rectKeyword then the elements of tuple are x and y coordinates,
        otherwise use rectKeyword as the keyword argument in get_rect() function
        call.
        """
        if rectKeyword == None:
            x, y = pos[0], pos[1]
            self.rect = self.image.get_rect()
            self.rect.centerx = x
            self.rect.centery = y
        else:
            exec('self.rect = self.image.get_rect({}={})'.format(rectKeyword, pos))

    def loadImage(self):
        self.image = pygame.image.load(imageTable[str(self.node)])

    def saveImage(self, node):
        """
        (#1): create the entry
        (#2): value of the dict entry is an file path to a image where the 
              name of the image is the id of the dict entry
        (#3): image is created
        (#4): image object is loaded in from pic specified in dict
        (#5): the image was already put in the table, so simply upload it.
        """
        s = self

        def _saveSymbolImage(strNode):
            """
            modified from:
            https://stackoverflow.com/questions/36191953/matplotlib-save-only-text-without-whitespace 
            author: martain evans
            (#5): 
            (#6): here we are getting text of current s.node in Latex form
            (#7): create a matplotlib figure (window pops up)
            (#8): draw the Latex on the figure at the specified coordinates
            (#9): initially the figure has white background
            (#10): an xy plane is shown by default, turn it off
            (#11): make text fit inside the figure
            """

            lat = latex(s.node)  # 6
            fig = plt.figure()  # 7
            t = plt.text(0.001, 0.001, r"$%s$" % lat, fontsize=30)  # 8
            fig.patch.set_facecolor('white')  # 9
            plt.axis('off')  # 10
            plt.tight_layout()  # 11

            with io.BytesIO() as png_buf:
                plt.savefig(png_buf, transparent=True, bbox_inches='tight', pad_inches=0)
                png_buf.seek(0)
                image = Image.open(png_buf)
                image.load()
                inverted_image = ImageOps.invert(image.convert("RGB"))
                cropped = image.crop(inverted_image.getbbox())
                cropped.save(imageTable[strNode])
                # to do: find way to close figure that doesn't result in error.

        if str(s.node) not in imageTable.keys():
            id_ = random.randint(10000, 99999)
            while id_ in _uniqueIDs:
                id_ = random.randint(10000, 99999)
            _uniqueIDs.append(id_)

            imageTable[str(s.node)] = "uniqueSyms/{}.png".format(id_)  # 2
            _saveSymbolImage(str(s.node))  # 3

    def __repr__(self):
        return "Node({}) centerx:{} centery:{}".format(str(self.node), self.rect.centerx, self.rect.centery)
        # return "Node({}).format(str(self.node))

    def __str__(self):
        return self.__repr__()


class Equation:
    def __init__(self, lhs, rhs):
        s = self

        # left off here. TODO: Figure out how to know where to start the = sign and
        # the rhs of the equation.

        s.lhs = Root(lhs)
        s._equalto = Operator('=')
        s.rhs = Root(rhs)

        s.opsBothSides = []
        s.termList = []
        s.quantities = []  # stores termList copies
        s.mostRecentLhs = None
        s.mostRecentRhs = None
        s.sympyRhsCopy = None
        s.sympyRhsHistory = []
        s.sympyLhsHistory = []
        s.codeList = []
        s.currentLhs = None
        s.currentRhs = None
        s.current_operation_lhs = None
        s.current_operation_lhs = None
        s.term_w_matching_degree = ""
        s.screen = None

    def setTermList(self, n):

        if n.node.is_Add:

            for child in n._children:
                self.termList.append(child.node)

        for child in n._children:
            self.setTermList(child)

        return

    def flipSides(self):
        """
        makes self.mostRecentLhs and self.mostRecentRhs switch places
        """
        s = self
        s.mostRecentLhs, s.mostRecentRhs = s.mostRecentRhs, s.mostRecentLhs
        s.updateHistory()

    def updateHistory(self):
        s = self
        s.sympyLhsHistory.append(Root(copy.deepcopy(s.mostRecentLhs)))
        s.sympyRhsHistory.append(Root(copy.deepcopy(s.mostRecentRhs)))

    def performOperation(self, op, value):
        """
        operation of value value applied both sides (substract 4x, add 2y, etc)
        first recored the operation (for sprite objects animation) then perform
        op on sympy objects on both sides (most recent expressions).
        """
        s = self
        s.opsBothSides.append((Root(value, op), Root(value, op)))  # one operation, but need to store 2 images.
        code_ = "s.mostRecentLhs " + op + "=" + " value"
        exec(code_)
        code_ = "s.mostRecentRhs " + op + "=" + " value"
        exec(code_)
        return


class PolyD1(Equation):
    def __init__(self, lhs, rhs):

        # TODO: implement method that sets up steps for the animation of collecting
        # like terms. This is done before the planSteps method is called.

        def type1GetTerm(side, var):
            """
            Type1(Equation) constructor inner method 

            method called from if block, method assumes that:
            a. side is a tree of nodes containing sympy objects 
            b. side contains only one type of variable
            c. that side contains a symbol that equals var (var in constructor)
            d. that side is a ploynomial of degree 1
            e. like terms were collected on both sides of the equation before
               method was called.

            """
            if side.is_Mul and side.has(var):
                return side
            else:
                for arg in side.args:

                    if arg.has(var):
                        return arg

                return None

        def type1GetNum(side):
            """
            Type1(Equation) constructor inner method 

            """
            for arg in side.args:

                if arg.is_Number:
                    return arg

            return None

        def getSteps():
            """
            In this method we are determining the operation to be 
            performed to both sides, recording the operation, and then 
            performing it to COPIES of lhs and rhs that are then stored in the
            lists sympyRhsHistory and sympyLhsHistory


            Type1(Equation) contstuctor inner method

            like terms should be collected on both sides of the equation before
            this method is called.
                    
            (#1): the variable is not in lhs and not in rhs
            (#2): lsv and not rsv
            (#3): rsv and not lsv
            (#4): lsv and rsv
        
            """

            def var_on_L_and_not_on_R():
                """
                internal function of internal function of the Type1(Equation)
                constructor
                """
                lhsNum = type1GetNum(s.mostRecentLhs)
                if lhsNum != None:
                    s.performOperation('-', lhsNum)
                    s.updateHistory()

                lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                lhsNum = type1GetNum(lhsTerm)
                if lhsNum != 1:
                    s.performOperation('/', lhsNum)
                    s.updateHistory()

            def var_on_R_and_not_on_L():
                """
                internal function of internal function of the Type1(Equation)
                constructor
                """
                rhsNum = type1GetNum(s.mostRecentRhs)
                if rhsNum != None:
                    s.performOperation('-', rhsNum)
                    s.updateHistory()

                rhsTerm = type1GetTerm(s.mostRecentRhs, var)
                rhsNum = type1GetNum(rhsTerm)

                if rhsTerm != 1:
                    s.performOperation('/', rhsTerm)
                    s.updateHistory()
                    # s.flipSides()

            def var_on_both_L_and_R():
                """
                currently successfull
                """

                lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                rhsTerm = type1GetTerm(s.mostRecentRhs, var)

                if (lhsTerm - rhsTerm) == 0:
                    print("error, invalid equation")

                elif Gt(lhsTerm.subs(var, 1), rhsTerm.subs(var, 1)):
                    s.performOperation('-', rhsTerm)
                    s.updateHistory()

                elif Lt(lhsTerm.subs(var, 1), rhsTerm.subs(var, 1)):
                    s.performOperation('-', rhsTerm)
                    s.updateHistory()
                    # s.flipSides() # flip sides for (animation later)

                lhsNumber = type1GetNum(s.mostRecentLhs)
                if lhsNumber != None:
                    s.performOperation('-', lhsNumber)
                    s.updateHistory()

                lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                lhsNum = lhsTerm.subs(var, 1)  # we know lone Mul object at this point
                if lhsNum != 1:  # if term in not lone x
                    s.performOperation('/', lhsNum)
                    s.updateHistory()

            if len(s.lhs.exprTree.node.free_symbols) > 0:
                L = list(s.lhs.exprTree.node.free_symbols)
                var = L[0]
            elif len(s.rhs.exprTree.node.free_symbols) > 0:
                L = list(s.rhs.exprTree.node.free_symbols)
                var = L[0]
            else:
                print('invalid equation')

            s.mostRecentLhs = copy.deepcopy(s.lhs.exprTree.node)
            s.mostRecentRhs = copy.deepcopy(s.rhs.exprTree.node)
            s.updateHistory()

            if not s.mostRecentLhs.has(var) and not s.mostRecentRhs.has(var):  # 1
                print("error: invalid equation")

            elif s.mostRecentLhs.has(var) and not s.mostRecentRhs.has(var):  # 2
                var_on_L_and_not_on_R()

            elif not s.mostRecentLhs.has(var) and s.mostRecentRhs.has(var):  # 3
                var_on_R_and_not_on_L()

            elif s.mostRecentLhs.has(var) and s.mostRecentRhs.has(var):  # 4
                var_on_both_L_and_R()

        Equation.__init__(self, lhs, rhs)
        s = self

        getSteps()

    def findMatchingDegree(self, operand, side):  # -> Node
        if len(side.exprTree._children) > 0:
            for child in side.exprTree._children:
                if child.degree == operand.exprTree.degree:
                    return child

        elif side.exprTree.degree == operand.exprTree.degree:
            return side.exprTree

        else:
            return None

    def findFurthestRight(self, side):
        s = self
        a = 0
        furR = None
        for leaf in side.exprTree.leafsAndOps._spritelist:
            if leaf.rect.right > a:
                a = leaf.rect.right
                furR = leaf

        return furR

    def findRoute(self, start, dest, axis):

        s = self
        route = None

        if axis == 'x':
            # find the middle of term with matching degree:

            if dest - start > 0:
                route = Route('+x', dest)
            else:
                route = Route('-x', dest)

        elif axis == 'y':

            if dest - start > 0:
                route = Route('+y', dest)
            else:
                route = Route('-y', dest)

        return route

    def set_routes(self, operation, side):
        """
        goal of this method is to intialize the leader and the route for each 
        operation.
        """

        def set_slide_in(operation, side):
            """
            goal is to move the the operation (operator and operand being performed) 
            to align with the middle of expression (lhs or rhs of equation).
            """

            s.term_w_matching_degree = s.findMatchingDegree(operation, side)  # 3

            if s.term_w_matching_degree != None:

                indx1 = ((len(
                    operation.exprTree.leafsAndOps._spritelist) + 1) // 2) - 1  # we want the center of just the operand, not the operator
                indx2 = ((len(s.term_w_matching_degree.leafsAndOps._spritelist) + 1) // 2) - 1

                leader = operation.exprTree.leafsAndOps._spritelist[indx1]

                goal_x = s.term_w_matching_degree.leafsAndOps._spritelist[indx2].rect.centerx

                # add where the leader is going and
                route = s.findRoute(leader.rect.centerx, goal_x, 'x')
                operation.actionList.append((leader, route))

            else:
                indx1 = ((len(operation.operation._spritelist) + 1) // 2) - 1
                indx2 = ((len(side.exprTree.leafsAndOps._spritelist) + 1) // 2) - 1

                leader = operation.operation._spritelist[indx1]
                # operation.leader = leader

                goal_x = s.side.leafsAndOps._spritelist[indx2].rect.centerx

                # add where the leader is going and
                route = s.findRoute(leader.rect.centerx, goal_x, 'x')
                operation.actionList.append((leader, route))

        def set_move_up(operation, side):
            """
            """

            if s.term_w_matching_degree != None:
                goal_y = s.term_w_matching_degree.leafsAndOps._spritelist[
                             0].rect.bottom - 3  # any leaf node works, they all share the same bottom (i.e. y) coordinate
                leader, route = operation.actionList[-1]
                route = s.findRoute(leader.rect.top, goal_y, 'y')
                operation.actionList.append((leader, route))
            else:
                goal_y = side.rect.bottom - 3
                leader, route = operation.actionList[-1]
                route = s.findRoute(leader.rect.top, goal_y, 'y')
                operation.actionList.append((leader, route))

        # method calls:
        s = self
        set_slide_in(operation, side)
        set_move_up(operation, side)

    def drawScene(self):
        """
        draw everything: currentLhs, currentRhs, current_operation_lhs, current_operation_rhs
        """
        s = self
        s.screen.fill(bossPurple)

        s.currentRhs.exprTree.leafsAndOps.draw(s.screen)
        s.currentLhs.exprTree.leafsAndOps.draw(s.screen)
        s.screen.blit(s._equalto.image, s._equalto.rect)
        s.current_operation_lhs.operation.draw(s.screen)
        s.current_operation_rhs.operation.draw(s.screen)

    def setInit(self, i):
        """
        sets the sprites to their initial positions
        
        """

        """
        internal method #2:
        """

        def setEquationPositions():
            startx = display_height * 0.1
            starty = display_width * 0.5

            # initialize the lhs positions:
            s.sympyLhsHistory[i].setCoords(startx, starty)

            # set start position for equal sign:
            if s.sympyLhsHistory[i].exprTree.node.args != ():
                furthestRight = s.findFurthestRight(s.sympyLhsHistory[i])
                startx = furthestRight.rect.right + 40
                starty = furthestRight.rect.centery
            else:  # leaf
                startx = s.sympyLhsHistory[i].exprTree.rect.centerx + 40
                starty = s.sympyLhsHistory[i].exprTree.rect.centery

            # set the equal sign position:
            s._equalto.position((startx, starty), rectKeyword='center')

            # set start position for rhs:
            startx = s._equalto.rect.centerx + 50
            starty = s._equalto.rect.centery

            # set the rhs positions:
            s.sympyRhsHistory[i].setCoords(startx, starty)

            return

        """
        internal method #3:
        """

        def setOpBothSidesPosition():
            """
            """
            # for lhs set to the left corner:
            s.opsBothSides[i][0].setOperationCoords(display_width * 0.01, display_height * 0.8)

            # for rhs set to the right corner:
            s.opsBothSides[i][1].setOperationCoords(display_width * 0.99, display_height * 0.8)

        # SetInit attributes:
        s = self
        setEquationPositions()
        setOpBothSidesPosition()
        return

    def play(self):
        """
        for every configAnimation method decide what grouping level to
        upload images, from top level grouping (upload entire equation as 1
        image.) to bottom level (every char in equation is uploaded as 
        seperate image.) based on the animations to be performed.
        """
        s = self
        # pygame.init()
        s.screen = pygame.display.set_mode((display_width, display_height))
        pygame.display.set_caption('MathPartner')
        clock = pygame.time.Clock()

        for i in range(len(s.opsBothSides)):
            s.setInit(i)
            s.set_routes(s.opsBothSides[i][0], s.sympyLhsHistory[i])
            s.set_routes(s.opsBothSides[i][1], s.sympyRhsHistory[i])

        count = 0
        run = True
        while run:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    run = False

            s.screen.fill(bossPurple)

            while len(s.sympyLhsHistory) > 0 and len(s.sympyRhsHistory) > 0 and len(s.opsBothSides) > 0:

                s.currentLhs = s.sympyLhsHistory.pop(0)
                s.currentRhs = s.sympyRhsHistory.pop(0)
                s.current_operation_lhs, s.current_operation_rhs = s.opsBothSides.pop(0)

                lhs_leader, lhs_route = s.current_operation_lhs.actionList.pop(0)
                rhs_leader, rhs_route = s.current_operation_rhs.actionList.pop(0)

                s.drawScene()  # draw everything
                pygame.display.update()
                clock.tick(60)

                while lhs_leader.rect.centerx != lhs_route.dest or rhs_leader.rect.centerx != rhs_route.dest:

                    # lhs:
                    if lhs_route.direction == '+x' and lhs_leader.rect.centerx != lhs_route.dest:
                        s.current_operation_lhs.operation.update('self.rect.centerx += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    elif lhs_route.direction == '-x' and lhs_leader.rect.centerx != lhs_route.dest:
                        s.current_operation_lhs.operation.update('self.rect.centerx -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    # rhs:
                    if rhs_route.direction == '+x' and rhs_leader.rect.centerx != rhs_route.dest:
                        s.current_operation_rhs.operation.update('self.rect.centerx += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    elif rhs_route.direction == '-x' and rhs_leader.rect.centerx != rhs_route.dest:
                        s.current_operation_rhs.operation.update('self.rect.centerx -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                # get next actions:
                lhs_leader, lhs_route = s.current_operation_lhs.actionList.pop(0)
                rhs_leader, rhs_route = s.current_operation_rhs.actionList.pop(0)

                while lhs_leader.rect.top != lhs_route.dest or rhs_leader.rect.top != rhs_route.dest:

                    # lhs:
                    if lhs_route.direction == '+y' and lhs_leader.rect.top != lhs_route.dest:
                        s.current_operation_lhs.operation.update('self.rect.top += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    elif lhs_route.direction == '-y' and lhs_leader.rect.top != lhs_route.dest:
                        s.current_operation_lhs.operation.update('self.rect.top -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    # rhs:
                    if rhs_route.direction == '+y' and rhs_leader.rect.top != rhs_route.dest:
                        s.current_operation_rhs.operation.update('self.rect.top += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                    elif rhs_route.direction == '-y' and rhs_leader.rect.top != rhs_route.dest:
                        s.current_operation_rhs.operation.update('self.rect.top -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)

                s.drawScene()  # draw everything
                pygame.display.update()
                clock.tick(90)


# s.configCode() #build the code statements to be executed
# s.sympyLhsHistory.pop(0); s.sympyRhsHistory.pop(0)
def set_to_corner(self, operation):
    """
    initialize the operator and operand to be performed in the corner of screen.
    """
    operation.setCoords(5, 400)

# for _sprite in s.currentLhs.exprTree.leafsAndOps._spritelist:
#    s.screen.blit(_sprite.image, _sprite.rect)

# for _sprite in s.currentRhs.exprTree.leafsAndOps._spritelist:
#    s.screen.blit(_sprite.image, _sprite.rect)

# for _sprite in s.current_operation_lhs.operation._spritelist:
#    s.screen.blit(_sprite.image, _sprite.rect)

# for _sprite in s.current_operation_rhs.operation._spritelist:
#    s.screen.blit(_sprite.image, _sprite.rect)
