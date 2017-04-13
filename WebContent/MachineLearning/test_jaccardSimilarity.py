from nose.tools import assert_equal
from nose_parameterized import parameterized
from jaccardSimilarity import jaccard_similarity

import unittest
import math


@parameterized.expand([
    ("Hello there", "Hello there", 1.0),
    ("Different strings", "altogether lol", 0.0),
])
def test_jaccard_similarity(s1, s2, expected_similarity):
    # assert_equal(jaccardSimilarity.jaccard_similarity(s1, s2, expected_similarity)
    pass