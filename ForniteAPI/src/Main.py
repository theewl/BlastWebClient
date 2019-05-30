from ray import Reader
import sys
import os
path = os.getcwd()

dashChecker = 0

for x in range(len(path)):
    if path[x] == '\\':
        dashChecker += 1

    if path[x] == '\\' and dashChecker == 3:
        newPath = path[0:x+1]

# ideally we will pass the entire path via parameter
with Reader(newPath + "AppData\\Local\\FortniteGame\\Saved\\Demos" + "\\" + sys.argv[1]) as replay:
    print(replay.stats['eliminations'])
    print(replay.stats['assists'])
    print(replay.stats['revives'])
    print(replay.stats['accuracy'])
    print(replay.stats['damage_taken'])
    print(replay.team_stats['position'])
