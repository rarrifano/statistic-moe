function trataInput(){
    let valor = document.getElementById("input").value
    let sheetParamters = []
    sheetParamters.push(valor.split(';'))
    let realSheetParameters = sheetParamters 
    realSheetParameters[0].sort((a,b) => a-b)
    console.log('vetor: ' + realSheetParameters[0])
    var countElements = {}
    realSheetParameters[0].forEach(function(i){ countElements[i] = (countElements[i]||0)+1})
    console.log(countElements)
    let maiorNumero = realSheetParameters[0][realSheetParameters[0].length - 1]
    console.log("Maior: " + maiorNumero)
    let menorNumero = realSheetParameters[0][0]
    console.log("Menor: "+ menorNumero)
    let totaldeIndicesVetor = realSheetParameters[0].length
    console.log("Total: " + totaldeIndicesVetor)
    return {realSheetParameters, maiorNumero, menorNumero, totaldeIndicesVetor, countElements}

}

//Function what returns a number of lines and the number of colomns of a tabulation 
const quantitativaContinua = function(max, min, totalElem){
    let amplitude = max - min //calcula a amplitude da serie
    let classeLinha = Number(Math.sqrt(totalElem).toFixed(0)) 
    let classeLinhaMaisUm = classeLinha + 1
    let classeLinhaMenosUm = classeLinha - 1
    let resto = 1
    while(resto == 1){
        if(amplitude % classeLinhaMenosUm != 0 && amplitude % classeLinhaMaisUm != 0 && amplitude % classeLinhaMenosUm != 0){
            amplitude ++
        }else if(amplitude % classeLinhaMaisUm == 0){
            let resultado = amplitude / classeLinhaMaisUm
            resto = 0
            this.formatoTabela = [classeLinhaMaisUm, resultado]
        }else if(amplitude % classeLinhaMenosUm == 0){
            let resultado = amplitude / classeLinhaMenosUm
            resto = 0
            this.formatoTabela = [classeLinhaMenosUm, resultado]
        }else if(amplitude % classeLinha == 0){
            let resultado = amplitude/classeLinha
            resto = 0
            this.formatoTabela = [classeLinha, resultado]
        } 
    }
        return formatoTabela
}
console.log(quantitativaContinua(56, 18, 37))

