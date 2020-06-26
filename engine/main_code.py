from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys, logging
import iq_util

e1 = int(sys.argv[1])
e2 = int(sys.argv[2])
e3 = int(sys.argv[3])
tipo_vela = int(sys.argv[4])
ativo = str(sys.argv[5])
delay = int(sys.argv[6])
tipo_conta = str(sys.argv[7])
login = str(sys.argv[8])
senha = str(sys.argv[9])



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
    
    hora_atual_analise = time.localtime()
    hora_atual_analise = int(hora_atual_analise.tm_sec)

    if hora_atual_analise==delay_final:
        x=False
        vela = conta.get_candles(ativo,tipo_vela,9,time.time())
    
    time.sleep(1)





for i in range(9):

    lista_velas = dict(vela[i])

    valida = lista_velas["open"] - lista_velas["close"]

    if valida > 0:
        lista_analise.append('p')
    else: 
        lista_analise.append('c')

 

lista_analise.pop(1)
lista_analise.pop(1)
lista_analise.pop(1)
lista_analise.pop(1)

cont_c=0
cont_p=0

if lista_analise[2]=='c':
    cont_c+=1
else:
    cont_p+=1

if lista_analise[3]=='c':
    cont_c+=1
else:
    cont_p+=1

if lista_analise[4]=='c':
    cont_c+=1
else:
    cont_p+=1



if cont_c>cont_p:
    conta.buy(e1,ativo,"put",tipo_vela_compra)
    r= "p" 
else:
    conta.buy(e1,ativo,"call",tipo_vela_compra)
    r= "c" 



print(r)




