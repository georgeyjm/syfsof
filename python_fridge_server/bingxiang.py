#import os
#os.chdir(r"/Users/wangxiang/Desktop/FoodWaste_OxHacks") ##TODO remember to change at anytime
# print("Directory updated?")

import json
import time
from datetime import date, datetime

## function that read a specific file recording food info
def readFile():
    with open('QRCode.json','r') as openfile:
        allInfo=json.load(openfile)
    
    return allInfo

## convert string from JSON to TIME type and return the dict; It will read the file again
## all = readFile()
def makeTime(all): ##make string of dates into time type; production date is not yet useful so not converted
    ExpirationDates = {}
    for i in range(len(all)):
        year =int(all[i]["ExpirationDate"][0:4])
        month =int(all[i]["ExpirationDate"][5:7])
        day =int(all[i]["ExpirationDate"][8:10])
        Expiration_Date = date(year,month,day)
        ExpirationDates[all[i]["Name"]] = Expiration_Date
    return ExpirationDates

## Check data correctness
## If expiration date is less than now, it will return an alarm
## only use when received new data
## all2 = readFile()
def checkData(all2):
    current_time = datetime.now()
    Current_Time = date(current_time.year,current_time.month,current_time.day)
    ExpirationDates = makeTime(all2)
    for i in range(len(all2)):
        Expiration_Date = ExpirationDates[all2[i]["Name"]] # find a way to take from dict to imporve?
        if Expiration_Date < Current_Time:
            print(" Please Check your expiration date for \"" + all2[i]["Name"] + "\"!")

## calculate days to expire and returns the days-to-expire with names
## example output:[['Apple', -1241], ['Banana', 0], ['Orange', 769]]
## all3 = readFile()
def DaysToExpire (all3):
    
    current_time = datetime.now()
    Current_Time = date(current_time.year,current_time.month,current_time.day)
    ExpirationDates = makeTime(all3)
    
    for i in range(len(all3)):
        Expiration_Date = ExpirationDates[all3[i]["Name"]]
        DaysToExpire = Expiration_Date-Current_Time
        all3[i]["DaysToExpire"]=DaysToExpire.days

    return all3

#probably not used anymore
#Check already expired food and return message telling you expired one or expiring today
#def checkExp(dtexp): #dtexp means dateToExpire, pls use DaysToExpire(readFile()) as parameter.
    # for i in range(len(dtexp)):
    #     if dtexp[i][1] < 0 :
    #         print("Your food \"" + dtexp[i][0] + "\" has already expired :( ")
    #     elif dtexp[i][1] == 0:
    #         print("Your food \"" + dtexp[i][0] + "\" is expiring today! :O ")
    #     else:
    #         continue
    # print("woohoooo")

##function that append food info to the file
## function to add to JSON

def addFood(new_data, filename='QRCode.json'):
    with open(filename,'r') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data.append(new_data)
    with open(filename,'w') as file:
        # convert back to json.
        json.dump(file_data, file, indent = 4)

##delete from the file
##function to delete in JSON
def deleteFood(index, filename='QRCode.json'):
    with open(filename,'r') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data = [food for food in file_data if food['Index'] != index]
    with open(filename,'w') as file:
        # convert back to json.
        json.dump(file_data, file, indent = 4)
