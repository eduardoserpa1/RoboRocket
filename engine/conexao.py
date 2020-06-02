from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys, logging
import iq_util

t = sys.argv[1]

conta = iq_util.conexao_iq("","")