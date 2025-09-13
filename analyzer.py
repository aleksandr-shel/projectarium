import pandas as pd
import re
from collections import Counter

def count_words(text:str):
    return len(text.split())

def select_top_words(text:str, top:int = 5) -> list:
    
    words = re.findall(r'\b\w+\b', text.lower())
    
    counter = Counter(words)
    
    top_5 = counter.most_common(5)
    
    return top_5


def test_re(text:str):
    
    words = re.findall(r'\b\w+\b', text.lower())
    
    return words

if __name__ == "__main__":
    # select_top_words("In recent years, artificial intelligence has transformed industries around the world. From self-driving cars to personalized healthcare, the technology is reshaping how we live and work. However, with rapid advancement comes ethical concerns — particularly around job displacement and data privacy. Experts urge that while innovation is essential, regulation must keep pace to ensure a fair and secure future for all.")
    ans = select_top_words("hell hell where are you? are are you. there something wrong?")
    print(ans)