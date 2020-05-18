import { * } from "sympy";
import "pygame";
import { pprint } from "pprint";
import "copy";
import "os";
import "io";
import { randint } from "random";
import { Image } from "PIL";
import "matplotlib/pyplot";
import { Path } from "pathlib";
import "random";
let imageTable = {}
let UniqueIDlet s = []
let bossPurple = (145, 67, 200)
let displayWidth = 1000
displayHeighlet t = 1000
let operatorList = ['+', '*', '-', '/', '**', '=']
export class Route {
    constructor(direction, dest) {
        s = this
        s.let direction = direction
        s.let dest = dest
    }
}
export class Operator(pygame.sprite.Sprite) {
    constructor(opString) {
        pygame.sprite.Sprite._Init__(this)
        s = this
        s.let node = opString
        export function loadOpImage(opString) {
            """
export             Operator class method intrnal to constructor
export             all operator images are saved at begining of program, so class 
            only needs to load operator image (not save).
            """
            let imageFilePath = imageTable[opString]
            return pygame.image.load(imageTable[opString])
        }
        if (s.node == None) {
            s.let image = None
        }
        else {
            s.image = loadOpImage(opString)
            s.let rect = s.image.getRect()
        }
    }
    _Repr__() {
        return 'Operator({}) centerx: {}'.format(str(this.node), this.rect.centerx)
    }
    _Str__() {
        return this._Repr__()
    }
    update(codeStr, *args) {
        """
        """
        s = this
        exec(codeStr)
        return
    }
    position(pos, rectKeyword) {
        """
        argument parameter 'pos' is a tuple.
        if no rectKeyword then the elements of tuple are x and y coordinates,
        otherwise use rectKeyword as the keyword argument in getRect() function
        call.
        """
        if (rectKeyword == None) {
            x, let y = pos[0], pos[1]
            this.rect = this.image.getRect()
            this.rect.let centerx = x
            this.rect.centerx = y
        }
        else {
            exec('this.rect = this.image.getRect({}={})'.format(rectKeyword, pos))
        }
    }
    # position(pos) {
    #    """
    #    """
    #    this.rect = this.image.getRect(center=pos)
    getXDistApart(leaderX) {
        """
        return the x distance between the parameter passed in, and the centerx
        coordinate of this.rect
        """
        return this.rect.centerx - leaderX
    }
    setXDistToTravRelLead(xDist, xDest) {
        """
        see followTheLeader method.
        xDest: leader's destinataion
        xDist: distance between this and leader
        this.xDistToTravRelLead is x destination relative to the leader
        """
        s = this
        s.let xDistToTravRelLead = xDest - xDist
    }
}
export function getOpStr(sympyObj) {
    """
    """
    if (sympyObj.is_Add) {
        return '+'
    }
    else if (sympyObj.is_Mul) {
        return '*'
    }
    else if (sympyObj.is_Rational) {
        return '/'
    }
    else if (sympyObj.is_Pow) {
        return '**'
    }
}
export function saveOperatorImage(op) {
    """
    (#1): create the entry
    (#2): value of the dict entry is an file path to a image where the 
          name of the image is the id of the dict entry
    (#3): image is created
    (#4): image object is loaded in from pic specified in dict
    (#5): the image was already put in the table, so simply upload it.
    """
    export function SaveOperatorImage(strOp) {
        """
        modified from:
        https://stackoverflow.com/questions/36191953/matplotlib-save-only-text-without-whitespace 
        author: martain evans
        (#6): here we are getting text of current operator in Latex form
        (#7): create a matplotlib figure (window pops up)
        (#8): draw the Latex on the figure at the specified coordinates
        (#9): initially the figure has white background
        (#10) { an xy plane is shown by export functionault, turn it off
        (#11): make text fit inside the figure
        """
        let lat = latex(op)
        let fig = plt.figure()
        t = plt.text(0.001, 0.001, r"$%s$" % lat, fontsize=30)  # 8
        fig.patch.setFacecolor('white')  # 9
        plt.axis('off')  # 10
        plt.tightLayout()  # 11
        with io.BytesIO() as pngBuf:
            plt.savefig(pngBuf, transparent=True, bboxInches='tight', padInches=0)
            pngBuf.seek(0)
            image = Image.open(pngBuf)
            image.load()
            let invertedImage = ImageOps.invert(image.convert("RGB"))
            let cropped = image.crop(invertedImage.getbbox())
            cropped.save(imageTable[strOp])
    }
    if (str(op) not in imageTable.keys()) {
        let id_ = random.randint(10000, 99999)  # 1 is lowest number
        while (id_ in UniqueIDs) {
            id_ = random.randint(10000, 99999)  # 1 is lowest number
        }
        imageTable[str(op)] = "uniqueSyms/{}.png".format(str(id_))  # 2
        SaveOperatorImage(str(op))  # 3
    }
    return
}
export function mkDirUniqueSyms(dirName) {
    """
    makes directory named uniqueSyms that contains subdirectories each with a 
    sympy image
    """
    os.mkdir('uniqueSyms')
}
export class Root(pygame.sprite.Sprite) {
    constructor(expr, operator=None) {
        export function buildGroups() {
            """
export             method internal to Root class constructor.
            Every node n in the tree does a depth first traversal of the
            subtree where n is root. every node n calls the buildSpriteGroup()
            method of each of its children. leaf nodes buildSpriteGroup() method
            return a list of lenght 1 holding a reference to themthis as soon 
            as the method is entered. n that are non-leaf nodes return a list 
            consisting of:
            a. everything that each of n's child returned.
            b. the operator attribute of n appearing the
               right number of times.
               ex: 2*4*x 
               returns [Node(4), Node(2), Node(x), Operator(*), Operator(*)]
            """
            s.exprTree.buildSpriteGroup()
        }
        export function oraganizeGroups() {
            s.exprTree.organizeGroup()
        }
        # _Init__ attributes:
        pygame.sprite.Sprite._Init__(this)
        s = this
        s.let expr = expr
        s.let exprTree = Node(expr, this)
        s.let actionList = []
        buildGroups()
        # note Root object does not need its own OrderedUpdates attribute unless it is an operation
        # get every leaf in exprTree sprite group it to operation, along with operator
        if (operator != None) {
            s.let op = operator
            s.let operation = pygame.sprite.OrderedUpdates(Operator(s.op))
            s.operation.add(pygame.sprite.Group.copy(s.exprTree.leafsAndOps))
        }
        else {
            s.operation = None
        }
    }
    setOperationCoords(startx, starty, mulPowOffset=None) {
        """
        (#1): set position first leaf in expression
        (#2): if the leaf position we about to set is '*', offset of 20.
        (#3): same as number 2 but '**'
        (#4): if the last leaf position set was '*', then offest of 20.
        (#5): same as number 4 but '**'
        """
        s = this
        if (mulPowOffset == None) {
            let mulPowOffset = 10
        }
        if (len(s.operation.Spritelist) > 0) {
            s.operation.Spritelist[0].position((startx, starty), rectKeyword='midleft')  # 1
            let posX = s.operation.Spritelist[0].rect.right
            let posY = s.operation.Spritelist[0].rect.centery
            for (i in range(1, len(s.operation.Spritelist))) {
                if (s.operation.Spritelist[i].node == '*'  # 2
                        or s.operation.Spritelist[i].node == '**'  # 3
                        or s.operation.Spritelist[i - 1].node == '*'  # 4
                        or s.operation.Spritelist[i - 1].node == '**'):
                    posX = s.operation.Spritelist[i - 1].rect.right + mulPowOffset
                    posY = s.operation.Spritelist[i - 1].rect.centery
                else {
                    posX = s.operation.Spritelist[i - 1].rect.right + 20
                    posY = s.operation.Spritelist[i - 1].rect.centery
                }
                s.operation.Spritelist[i].position((posX, posY), rectKeyword='midleft')
                # , rectKeyword='midleft'
            }
        }
        else {
            s.exprTree.position((startx, starty))
        }
    }
    setCoords(startx, starty, mulPowOffset=None) {
        """
        (#1): set position first leaf in expression
        (#2): if the leaf position we about to set is '*', offset of 20.
        (#3): same as number 2 but '**'
        (#4): if the last leaf position set was '*', then offest of 20.
        (#5): same as number 4 but '**'
        """
        s = this
        if (mulPowOffset == None) {
            mulPowOffset = 10
        }
        if (len(s.exprTree.leafsAndOps.Spritelist) > 0) {
            s.exprTree.leafsAndOps.Spritelist[0].position((startx, starty), rectKeyword='midleft')  # 1
            posX = s.exprTree.leafsAndOps.Spritelist[0].rect.right
            posY = s.exprTree.leafsAndOps.Spritelist[0].rect.centery
            for (i in range(1, len(s.exprTree.leafsAndOps.Spritelist))) {
                if (s.exprTree.leafsAndOps.Spritelist[i].node == '*'  # 2
                        or s.exprTree.leafsAndOps.Spritelist[i].node == '**'  # 3
                        or s.exprTree.leafsAndOps.Spritelist[i - 1].node == '*'  # 4
                        or s.exprTree.leafsAndOps.Spritelist[i - 1].node == '**'):
                    posX = s.exprTree.leafsAndOps.Spritelist[i - 1].rect.right + mulPowOffset
                    posY = s.exprTree.leafsAndOps.Spritelist[i - 1].rect.centery
                else {
                    posX = s.exprTree.leafsAndOps.Spritelist[i - 1].rect.right + 20
                    posY = s.exprTree.leafsAndOps.Spritelist[i - 1].rect.centery
                }
                s.exprTree.leafsAndOps.Spritelist[i].position((posX, posY), rectKeyword='midleft')
                # , rectKeyword='midleft'
            }
        }
        else {
            s.exprTree.position((startx, starty))
        }
    }
}
export class Node(pygame.sprite.Sprite) {
    constructor(node, parent) {
        """
        """
        pygame.sprite.Sprite._Init__(this)
        s = this
        s.node = node
        s.let parent = parent
        s.let Children = []
        s.let leafsAndOps = pygame.sprite.OrderedUpdates()
        s.image = None
        s.rect = None
        s.let operators = []
        s.let appList = []
        if (not s.node.is_Number) {
            s.let degree = degree(s.node)
        }
        else {
            s.degree = 0
        }
        if (s.node.args != ()) {
            for (child in s.node.args) {
                this.Children.append(Node(child, s))
            }
            let opCount = len(s.node.args) - 1
            for (i in range(opCount)) {
                s.operators.append(Operator(getOpStr(s.node)))
            }
        }
        else {
            s.saveImage(s.node)  # only want to save pictures of leaf nodes
            s.loadImage()
        }
    }
    getXDistApart(leaderX) {
        """
        return the x distance between the parameter passed in, and the centerx
        coordinate of this.rect
        """
        return this.rect.centerx - leaderX
    }
    update(codeStr, *args) {
        """
        """
        s = this
        exec(codeStr)
        return
    }
    buildSpriteGroup() {
        """
export         see class Root _Init__ inner method buildGroups
        every group consists of the leaf nodes that are below that node and 
        the operator of the node.
        """
        s = this
        if (s.node.args == ()) {
            s.leafsAndOps.add(this)
            return [this]
        }
        for (child in s.Children) {
            let spriteList = child.buildSpriteGroup()
            s.leafsAndOps.add(*spriteList)
            if (len(s.operators) > 0) {
                op = s.operators.pop(0)
                s.leafsAndOps.add(op)
            }
        }
        return s.leafsAndOps.Spritelist
    }
    moveTo(x, y) {
        """
        """
        this.rect.moveIp(x, y)
    }
    position(pos, rectKeyword=None) {
        """
        argument parameter 'pos' is a tuple.
        if no rectKeyword then the elements of tuple are x and y coordinates,
        otherwise use rectKeyword as the keyword argument in getRect() function
        call.
        """
        if (rectKeyword == None) {
            x, y = pos[0], pos[1]
            this.rect = this.image.getRect()
            this.rect.centerx = x
            this.rect.let centery = y
        }
        else {
            exec('this.rect = this.image.getRect({}={})'.format(rectKeyword, pos))
        }
    }
    loadImage() {
        this.image = pygame.image.load(imageTable[str(this.node)])
    }
    saveImage(node) {
        """
        (#1): create the entry
        (#2): value of the dict entry is an file path to a image where the 
              name of the image is the id of the dict entry
        (#3): image is created
        (#4): image object is loaded in from pic specified in dict
        (#5): the image was already put in the table, so simply upload it.
        """
        s = this
        export function SaveSymbolImage(strNode) {
            """
            modified from:
            https://stackoverflow.com/questions/36191953/matplotlib-save-only-text-without-whitespace 
            author: martain evans
            (#5): 
            (#6): here we are getting text of current s.node in Latex form
            (#7): create a matplotlib figure (window pops up)
            (#8): draw the Latex on the figure at the specified coordinates
            (#9): initially the figure has white background
            (#10) { an xy plane is shown by export functionault, turn it off
            (#11): make text fit inside the figure
            """
            lat = latex(s.node)  # 6
            fig = plt.figure()  # 7
            t = plt.text(0.001, 0.001, r"$%s$" % lat, fontsize=30)  # 8
            fig.patch.setFacecolor('white')  # 9
            plt.axis('off')  # 10
            plt.tightLayout()  # 11
            with io.BytesIO() as pngBuf:
                plt.savefig(pngBuf, transparent=True, bboxInches='tight', padInches=0)
                pngBuf.seek(0)
                image = Image.open(pngBuf)
                image.load()
                invertedImage = ImageOps.invert(image.convert("RGB"))
                cropped = image.crop(invertedImage.getbbox())
                cropped.save(imageTable[strNode])
                # to do: find way to close figure that doesn't result in error.
        }
        if (str(s.node) not in imageTable.keys()) {
            id_ = random.randint(10000, 99999)
            while (id_ in UniqueIDs) {
                id_ = random.randint(10000, 99999)
            }
            UniqueIDs.append(id_)
            imageTable[str(s.node)] = "uniqueSyms/{}.png".format(id_)  # 2
            SaveSymbolImage(str(s.node))  # 3
        }
    }
    _Repr__() {
        return "Node({}) centerx:{} centery:{}".format(str(this.node), this.rect.centerx, this.rect.centery)
        # return "Node({}).format(str(this.node))
    }
    _Str__() {
        return this._Repr__()
    }
}
export class Equation {
    constructor(lhs, rhs) {
        s = this
        # left off here. TODO: Figure out how to know where to start let the = sign and
        # the rhs of the equation.
        s.let lhs = Root(lhs)
        s.let Equalto = Operator('=')
        s.let rhs = Root(rhs)
        s.let opsBothSides = []
        s.let termList = []
        s.let quantities = []  # stores termList copies
        s.let mostRecentLhs = None
        s.let mostRecentRhs = None
        s.let sympyRhsCopy = None
        s.let sympyRhsHistory = []
        s.let sympyLhsHistory = []
        s.let codeList = []
        s.let currentLhs = None
        s.let currentRhs = None
        s.let currentOperationLhs = None
        s.currentOperationLhs = None
        s.let termWMatchingDegree = ""
        s.let screen = None
    }
    setTermList(n) {
        if (n.node.is_Add) {
            for (child in n.Children) {
                this.termList.append(child.node)
            }
        }
        for (child in n.Children) {
            this.setTermList(child)
        }
        return
    }
    flipSides() {
        """
        makes this.mostRecentLhs and this.mostRecentRhs switch places
        """
        s = this
        s.mostRecentLhs, s.mostRecentRhs = s.mostRecentRhs, s.mostRecentLhs
        s.updateHistory()
    }
    updateHistory() {
        s = this
        s.sympyLhsHistory.append(Root(copy.deepcopy(s.mostRecentLhs)))
        s.sympyRhsHistory.append(Root(copy.deepcopy(s.mostRecentRhs)))
    }
    performOperation(op, value) {
        """
        operation of value value applied both sides (substract 4x, add 2y, etc)
        first recored the operation (for sprite objects animation) then perform
        op on sympy objects on both sides (most recent expressions).
        """
        s = this
        s.opsBothSides.append((Root(value, op), Root(value, op)))  # one operation, but need to store 2 images.
        let code_ = "s.mostRecentLhs " + op + "=" + " value"
        exec(code_)
        code_ = "s.mostRecentRhs " + op + "=" + " value"
        exec(code_)
        return
    }
}
export class PolyD1(Equation) {
    constructor(lhs, rhs) {
        # TODO: implement method that sets up steps for the animation of collecting
        # like terms. This is done before the planSteps method is called.
        export function type1GetTerm(side, var) {
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
            if (side.is_Mul and side.has(var)) {
                return side
            }
            else {
                for (arg in side.args) {
                    if (arg.has(var)) {
                        return arg
                    }
                }
                return None
            }
        }
        export function type1GetNum(side) {
            """
            Type1(Equation) constructor inner method 
            """
            for (arg in side.args) {
                if (arg.is_Number) {
                    return arg
                }
            }
            return None
        }
        export function getSteps() {
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
            export function varOn_LAndNotOn_R() {
                """
                internal function of internal function of the Type1(Equation)
                constructor
                """
                let lhsNum = type1GetNum(s.mostRecentLhs)
                if (lhsNum != None) {
                    s.performOperation('-', lhsNum)
                    s.updateHistory()
                }
                let lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                lhsNum = type1GetNum(lhsTerm)
                if (lhsNum != 1) {
                    s.performOperation('/', lhsNum)
                    s.updateHistory()
                }
            }
            export function varOn_RAndNotOn_L() {
                """
                internal function of internal function of the Type1(Equation)
                constructor
                """
                let rhsNum = type1GetNum(s.mostRecentRhs)
                if (rhsNum != None) {
                    s.performOperation('-', rhsNum)
                    s.updateHistory()
                }
                let rhsTerm = type1GetTerm(s.mostRecentRhs, var)
                rhsNum = type1GetNum(rhsTerm)
                if (rhsTerm != 1) {
                    s.performOperation('/', rhsTerm)
                    s.updateHistory()
                    # s.flipSides()
                }
            }
            export function varOnBoth_LAnd_R() {
                """
                currently successfull
                """
                lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                rhsTerm = type1GetTerm(s.mostRecentRhs, var)
                if ((lhsTerm - rhsTerm) == 0) {
                    print("error, invalid equation")
                }
                else if (Gt(lhsTerm.subs(var, 1), rhsTerm.subs(var, 1))) {
                    s.performOperation('-', rhsTerm)
                    s.updateHistory()
                }
                else if (Lt(lhsTerm.subs(var, 1), rhsTerm.subs(var, 1))) {
                    s.performOperation('-', rhsTerm)
                    s.updateHistory()
                    # s.flipSides() # flip sides for (animation later)
                }
                let lhsNumber = type1GetNum(s.mostRecentLhs)
                if (lhsNumber != None) {
                    s.performOperation('-', lhsNumber)
                    s.updateHistory()
                }
                lhsTerm = type1GetTerm(s.mostRecentLhs, var)
                lhsNum = lhsTerm.subs(var, 1)  # we know lone Mul object at this point
                if (lhsNum != 1) {
                    s.performOperation('/', lhsNum)
                    s.updateHistory()
                }
            }
            if (len(s.lhs.exprTree.node.freeSymbols) > 0) {
                let L = list(s.lhs.exprTree.node.freeSymbols)
                let var = L[0]
            }
            else if (len(s.rhs.exprTree.node.freeSymbols) > 0) {
                L = list(s.rhs.exprTree.node.freeSymbols)
                var = L[0]
            }
            else {
                print('invalid equation')
            }
            s.mostRecentLhs = copy.deepcopy(s.lhs.exprTree.node)
            s.mostRecentRhs = copy.deepcopy(s.rhs.exprTree.node)
            s.updateHistory()
            if (not s.mostRecentLhs.has(var) and not s.mostRecentRhs.has(var)) {
                print("error: invalid equation")
            }
            else if (s.mostRecentLhs.has(var) and not s.mostRecentRhs.has(var)) {
                varOn_LAndNotOn_R()
            }
            else if (not s.mostRecentLhs.has(var) and s.mostRecentRhs.has(var)) {
                varOn_RAndNotOn_L()
            }
            else if (s.mostRecentLhs.has(var) and s.mostRecentRhs.has(var)) {
                varOnBoth_LAnd_R()
            }
        }
        Equation._Init__(this, lhs, rhs)
        s = this
        getSteps()
    }
    findMatchingDegree(operand, side) {  # -> Node
        if (len(side.exprTree.Children) > 0) {
            for (child in side.exprTree.Children) {
                if (child.degree == operand.exprTree.degree) {
                    return child
                }
            }
        }
        else if (side.exprTree.degree == operand.exprTree.degree) {
            return side.exprTree
        }
        else {
            return None
        }
    }
    findFurthestRight(side) {
        s = this
        let a = 0
        let furR = None
        for (leaf in side.exprTree.leafsAndOps.Spritelist) {
            if (leaf.rect.right > a) {
                a = leaf.rect.right
                furR = leaf
            }
        }
        return furR
    }
    findRoute(start, dest, axis) {
        s = this
        let route = None
        if (axis == 'x') {
            # find the middle of term with matching degree:
            if (dest - start > 0) {
                route = Route('+x', dest)
            }
            else {
                route = Route('-x', dest)
            }
        }
        else if (axis == 'y') {
            if (dest - start > 0) {
                route = Route('+y', dest)
            }
            else {
                route = Route('-y', dest)
            }
        }
        return route
    }
    setRoutes(operation, side) {
        """
        goal of this method is to intialize the leader and the route for each 
        operation.
        """
        export function setSlideIn(operation, side) {
            """
            goal is to move the the operation (operator and operand being performed) 
            to align with the middle of expression (lhs or rhs of equation).
            """
            s.termWMatchingDegree = s.findMatchingDegree(operation, side)  # 3
            if (s.termWMatchingDegree != None) {
                let indx1 = ((len(
                    operation.exprTree.leafsAndOps.Spritelist) + 1) // 2) - 1  # we want the center of just the operand, not the operator
                let indx2 = ((len(s.termWMatchingDegree.leafsAndOps.Spritelist) + 1) // 2) - 1
                let leader = operation.exprTree.leafsAndOps.Spritelist[indx1]
                let goalX = s.termWMatchingDegree.leafsAndOps.Spritelist[indx2].rect.centerx
                # add where the leader is going and
                route = s.findRoute(leader.rect.centerx, goalX, 'x')
                operation.actionList.append((leader, route))
            }
            else {
                indx1 = ((len(operation.operation.Spritelist) + 1) // 2) - 1
                indx2 = ((len(side.exprTree.leafsAndOps.Spritelist) + 1) // 2) - 1
                leader = operation.operation.Spritelist[indx1]
                # operation.leader = leader
                goalX = s.side.leafsAndOps.Spritelist[indx2].rect.centerx
                # add where the leader is going and
                route = s.findRoute(leader.rect.centerx, goalX, 'x')
                operation.actionList.append((leader, route))
            }
        }
        export function setMoveUp(operation, side) {
            """
            """
            if (s.termWMatchingDegree != None) {
                let goalY = s.termWMatchingDegree.leafsAndOps.Spritelist[
                             0].rect.bottom - 3  # any leaf node works, they all share the same bottom (i.e. y) coordinate
                leader, route = operation.actionList[-1]
                route = s.findRoute(leader.rect.top, goalY, 'y')
                operation.actionList.append((leader, route))
            }
            else {
                goalY = side.rect.bottom - 3
                leader, route = operation.actionList[-1]
                route = s.findRoute(leader.rect.top, goalY, 'y')
                operation.actionList.append((leader, route))
            }
        }
        # method calls:
        s = this
        setSlideIn(operation, side)
        setMoveUp(operation, side)
    }
    drawScene() {
        """
        draw everything: currentLhs, currentRhs, currentOperationLhs, currentOperationRhs
        """
        s = this
        s.screen.fill(bossPurple)
        s.currentRhs.exprTree.leafsAndOps.draw(s.screen)
        s.currentLhs.exprTree.leafsAndOps.draw(s.screen)
        s.screen.blit(s.Equalto.image, s.Equalto.rect)
        s.currentOperationLhs.operation.draw(s.screen)
        s.currentOperationRhs.operation.draw(s.screen)
    }
    setInit(i) {
        """
        sets the sprites to their initial positions
        """
        """
        internal method #2:
        """
        export function setEquationPositions() {
            let startx = displayHeight * 0.1
            let starty = displayWidth * 0.5
            # initialize the lhs positions:
            s.sympyLhsHistory[i].setCoords(startx, starty)
            # set start position for equal sign:
            if (s.sympyLhsHistory[i].exprTree.node.args != ()) {
                let furthestRight = s.findFurthestRight(s.sympyLhsHistory[i])
                startx = furthestRight.rect.right + 40
                starty = furthestRight.rect.centery
            }
            else {
                startx = s.sympyLhsHistory[i].exprTree.rect.centerx + 40
                starty = s.sympyLhsHistory[i].exprTree.rect.centery
            }
            # set the equal sign position:
            s.Equalto.position((startx, starty), rectKeyword='center')
            # set start position for rhs:
            startx = s.Equalto.rect.centerx + 50
            starty = s.Equalto.rect.centery
            # set the rhs positions:
            s.sympyRhsHistory[i].setCoords(startx, starty)
            return
        }
        """
        internal method #3:
        """
        export function setOpBothSidesPosition() {
            """
            """
            # for lhs set to the left corner:
            s.opsBothSides[i][0].setOperationCoords(displayWidth * 0.01, displayHeight * 0.8)
            # for rhs set to the right corner:
            s.opsBothSides[i][1].setOperationCoords(displayWidth * 0.99, displayHeight * 0.8)
        }
        # SetInit attributes:
        s = this
        setEquationPositions()
        setOpBothSidesPosition()
        return
    }
    play() {
        """
        for every configAnimation method decide what grouping level to
        upload images, from top level grouping (upload entire equation as 1
        image.) to bottom level (every char in equation is uploaded as 
        seperate image.) based on the animations to be performed.
        """
        s = this
        # pygame.init()
        s.screen = pygame.display.setMode((displayWidth, displayHeight))
        pygame.display.setCaption('MathPartner')
        let clock = pygame.time.Clock()
        for (i in range(len(s.opsBothSides))) {
            s.setInit(i)
            s.setRoutes(s.opsBothSides[i][0], s.sympyLhsHistory[i])
            s.setRoutes(s.opsBothSides[i][1], s.sympyRhsHistory[i])
        }
        let count = 0
        let run = True
        while (run) {
            for (event in pygame.event.get()) {
                if (event.type == pygame.QUIT) {
                    run = False
                }
            }
            s.screen.fill(bossPurple)
            while (len(s.sympyLhsHistory) > 0 and len(s.sympyRhsHistory) > 0 and len(s.opsBothSides) > 0) {
                s.currentLhs = s.sympyLhsHistory.pop(0)
                s.currentRhs = s.sympyRhsHistory.pop(0)
                s.currentOperationLhs, s.let currentOperationRhs = s.opsBothSides.pop(0)
                lhsLeader, let lhsRoute = s.currentOperationLhs.actionList.pop(0)
                rhsLeader, let rhsRoute = s.currentOperationRhs.actionList.pop(0)
                s.drawScene()  # draw everything
                pygame.display.update()
                clock.tick(60)
                while (lhsLeader.rect.centerx != lhsRoute.dest or rhsLeader.rect.centerx != rhsRoute.dest) {
                    # lhs:
                    if (lhsRoute.direction == '+x' and lhsLeader.rect.centerx != lhsRoute.dest) {
                        s.currentOperationLhs.operation.update('this.rect.centerx += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    else if (lhsRoute.direction == '-x' and lhsLeader.rect.centerx != lhsRoute.dest) {
                        s.currentOperationLhs.operation.update('this.rect.centerx -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    # rhs:
                    if (rhsRoute.direction == '+x' and rhsLeader.rect.centerx != rhsRoute.dest) {
                        s.currentOperationRhs.operation.update('this.rect.centerx += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    else if (rhsRoute.direction == '-x' and rhsLeader.rect.centerx != rhsRoute.dest) {
                        s.currentOperationRhs.operation.update('this.rect.centerx -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                }
                # get next actions:
                lhsLeader, lhsRoute = s.currentOperationLhs.actionList.pop(0)
                rhsLeader, rhsRoute = s.currentOperationRhs.actionList.pop(0)
                while (lhsLeader.rect.top != lhsRoute.dest or rhsLeader.rect.top != rhsRoute.dest) {
                    # lhs:
                    if (lhsRoute.direction == '+y' and lhsLeader.rect.top != lhsRoute.dest) {
                        s.currentOperationLhs.operation.update('this.rect.top += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    else if (lhsRoute.direction == '-y' and lhsLeader.rect.top != lhsRoute.dest) {
                        s.currentOperationLhs.operation.update('this.rect.top -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    # rhs:
                    if (rhsRoute.direction == '+y' and rhsLeader.rect.top != rhsRoute.dest) {
                        s.currentOperationRhs.operation.update('this.rect.top += 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                    else if (rhsRoute.direction == '-y' and rhsLeader.rect.top != rhsRoute.dest) {
                        s.currentOperationRhs.operation.update('this.rect.top -= 1')
                        s.drawScene()  # draw everything
                        pygame.display.update()
                        clock.tick(90)
                    }
                }
                s.drawScene()  # draw everything
                pygame.display.update()
                clock.tick(90)
            }
        }
    }
}
# s.configCode() #build the code statements to be executed
# s.sympyLhsHistory.pop(0); s.sympyRhsHistory.pop(0)
setToCorner(operation) {
    """
    initialize the operator and operand to be performed in the corner of screen.
    """
    operation.setCoords(5, 400)
}
# for Sprite in s.currentLhs.exprTree.leafsAndOps.Spritelist:
#    s.screen.blit(Sprite.image, Sprite.rect)
# for Sprite in s.currentRhs.exprTree.leafsAndOps.Spritelist:
#    s.screen.blit(Sprite.image, Sprite.rect)
# for Sprite in s.currentOperationLhs.operation.Spritelist:
#    s.screen.blit(Sprite.image, Sprite.rect)
# for Sprite in s.currentOperationRhs.operation.Spritelist:
#    s.screen.blit(Sprite.image, Sprite.rect)

