
from pymongo import MongoClient

connection = MongoClient('ds139262.mlab.com', 39262)
db = connection['category']
db.authenticate('glstream', 'Stream100')

menu = db.menu


product = menu.find_one({'product': 'Latte'})

print(product['price'])


