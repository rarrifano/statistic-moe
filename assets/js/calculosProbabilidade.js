/*Modulo responsável por fazer os calculos de probabilidade(Distribuiçao,termo estatistico),
  Os seguintes calculos são realizados:
  - Probabilidade Nominal
  - Probabilidade Binomial
  - Probabilidade Normal
  
  Há também funções auxiliares de analise combinatóra e fatorial, para calculo da Probabilidade Binomial
  Foi inserido a função que retorna o o valor da Tabela de valor Z na posição informada na função prob Normal
  Código escrito por: Douglas Soares Silva 3º Noturno ADS Fatec Franca
  Ultima edição: 22/06/2020
*/

function probNominal(){
    //captura os valores inseridos para realizar o calculo
    let valorPonto = document.getElementById("selecionaNominal").value;
    let valorMin = Number(document.getElementById("min").value);
    let valorMax = Number(document.getElementById("max").value);

    //calculos de média, desvio padrão e coeficiente de variação
    let media = (Number(valorMax) + Number(valorMin))/2;
    let desvioPadrao = Math.sqrt((((valorMax - valorMin) * (valorMax - valorMin))/12)).toFixed(2);
    let coefVariacao = (desvioPadrao/media)*100;

    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado");

    /*Faz o calculo da probabilidade de acordo com os dados inseridos 
      Se o usuário não informar algun dado aparecerá uma mensagem de erro e a Janela modular não abrirá
    */     
    if(valorPonto == "" || valorMin == "" || valorMax == ""){
        alert("Insria todos os dados");
        let botao = document.getElementById('calcular');
        botao.setAttribute("data-target", "");
        apagar();
    }else if(valorPonto == "maior-que"){

        let maiorQue = Number(document.getElementById("maior").value);
        let intervalo = valorMax - maiorQue;
        let probabilidade  = (1/(valorMax - valorMin))* intervalo;
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`;

    }else if(valorPonto == "menor-que"){

        let menorQue = Number(document.getElementById("menor").value);
        let intervalo = menorQue - valorMin;
        let probabilidade  = (1/(valorMax - valorMin))* intervalo;
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`;

    }else if(valorPonto == "entre"){

        let entreInf = Number(document.getElementById("entreMenor").value);
        let entreSup = Number(document.getElementById("entreMaior").value);
        let intervalo = entreSup - entreInf;
        let probabilidade  = (1/(valorMax - valorMin))* intervalo;
        escrever.innerHTML += `<p>Probabilidade: ${(probabilidade*100).toFixed(2)}% </p>`;
    };
    
    escrever.innerHTML += `<p>Média: ${media}</p>`;
    escrever.innerHTML += `<p>Desvio Padrão: ${desvioPadrao}</p>`;
    escrever.innerHTML += `<p>Coefeciente De Variação: ${coefVariacao.toFixed(2)}</p>`;
};

function probBinomial(){
    //Captura dos valores inseridos  nos inputs para ser realizado o calculo,
    let sucesso = Number(document.getElementById("sucesso").value)/100; //conversão para decimal
    let fracasso = Number(document.getElementById("fracasso").value)/100; // conversão para decimal
    let evento = document.getElementById("evento").value;
    let tamanhoAmostra = Number(document.getElementById("tamanhoAmostra").value);
    
    //Declaração das variaveis utilisadas no calculo
    let todosEventos = evento.split(';');
    let probabilidadeAux = [];
    let analise;
    let sucessoElevado;
    let amostraMenosEvento;
    let fracassoElevado;
    let probabilidade;

    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado");

    /*Parte responsável pelo controle dos dados inseridos.
      caso tenha algo errado uma mensagem será exibida ao usuário.
      caso esteja tudo certo o resultado será mostrado ao usuário em uma janela modal
    */
    if(sucesso == '' || fracasso == '' || evento == '' || tamanhoAmostra == ''){

        alert("Insria todos os dados");
        let botao = document.getElementById('calcular2');
        botao.setAttribute("data-target", "");
        apagar()
    }else if(sucesso + fracasso != 1){

        alert("O sucesso mais o fracasso tem que ser igual a 100, verifique os dados");
        let botao = document.getElementById('calcular2');
        botao.setAttribute("data-target", "");
        apagar();
    }else{

        //calculo da média
        let media = tamanhoAmostra * fracasso;

        //caculo do desvio padrão
        let desvioPadrao = Math.sqrt(tamanhoAmostra * sucesso * fracasso);
        // calculo das variaveis para a probabilidade
        for(let i in todosEventos){

            analise = analiseComb(tamanhoAmostra, todosEventos[i]);
            sucessoElevado = Math.pow(sucesso,todosEventos[i]);
            amostraMenosEvento = tamanhoAmostra - todosEventos[i];
            fracassoElevado = Math.pow(fracasso, amostraMenosEvento);
            //calculo da probabilidade
            probabilidade = analise * sucessoElevado * fracassoElevado;
            probabilidadeAux.push(probabilidade);
        }
        
        let probabilidadeFinal = probabilidadeAux.reduce((a,b) => a+b);
    
        escrever.innerHTML += `<p> Probabilidade: ${(probabilidadeFinal*100).toFixed(2)} %`;
        escrever.innerHTML += `<p> Média: ${media.toFixed(2)}`;
        escrever.innerHTML += `<p> Desvio Padrão: ${desvioPadrao.toFixed(2)}`;
    };

};

function probNormal(){
    //Captura dos valores para calculo
    let media = Number(document.getElementById("media").value);
    let desvioPadrao = Number(document.getElementById("desvioPadrao").value);
    let valor = document.getElementById("selecionaNormal").value;

    //captura a div que onde será escrito o resultado
    let escrever = document.getElementById("resultado");

    if(media == '' || desvioPadrao == '' || valor == ''){
        alert("Insria todos os dados");
        let botao = document.getElementById('calcular3');
        botao.setAttribute("data-target", "");
        apagar();

    }else if(valor == "maior-que"){
        let maior = Number(document.getElementById("maior2").value);
        let scoreZ = (maior - media)/desvioPadrao;
        scoreZ = scoreZ.toFixed(2);
        let procuraLinha = Math.floor(scoreZ*10);
        let procuraColuna = Math.round(10*(scoreZ*10 - procuraLinha));
        let probabilidade = (0.5 - tabelaZ(procuraLinha, procuraColuna)) * 100;
        escrever.innerHTML += `<p>Probabilidade: ${probabilidade.toFixed(2)}%`;
    }else if(valor == "menor-que"){
        let menor = Number(document.getElementById("menor2").value);
        let scoreZ = Math.abs((menor - media))/desvioPadrao;
        scoreZ = scoreZ.toFixed(2);
        let procuraLinha = Math.floor(scoreZ*10);
        let procuraColuna = Math.round(10*(scoreZ*10 - procuraLinha));
        let probabilidade = (0.5 - tabelaZ(procuraLinha, procuraColuna)) * 100;
        escrever.innerHTML += `<p>Probabilidade: ${probabilidade.toFixed(2)}%`;
    }else if(valor == "entre"){
        let entreMenor = Number(document.getElementById("entreMenor2").value);
        let entreMaior = Number(document.getElementById("entreMaior2").value);

        //calcula o score Z e a probabilidade do numero informado no primeiro input entre
        let scoreZMenor = Math.abs((entreMenor - media))/desvioPadrao;
        let procuraLinhaMenor = Math.floor(scoreZMenor*10);
        let procuraColunaMenor = Math.round(10*(scoreZMenor * 10 - procuraLinhaMenor));
        let probabilidadeMenor = tabelaZ(procuraLinhaMenor, procuraColunaMenor);

        //calcula o score Z e a probabilidade do numero informado no segundo input entre
        let scoreZMaior = (entreMaior - media)/desvioPadrao;
        let procuraLinhaMaior = Math.floor(scoreZMaior*10);
        let procuraColunaMaior = Math.round(10*(scoreZMaior*10 - procuraLinhaMaior));
        let probabilidadeMaior = tabelaZ(procuraLinhaMaior, procuraColunaMaior);

        //calcula a probabilidade Final
        let probabilidadeEntre = (probabilidadeMenor + probabilidadeMaior) * 100;

        escrever.innerHTML += `<p>Probabilidade: ${probabilidadeEntre.toFixed(2)}%`;
    };
};

function fatorial(n) {
    //função recursiva responsável por fazer o calculo do fatorial de um numero
    if(n < 0) return 0;
    else if(n == 0) return 1;
    else return n * fatorial(n - 1);
};

function analiseComb(n,k){
    //fução para calculo de analise combinatória
    if(n == 0 || k == 0 || n == k || k == n){
    /*primeiro há o tratamento dos casos especiais cujo o resultado é 1 
      quando é feita a analise com 0 ou os dois numeros são iguais o resultado é 1
    */
        return 1;
    }else if(n == 1 || k == 1){
    //caso seja feita a analise combinatória com 1 o resultado é o numero diferente de 1
        if(n != 1 && n != 0){
            return n;
        }else if(k !=1 && k != 0){
            return k;
        }
         
    }else{
    //caso contrário é feito o calculo da analise combinatória de acordo com a formula: n! / (n-k)! * k!
        let fatorialN = fatorial(n);
        let fatorialK = fatorial(k);
        let fatorialNMenosK = fatorial(n - k);

        let combinatoria = fatorialN/(fatorialNMenosK * fatorialK);

        return combinatoria;
    };
};

function tabelaZ(n1, n2){
    const tabelaZ = [
        [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        [0.0389, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0754],
        [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        [0.2258, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
        [0.2580, 0.2612, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        [0.2881, 0.2910, 0.2939, 0.2967, 0.2996, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4893, 0.4808, 0.4812, 0.4817],
        [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        [0.4938, 0.4940, 0.4941, 0.4943, 0.4045, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        [0.4986, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
    ];
    
    return tabelaZ[n1][n2];
}

