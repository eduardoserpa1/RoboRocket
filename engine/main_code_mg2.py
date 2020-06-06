from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys, logging
import iq_util

e1 = int(sys.argv[1])
e2 = int(sys.argv[2])
e3 = int(sys.argv[3])
tipo_vela = int(sys.argv[4])
ativo = str(sys.argv[5])
ordem_executada = str(sys.argv[6])



lista_analise = []
x=True

if tipo_vela==60:
    tipo_vela_compra = 1
else:
    tipo_vela_compra = 5

conta = iq_util.conexao_iq("dudu.rserpa@gmail.com","dudu123les")

while x==True:
    hora_atual = time.time()
    hora_atual_analise = time.localtime()
    hora_atual_analise = int(hora_atual_analise.tm_sec)

    if hora_atual_analise%58==0:
        x=False
        vela = conta.get_candles(ativo,tipo_vela,1,hora_atual)
    
    time.sleep(1)

lista_velas = dict(vela[0])

valida = lista_velas["open"] - lista_velas["close"]

if valida > 0:
    lista_analise.append('p')
else: 
    lista_analise.append('c')

 
if lista_analise[0] == ordem_executada:
    r = "win"


if lista_analise[0] != ordem_executada:
    if ordem_executada == "p":
        ordem_executada="put"
    else:
        ordem_executada="call"

    conta.buy(e2,ativo,ordem_executada,tipo_vela_compra)
    r = "loss - gale 2"



print(r)




