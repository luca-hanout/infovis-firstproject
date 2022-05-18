# infovis-firstproject
<b>Visualizzazione delle informazioni 2021/2022: primo progetto individuale</b>

REQUISITI DEL PROGETTO: <br> Crea un file json con dei dati multivariati: ci sono 10 data-cases e ogni data-case ha cinque variabili quantitative i cui valori sono tutti positivi. Disegna questo dataset tramite un diagramma "star plot" (ogni variabile ha un suo asse, tutti gli assi si irradiano dallo stesso punto, consulta le slides sulla rappresentazione dei dati multivariati) in cui la prima variabile è usata per il primo asse, la seconda variabile è usata per il secondo asse e la terza variabile è usata per il terzo asse e così via. Facendo click con il pulsante sinistro del mouse sul bordo del poligono corrispondente ad un data-point questo diventa internamente colorato, mentre tutti gli altri rimangono trasparenti. Fai in modo che le transizioni da una rappresentazione all'altra avvengano in modo fluido con un'animazione. Usa le scale d3.js per mappare l'intervallo dei valori delle variabili (che è arbitrario) sull'intervallo dei valori delle coordinate, che dipende dalla tua interfaccia.

FUNZIONALITA' IMPLEMENTATE: <br>
1) Creato file json con dei dati casuali inerenti alcuni calciatori italiani
2) Disegnato un diagramma star plot che rappresenta tali dati
3) Disegnati una serie di punti che rappresentano i valori di ciascuna variabile
4) Viene evidenziato il passaggio con il mouse su un punto mediante ingrandimento del punto stesso e tramite modifica del cursore
5) Al click su uno dei punti, il poligono corrispondente diventerà temporaneamente colorato per poi tornare nuovamente trasparente
6) Aggiunta legenda con indicazione del colore associato a ciascun calciatore
7) Viene evidenziato il passaggio con il mouse sul nome di un calciatore mediante ingrandimento del nome stesso e tramite modifica del cursore
8) Al click sul nome di un calciatore il poligono corrispondente diventerà temporaneamente colorato per poi tornare nuovamente trasparente

ANTEPRIMA:
![image](https://user-images.githubusercontent.com/12020190/169171785-c85e2e78-6bd8-43bb-82e9-f37ef153a803.png)



