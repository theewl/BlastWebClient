'''
Created on Feb 20, 2019

@author: Marcos
'''
from ray import Reader

with Reader("C:/Users/Marcos/AppData/Local/FortniteGame/Saved/Demos/UnsavedReplay-2019.02.20-13.26.09.replay") as replay:
            print(replay.stats)
            print(replay.team_stats)
            #print(replay.header)