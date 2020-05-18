from iqoptionapi.stable_api import IQ_Option
import time

def conexao_iq(login, senha):

    c = IQ_Option(login,senha)

    c.connect()

    c.get_server_timestamp()

    return c
