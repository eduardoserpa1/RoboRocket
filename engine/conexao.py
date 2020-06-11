from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys, logging
import iq_util

t = sys.argv[1]
ativo = sys.argv[2]

r = ""

login = "dudu.rserpa@gmail.com"
senha = "dudu123les"

conta = iq_util.conexao_iq(login,senha)

r += login + ","

conta.change_balance(str(t))

r += str(conta.get_balance()) + ","

profit = conta.get_all_profit()

r += str(profit[ativo]["turbo"])



print(r)