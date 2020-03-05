const quantitativaContinua = function(max, min, totalElem){
    this.ampl = max - min
    this.classeLinha = Number(Math.sqrt(totalElem).toFixed(0))
    this.classeLinhaMaisUm = classeLinha + 1
    this.classeLinhaMenosUm = classeLinha - 1
    let resto = 1
    while(resto == 1){
        if(ampl % classeLinhaMenosUm != 0 && ampl % classeLinhaMaisUm != 0 && ampl % classeLinhaMenosUm != 0){
            ampl ++
        }else if(ampl % classeLinhaMaisUm == 0){
            let resultado = ampl / classeLinhaMaisUm
            resto = 0
            console.log(resultado)
            this.formatoTabela = [classLinhaMaisUm, resultado]
        }else if(ampl % classeLinhaMenosUm == 0){
            let resultado = ampl / classeLinhaMenosUm
            resto = 0
            this.formatoTabela = [classeLinhaMenosUm, resultado]
        }else if(ampl % classeLinha == 0){
            let resultado = ampl/classeLinha
            resto = 0
            this.formatoTabela = [classeLinha, resultado]
        } 
    }
        return formatoTabela
}    
console.log(quantitativaContinua(56, 18, 37))