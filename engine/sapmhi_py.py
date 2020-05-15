from iqoptionapi.stable_api import IQ_Option
import time, json
import sys


tempo_vela = sys.argv[2]
tipo_vela = sys.argv[1]

def get_perfil():
    #perfil = json.loads(json.dumps(c.get_user_profile_client()))

    return perfil

#login = input("\n Login: ")
#senha = input("\n Senha: ")

#conexão com a conta iq
#c = IQ_Option(login,senha)

c = IQ_Option('dudu.rserpa@gmail.com','dudu123les')

c.connect()
c.get_server_timestamp()

while True:
    if c.check_connect() == False:
        print('Erro ao se conectar, tentando novamente...')
        c.connect()
    else:
        print('Conectado com sucesso!!!')
        break
    
c.change_balance("PRACTICE")

c.reset_practice_balance()

dict_teste = c.get_all_open_time()

hora_atual = time.time()

vela = c.get_candles("EURUSD",3600,1,hora_atual)

lista_velas = dict(vela[0])

valida = lista_velas["open"] - lista_velas["close"]

if valida > 0:
    print("put")
else:
    print("call")


#print(c.get_all_ACTIVES_OPCODE())
#c.buy(1000,'USDJPY','PUT',5)
#print(c.get_all_open_time())

#print("tempo:"+tempo_vela+" - "+"tipo:"+tipo_vela)
