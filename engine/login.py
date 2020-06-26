from iqoptionapi.stable_api import IQ_Option
import time, json
import hashlib
import sys, logging
import mysql.connector

user = str(sys.argv[1])
password = str(sys.argv[2])

conexao = mysql.connector.connect(
  host="34.95.184.156",
  user="root",
  password="0B10ritsq#",
  database="RocketBD"
)

cursor = conexao.cursor()

cursor.execute("SELECT * FROM login")

r = cursor.fetchall()

verifica1 = False
verifica2 = False
final= False

for x in r:
    if user == x[1]:
        verifica1=True

c = IQ_Option(user,password)

check, reason = c.connect()

if str(check)=="True":
    verifica2=True

if verifica1==True and verifica2==True:
    final = True

if reason == '{"code":"requests_limit_exceeded","message":"The number of requests has been exceeded. Try again in 10 minutes.","ttl":600}':
    final = "tempo"
print(str(final))