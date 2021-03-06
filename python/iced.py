#!/usr/bin/env python

from papirus import Papirus
from PIL import ImageFont, ImageDraw, Image
import sys
import os
import time
from pymongo import MongoClient

connection = MongoClient('ds139262.mlab.com', 39262)
db = connection['category']
db.authenticate('glstream', 'Stream100')

menu = db.menu


product = menu.find_one({'product': 'Latte'})

print(product['price'])

# Check EPD_SIZE is defined
EPD_SIZE=0.0
if os.path.exists('/etc/default/epd-fuse'):
    execfile('/etc/default/epd-fuse')
if EPD_SIZE == 0.0:
    print("Please select your screen size by running 'papirus-config'.")
    sys.exit()

# Running as root only needed for older Raspbians without /dev/gpiomem
if not (os.path.exists('/dev/gpiomem') and os.access('/dev/gpiomem', os.R_OK | os.W_OK)):
    user = os.getuid()
    if user != 0:
        print("Please run script as root")
        sys.exit()

WHITE = 1
BLACK = 0


def getFontSize(my_papirus, printstring):
    #returns (ideal fontsize, (length of text, height of text)) that maximally
    #fills a papirus object for a given string
    fontsize = 0
    stringlength = 0
    stringwidth = 0

    maxLength = my_papirus.width
    maxHeight = my_papirus.height

    while (stringlength <= maxLength and stringwidth <= maxHeight):

        fontsize += 1
        font = ImageFont.truetype('/usr/share/fonts/truetype/freefont/FreeMono.ttf', fontsize)
        size = font.getsize(printstring)
        stringlength = size[0]
        stringwidth = size[1]

    font = ImageFont.truetype('/usr/share/fonts/truetype/freefont/FreeMono.ttf', fontsize-1)
    return fontsize-1, font.getsize(printstring)


def drawWords(my_papirus, printstring, fontsize, dims):

    #initially set all white background
    image = Image.new('1', my_papirus.size, WHITE)

    # prepare for drawing
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype('/usr/share/fonts/truetype/droid/DroidSans-Bold.ttf', fontsize)

    draw.text(((my_papirus.width-dims[0])/2, (my_papirus.height/2) - (dims[1]/2)), printstring, font=font, fill=BLACK)

    my_papirus.display(image)
    my_papirus.update()


t1 = 1

if (t1 == 1):

    printString = str(product['price'])

    if len(printString) > 40:
        print 'WARNING: string length is too large for single line printing, truncating at 40 chars'
        printString = printString[0:40]

    rot = '0'
    my_papirus = Papirus(rotation = int(rot))
    fontsize, dims= getFontSize(my_papirus, printString)
    print "Writing to Papirus...."
    drawWords(my_papirus, printString, fontsize, dims)
    print "Finished!"

else:
    print "Usage: " + sys.argv[0] + " \"text to display\" [rotation]"


