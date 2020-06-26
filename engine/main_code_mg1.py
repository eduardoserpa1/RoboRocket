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
delay = int(sys.argv[7])
tipo_conta = str(sys.argv[8])
login = str(sys.argv[9])
senha = str(sys.argv[10])



lista_analise = []
x=True

if tipo_vela==60:
    tipo_vela_compra = 1
else:
    tipo_vela_compra = 5

conta = iq_util.conexao_iq(login,senha)

conta.change_balance(tipo_conta)

delay_final= 58-delay

while x==True:
    hora_atual = time.time()
    hora_atual_analise = time.localtime()
    hora_atual_analise = int(hora_atual_analise.tm_sec)

    if hora_atual_analise==delay_final:
        x=False
        vela = conta.get_candles(ativo,tipo_vela,1,hora_atual)
    
    time.sleep(1)

lista_velas = dict(vela[0])

valida = lista_velas["open"] - lista_velas["close"]


if valida!=0:
    if valida > 0:
        lista_analise.append('p')
    else: 
        lista_analise.append('c')

    if lista_analise[0] == ordem_executada:
        r = "win"
    else:
        if ordem_executada == "p":
            ordem_executada="put"
        else:
            ordem_executada="call"

        if e2>=1:
            conta.buy(e2,ativo,ordem_executada,tipo_vela_compra)
            r = "loss"
        else:
            r="lossmg0"   
else:
    r="win"
    






print(r)




