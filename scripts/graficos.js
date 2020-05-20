function criaGrafico(){
    let ctx = document.getElementById('grafico').getContext('2d');
    var grafico = new Chart(ctx,{
        type: 'bar',
        title: true,
        legend: {
            display: false,
        },
        data: {
            labels: Object.keys(trataInput().countElements),
                datasets: [{
                    data: extraiObj(trataInput().countElements),
                    backgroundColor: 'rgba(113,89,193, 0.8)',
                    borderColor: 'rgba(113,89,193, 1)',
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    stacked: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true,
                        stacked: false
                    }
                }]
            }
    }
});
};

function criaGraficoPizza(){
    let ctx = document.getElementById('grafico').getContext('2d');
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.title = true
    var grafico = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: Object.keys(trataInput().countElements),
            datasets: [{
                data: extraiObj(trataInput().countElements),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
});
};