from ray import Reader
import sys

#print(sys.argv[1])

# ideally we will pass the entire path via parameter
with Reader("/Users/kimki/Desktop/BlastWebClient/Replays" + "/" + sys.argv[1]) as replay:
    print(replay.stats['eliminations'])
    print(replay.stats['assists'])
    print(replay.stats['revives'])
    print(replay.stats['accuracy'])
    print(replay.stats['damage_taken'])
    print(replay.team_stats['position'])
