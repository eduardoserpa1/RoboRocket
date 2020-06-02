from iqoptionapi.stable_api import IQ_Option
import time, json 
import sys, logging
import iq_util

div_final = ""
lista_final = []

tempo_vela = int(sys.argv[2])
tipo_vela = int(sys.argv[1])

c = iq_util.conexao_iq("","")

while True:
    if c.check_connect() == False:
        c.connect()
    else:
        l=0
    break

c.get_server_timestamp()

lista_ativos = c.get_all_open_time()

lista_digital = []

for e in lista_ativos['digital'].keys(): 
    if str(e) == "GBPJPY-OTC":
        div_final += ""
    else:
        if lista_ativos['digital'][str(e)]['open'] == True:
            lista_digital.append(str(e))

horas_segundos = tempo_vela * 3600

qtd_velas_horas = int(horas_segundos/tipo_vela)

index_velas = int(qtd_velas_horas-1)

hora_atual = time.time()

lista_analise = []

inicio= time.time()

x= len(lista_digital)

div_final += str(x)+","

if tipo_vela == 300:
    for t in range(x):
        
        vela = c.get_candles(lista_digital[t],tipo_vela,qtd_velas_horas-1,hora_atual)
    
        lista_analise.append(lista_digital[t])
        

        for i in range(qtd_velas_horas-1):

            lista_velas = dict(vela[i])

            valida = lista_velas["open"] - lista_velas["close"]

            if valida > 0:
         
               lista_analise.append('p')
            else:
          
               lista_analise.append('c')
        
        tamanho_lista_analise = len(lista_analise)


        if tamanho_lista_analise % 5 == 0:
            lista_analise.pop(tamanho_lista_analise-1)

        if tamanho_lista_analise % 5 == 1:
            lista_analise.pop(tamanho_lista_analise-1)
            lista_analise.pop(tamanho_lista_analise-2)
        
        if tamanho_lista_analise % 5 == 2:
            lista_analise.pop(tamanho_lista_analise-1)
            lista_analise.pop(tamanho_lista_analise-2)
            lista_analise.pop(tamanho_lista_analise-3)

        if tamanho_lista_analise % 5 == 3:
            lista_analise.pop(tamanho_lista_analise-1)
            lista_analise.pop(tamanho_lista_analise-2)
            lista_analise.pop(tamanho_lista_analise-3)
            lista_analise.pop(tamanho_lista_analise-4)

        hora_atual_analise = time.localtime()
        hora_atual_analise = int(hora_atual_analise.tm_min)

        qtd_elementos = len(lista_analise)

        qtd_entradas = int(len(lista_analise) / 5) 

        qtd_p = 0
        qtd_c = 0
        qtd_mg = 0
        lista_qtd_win = []

        verifica_win = False

        

        for j in range(qtd_entradas):
            verifica_win = False

            for g in range(3):
                if lista_analise[g+3] == 'p':
                    qtd_p += 1
                else:
                    qtd_c += 1


            if qtd_p > qtd_c:
                if lista_analise[6] == 'c':
                    verifica_win = True
                    qtd_mg = 0
                else:
                    if lista_analise[7] == 'c':
                        verifica_win = True
                        qtd_mg = 1
                    else:
                        if lista_analise[8] == 'c':
                           verifica_win = True
                           qtd_mg = 2
        

            if qtd_c > qtd_p:
                if lista_analise[6] == 'p':
                    verifica_win = True
                    qtd_mg = 0
                else:
                    if lista_analise[7] == 'p':
                        verifica_win = True
                        qtd_mg = 1
                    else:
                       if lista_analise[8] == 'p':
                           verifica_win = True
                           qtd_mg = 2

            if verifica_win == True:
                lista_qtd_win.append('w')
                lista_qtd_win.append(qtd_mg)
            else:
                lista_qtd_win.append('l')
                lista_qtd_win.append(2)
        

            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
    

        lista_aux = []
        lista_aux.append(lista_analise[0])
        lista_aux.append(lista_qtd_win)

        lista_final.append(lista_aux)

        lista_analise.clear()

#ajustar lista para analise
if tipo_vela == 60:
    for t in range(x):

        vela = c.get_candles(lista_digital[t],tipo_vela,qtd_velas_horas+1,hora_atual)
    
        lista_analise.append(lista_digital[t])

        for i in range(qtd_velas_horas):

            lista_velas = dict(vela[i])

            valida = lista_velas["open"] - lista_velas["close"]

            if valida > 0:
         
               lista_analise.append('p')
            else:
          
               lista_analise.append('c')

        hora_atual_analise = time.localtime()
        hora_atual_analise = int(hora_atual_analise.tm_min)

        qtd_elementos = len(lista_analise)

        if tipo_vela != 300:
            if hora_atual_analise % 5 == 0: #certo
                lista_analise.pop(qtd_elementos-1)
                lista_analise.pop(qtd_elementos-2)
        
            if hora_atual_analise % 5 == 1: #certo
                lista_analise.pop(qtd_elementos-1)
                lista_analise.pop(qtd_elementos-2)
                lista_analise.pop(qtd_elementos-3)
        
                lista_analise.pop(1)
                lista_analise.pop(1)
                lista_analise.pop(1)
                lista_analise.pop(1)

            if hora_atual_analise % 5 == 2: #certo
                lista_analise.pop(qtd_elementos-1)
                lista_analise.pop(qtd_elementos-2)
                lista_analise.pop(qtd_elementos-3)
                lista_analise.pop(qtd_elementos-4)
        
                lista_analise.pop(1)
                lista_analise.pop(1)
                lista_analise.pop(1)

            if hora_atual_analise % 5 == 3: #certo
                lista_analise.pop(1)
                lista_analise.pop(1)
    
            if hora_atual_analise % 5 == 4: #certo
                lista_analise.pop(qtd_elementos-1)
                lista_analise.pop(1)
    
   
        qtd_entradas = int(len(lista_analise) / 5) 

        qtd_p = 0
        qtd_c = 0
        qtd_mg = 0
        lista_qtd_win = []

        verifica_win = False

      

        for j in range(qtd_entradas):

            verifica_win = False

            for g in range(3):
                if lista_analise[g+3] == 'p':
                    qtd_p += 1
                else:
                    qtd_c += 1


            if qtd_p > qtd_c:
                if lista_analise[6] == 'c':
                    verifica_win = True
                    qtd_mg = 0
                else:
                    if lista_analise[7] == 'c':
                        verifica_win = True
                        qtd_mg = 1
                    else:
                        if lista_analise[8] == 'c':
                            verifica_win = True
                            qtd_mg = 2
        

            if qtd_c > qtd_p:
                if lista_analise[6] == 'p':
                    verifica_win = True
                    qtd_mg = 0
                else:
                    if lista_analise[7] == 'p':
                        verifica_win = True
                        qtd_mg = 1
                    else:
                        if lista_analise[8] == 'p':
                            verifica_win = True
                            qtd_mg = 2

            if verifica_win == True:
                lista_qtd_win.append('w')
                lista_qtd_win.append(qtd_mg)
            else:
                lista_qtd_win.append('l')
                lista_qtd_win.append(2)
        

            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
            lista_analise.pop(1)
       

        lista_aux = []
        lista_aux.append(lista_analise[0])
        lista_aux.append(lista_qtd_win)

        lista_final.append(lista_aux)

        lista_analise.clear()

qtd_win = 0

#validar porcentagens
for k in lista_final:
    cont = 0
    
    for p in k:
        cont_loss = 0
        cont_win_0mg=0
        cont_win_1mg=0
        cont_win_2mg=0

        if cont%2==0:
            div_final += str(p)+","
        else:  

            cont_win = int(len(p) / 2)

            for h in range(0,cont_win,2):
             
                if p[h] == 'w':
                    if p[h+1] == 0:
                        
                        cont_win_0mg += 1
                    
                    
                    if p[h+1] == 1:
                        cont_win_1mg += 1
                        #cont_win_2mg += 1
                    
                    if p[h+1] == 2:
                        cont_win_2mg += 1
                else:
                    cont_loss += 1

                   
            
            total_entradas = cont_loss + cont_win_0mg + cont_win_1mg + cont_win_2mg
            div_final += str( round((cont_win_0mg*100) /total_entradas,1) ) + ","
            div_final += str( round(( (cont_win_0mg+cont_win_1mg) *100) /total_entradas,1) ) + ","
            div_final += str( round(( (cont_win_0mg+cont_win_1mg+cont_win_2mg) *100) /total_entradas,1) ) + ","
        
        cont += 1

fim = time.time()



print(div_final)


