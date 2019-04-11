from ray import Reader
import sys

#print(sys.argv[1])

with Reader("C://Users/trana/AppData/Local/FortniteGame/Saved/Demos" + "/" + sys.argv[1]) as replay:
    print(replay.stats['eliminations'])
    print(replay.stats['assists'])
    print(replay.stats['revives'])
    print(replay.stats['accuracy'])
    print(replay.stats['damage_taken'])
    print(replay.team_stats['position'])
