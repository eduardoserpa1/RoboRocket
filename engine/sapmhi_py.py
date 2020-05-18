from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys
import iq_util

div_final = ""

tempo_vela = sys.argv[2]
tipo_vela = sys.argv[1]

c = iq_util.conexao_iq("dudu.rserpa@gmail.com","dudu123les")

while True:
    if c.check_connect() == False:
        div_final += "falha ao conectar, tente mais tarde..."
        c.connect()
    else:
        div_final += "conectado com sucesso !!!"
    break


dict_teste = c.get_all_open_time()

hora_atual = time.time()

vela = c.get_candles("USDJPY",3600,2,hora_atual)

lista_velas = dict(vela[0])

valida = lista_velas["open"] - lista_velas["close"]

div_final += "<br>"+ str(lista_velas["open"])
div_final += "<br>"+ str(lista_velas["close"])

div_final += "<br>" + str(valida)

if valida > 0:
    div_final += "<br> put"
else:
    div_final += "<br> call"

print(div_final)
#print(c.get_all_ACTIVES_OPCODE())
#c.buy(1000,'USDJPY','PUT',5)
#print(c.get_all_open_time())

#print("tempo:"+tempo_vela+" - "+"tipo:"+tipo_vela)
