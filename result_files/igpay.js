export function addTo(wsList, whitespace) {
    if (whitespace == '') {
        return wsList, ''
    }
    wsList += [whitespace]
    return wsList, ''
}
export function getWhitespace(text) {
    let wsList = []
    let whitespace  = ''
    let i = 0
    while ((i < len(text))) {
        while((i < len(text) and text[i].isspace())) {
            whitespace += text[i]
            i+=1
        }
        wsList, let whitespace = addTo(wsList, whitespace)
        i+=1
    }
    return wsList
}
export function hasAlpha(subString) {
    for (char in subString) {
        if (char.isalpha()) {
            break
        }
    }
    else {
        return False
    }
    return True
}
let VowelList = ['a', 'e', 'i', 'o', 'u']
let ConsonantList = (['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 
                    'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'])
let CapitalVowelList = ['A', 'E', 'I', 'O', 'U']
let CapitalConsonantList = (['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 
                            'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 
                            'Z'])
let PunctuationList = ['.', ',', '!', '?', ';', ':', "'", "*"]
let SpecialGrammar = ["'", '"', "(", ")", "-", '[', ']']
export function isPunc(char) {
    if (char in PunctuationList) {
        return True
    }
    else {
        return False
    }
}
export function getPunc(word) {
        """     
        first we want to check if there is punctuation at the end of the word.
        we only want to move punctuation to the end of the word when we're
        done, if it was at the end of the word at the start. For example if
        you had "hello...there" you wouldn't want to move the '...' to the
        end. If there is punctuation at the end of the word, we want to look
        for things like "!!!", "!?!?", "...", at the end of word. so we start
        and the end of the word and work back until reach char not punctuation.
        """
        let punc = ''
        for (char in PunctuationList) {
            if (word.endswith(char)) {
                let punct = True
                break
            }
        }
        else {
            punct = False
        }
        if (punct) {
            let index = -1
            #bounds check for counting from -1 back:
            while (index > -len(word) and isPunc(word[index])) {
                punc += word[index]
                index -= 1
            }
        }
        return punc
}
export function igpay(word) {
    let noVowels = False
    let capital = False
    let allCaps = False
    #if no vowels are in the word, return the word unchanged:
    for (i in range(0, len(word))) {
        if (word[i] in VowelList or word[i] in CapitalVowelList) {
            break
        }
    }
    else {
        noVowels = True
    }
    if (noVowels) {
        return word
    }
    #word is assumed to start with alphabetic character. if the first 
    #character is a vowel, append 'way' onto the end of the word and return the 
    #word:
    if (word[0] in VowelList or word[0] in CapitalVowelList) {
        #first find any punctuation at end of word:
        punc = getPunc(word)
        #we found punc in reverse order, so reverse:
        let chars = list(punc)
        chars.reverse()
        punc = ''.join(chars)
        if (word.isupper()) {
            word += 'WAY'
        }
        else {
            word += 'way'
        }
        #move any punctuation that was at the end of the word, back to the end
        #of the word:
        if (punc != '') {
            #in case there was the same punctuation eariler in the word, we
            #make sure only to replace the last occurance of it:
            let last = word.count(punc)
            let word = word.replace(punc, '', last)
            word += punc
        }
    }
    #else the first letter not vowel, if consonant:
        #first find any punctuation at end
        #if the first letter is uppercase:
            #flag that it was uppercase
            #if not the entire word is uppercase:
                #change the first letter from upper to lower case(because soon
                #it will not be the first letter)
    else if (word[0] in ConsonantList or word[0] in CapitalConsonantList) {
        #get punctuation from end of word if there is:
        punc = getPunc(word)
        #we found punc in reverse order, so reverse:
        chars = list(punc)
        chars.reverse()
        punc = ''.join(chars)
        if (word[0].isupper()) {
            capital = True
            if (not word.isupper()) {
                word = word.replace(word[0], word[0].lower(), 1)
            }
            else {
                allCaps = True
            }
        }
        #traverse the entire word breaking early when vowel is found
            #if the current letter is a lower or uppercase vowel..
                #assign everying up to and not including the vowel as a 
                #substring
                #remove everything up to and not including the vowel
                #reattach the substring to the end of the word and append 'ay'
                #if there was a punctuation in the word, it is now in the wrong 
                #place, so correct it
        for (i in range(1, len(word))) {
            if (word[i] in VowelList or word[i] in CapitalVowelList) {
                let sub = word[0:i]
                word = word.replace(word[0:i], '', 1)
                word += sub
                if (allCaps) {
                    word += 'AY'
                }
                else {
                    word += 'ay'
                }
                if (punc != '') {
                    #in case there was same punctuation eariler in word,
                    #make sure only replace last occurance:
                    last = word.count(punc)
                    word = word.replace(punc, '', last)
                    word += punc
                }
                #if flag indicates first letter of the original 
                #word was capital.. 
                    #make the first letter of the new word capital, and set 
                    #the flag back to false:
                #break from the loop because we dont want to keep traversing 
                #the word:
                if (capital and not allCaps) {
                    let cap = word[0].capitalize()
                    word = word.replace(word[0], cap, 1)
                }
                break
            }
        }
    }
    #return the new word.
    return word
}
export function reassemble(words, whSpList, beginingIsWhitespace) {
    i = 0
    let text = ''
    if (beginingIsWhitespace) {
        while((len(whSpList) > 0 or len(words) > 0)) {
            if (len(whSpList) > 0) {
                let next = whSpList.pop(0)
                text += next
            }
            if (len(words) > 0) {
                next = words.pop(0)
                text += next
            }
        }
    }
    else {
        while((len(whSpList) > 0 or len(words) > 0)) {
            if (len(words) > 0) {
                next = words.pop(0)
                text += next
            }
            if (len(whSpList) > 0) {
                next = whSpList.pop(0)
                text += next
            }
        }
    }
    return text
}
export function noSpecialGrammar(word) {
    for (char in word) {
        if (char in SpecialGrammar) {
            break
        }
    }
    else {
        return True
    }
    return False
}
export function translateHelper(string, delims, parts) {
    "function deals with 'words' containing grammar other than punctuation"
    if (len(delims) == 0) {
        parts.append(igpay(string))
        let newString = ''.join(parts)
        return newString
    }
    left, grammer, let right = string.partition(delims.pop(0))
    parts.append(igpay(left))
    parts.append(grammer)
    newString = translateHelper(right, delims, parts)
    return newString
}
export function translate(words) {
    let latinWords = []
    #send one word at a time to igpay:
    for (i in range(0, len(words))) {
        #dosnt check for all grammar, just non punctuation:
        if (noSpecialGrammar(words[i])) {
            latinWords.append(igpay(words[i]))
        }
        else {
            let string = words[i]
            let delims = []
            let j = 0
            while((j < len(string))) {
                if (string[j] in SpecialGrammar) {
                    #checking if single quotation mark or apostrophe:
                    if (string[j] == "'" and j != len(string) - 1) {
                        pass
                    }
                    else {
                        delims.append(string[j])
                    }
                }
                #checking for special case of multiple period trail of,
                #for example "hello...there"
                if (string[j] == "." and j != len(string) - 1 
                    and hasAlpha(string[j:])):
                    let delim_ = ''
                    while (string[j] == '.') {
                        delim_ += string[j]
                        j +=1
                    }
                    else {
                        j -= 1
                    }
                    delims.append(delim_)
                #special case for colon with no leading whitespace:
                if (string[j] == ":" and j != len(string) - 1) {
                    delims.append(string[j])
                }
                j += 1
            }
            newString = translateHelper(string, delims, [])
            latinWords.append(newString)
        }
    }
    return latinWords
}
if (_Name__ == '_Main__') {
    let words = [
    "Sir", "Patrick", "Stewart", "is", "an", "English", "actor", "whose", "work",
    "has", "included", "roles", "on", "stage", "television", "and", "film", "in", 
    "a", "career", "spanning", "almost", "six", "decades", "He", "is", "a", 
    "multiple", "time", "Olivier", "Golden", "Globe", "Emmy", "Screen", "Actors", 
    "Guild", "and", "Saturn", "Award", "nominee", "Beginning", "his", "career", 
    "with", "a", "long", "run", "with", "the", "Royal", "Shakespeare", "Company", 
    "Stewart", "received", "the", "1979", "Laurence", "Olivier", "Award", "for", 
    "Best", "Actor", "in", "a", "Supporting", "Role", "for", "his", "performance", 
    "in", "Antony", "and", "Cleopatra", "on", "the", "West", "End", "Stewart's", 
    "first", "major", "screen", "roles", "were", "in", "BBC-broadcast", 
    "television", "productions", "during", "the","mid-late", "1970s", "including", 
    "Hedda", "and", "the", "I", "Claudius", "miniseries", "In","the", "1980s", 
    "Stewart", "began", "working", "in", "American", "television", "and", "film", 
    "with", "roles","such", "as", "Captain", "Jean-Luc", "Picard", "in", "Star", 
    "Trek:", "The", "Next", "Generation", "and","its", "successor", "films", "as", 
    "Professor", "Charles", "Xavier", "in", "the", "X-Men", "series", "of",
    "superhero", "films", "the", "lead", "of", "the", "Starz", "TV", "series", 
    "Blunt", "Talk", "and", "voice", "roles", "such", "as", "CIA", "Deputy", 
    "Director", "Avery", "Bullock", "in", "American", "Dad!", "and", "the", 
    "narrator", "in", "Ted", "Having", "remained", "with", "the", "Royal", 
    "Shakespeare", "Company", "in", "2008", "Stewart", "played", "King","Claudius", 
    "in", "Hamlet", "on", "the", "West", "End", "and", "won", "a", "second", 
    "Olivier","Award", "In", "1993", "TV", "Guide", "named", "Stewart", "the", 
    "Best", "Dramatic", "Television", "Actor", "of", "the", "1980s", "He",
    "received", "a", "star", "on", "the", "Hollywood", "Walk", "of", "Fame", "on", 
    "16", "December", "1996", "In","2010", "Stewart", "was", "knighted", "by", 
    "Queen", "Elizabeth", "II", "for", "services", "to", "drama", ]
    latinWords = translate(words)
    if (len(words) == len(latinWords)) {
        for (i in range(0, len(latinWords))) {
            print("English: {:>15}  Pig Latin: {:>15}".format(words[i], latinWords[i]))
        }
    }
    print("English: {:>15}  Pig Latin: {:>15}".format('yes', igpay('yes')))
    print("English: {:>15}  Pig Latin: {:>15}".format('add', igpay('add')))
    print("English: {:>15}  Pig Latin: {:>15}".format('office', igpay('office')))
    print("English: {:>15}  Pig Latin: {:>15}".format('why', igpay('why')))
    print("English: {:>15}  Pig Latin: {:>15}".format('The', igpay('The')))
    print("English: {:>15}  Pig Latin: {:>15}".format('parrot', igpay('parrot')))
    print("English: {:>15}  Pig Latin: {:>15}".format('knights', igpay('knights')))
    print("English: {:>15}  Pig Latin: {:>15}".format("Can't", igpay("Can't")))
    print("English: {:>15}  Pig Latin: {:>15}".format("Won't", igpay("Won't")))
    print("English: {:>15}  Pig Latin: {:>15}".format("Who?", igpay("Who?")))
    print("English: {:>15}  Pig Latin: {:>15}".format("Ni!", igpay("Ni!")))
    print("English: {:>15}  Pig Latin: {:>15}".format("Nu!", igpay("Nu!")))
    print("English: {:>15}  Pig Latin: {:>15}".format("3.14159265", igpay("3.14159265")))
}
    print("English: {:>15}  Pig Latin: {:>15}".format("", igpay("")))

