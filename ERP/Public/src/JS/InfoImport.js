// SETS EVENT LISTENER TO BUTTONS AND ATRIBUTES THEIR RESPECTIVE CLASSES TO BUILD THE SCREEN 
let state = {
    selecTed: undefined,
};

function selecTed(buildScreen) {
    console.log(`selecTed function called with argument: ${buildScreen}`);
    return buildScreen; 
}

const validButtonValues = ["Colabs", "Ferias", "Materiais", "Movimentos", "Eventos", "Agenda", "config"]
const handleState = {
    set(target, property, value) {
        console.log(`handleState set called with property: ${property}, value: ${value}`);
        if (property === "selecTed" && value !== undefined && validButtonValues.includes(value)) {
            console.log(`Building ${value} screen`);
            getData(value); 
        }
        target[property] = value; 
        return true; 
    }
};;

const stateProxy = new Proxy(state, handleState);

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('li.menuItem');
    // Iterate over each <li> element
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const anchorTag = item.querySelector('a');
            if (anchorTag) {
                const buildScreen = anchorTag.className;
                console.log(`Menu item clicked, className: ${buildScreen}`);
                stateProxy.selecTed = selecTed(buildScreen); // Set the state through proxy
                buildTable(stateProxy.selecTed); // Pass buildScreen to buildTable
            }
        });        
    });
});
let endPoint = stateProxy.selected
// SENDS CALL TO API AND STORES INFO
    // ENDPOINTSUFFIX IS A PART OF THE STATEPROXY AND STORES THE ENDPOINT OF THE FUNCTION
async function getData(endPoint) { 
    try {
        console.log('Fetching data...');
        const infob = await fetch(`https://myapi-ge5m.onrender.com/${endPoint}`);
        const inforesp = await infob.json();
        setScreen(inforesp);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function setScreen(result) {
    let myArray = [result];
    buildTable(myArray, stateProxy.selecTed); // Pass selecTed as endPoint
}

// BEGINS BUILDING THE TABLE WITH STORED DATA 

let headArr = [
    {
        suffix: "Colabs",
        headers: {Ident:"ID", Name:"Nome", Date_one:"Contratação", Date_two:"Periodo de Aquisição", Extra: "Ferias Vencidas"}
    },
    {
        suffix: "Ferias",
        headers: {Ident:"ID", Name:"Colaborador", Date_one:"Dias de Ferias", Date_two:"Dias Vendidos", Extra: "Empresa"}
    },
    {
        suffix: "Materiais",
        headers: {Ident:"ID", Name:"Nome do Material", Date_one:"Validade", Date_two:"Validade do CA", Extra: "Empresa"}
    }
]; 
function setHead(endPoint) {
    if(endPoint){
    console.log(`setHead called with endPoint: ${endPoint}`);
    const headerConfig = headArr.find(item => item.suffix.toLowerCase() === endPoint.toLowerCase());
    if (!headerConfig) return ''; 
    const { Ident, Name, Date_one, Date_two, Extra } = headerConfig.headers; 
    return `
        <thead>
            <tr>
                <th>${Ident}</th>
                <th>${Name}</th>
                <th>${Date_one}</th>
                <th>${Date_two}</th>
                <th>${Extra}</th>
            </tr>
        </thead>`;
    }
}

function buildTable(data, endPoint) { 
    let suffix = (typeof endPoint === 'string') ? endPoint.toLowerCase() : '';
    let rows = '';
    let table = document.getElementById('StartTable');
    let head = setHead(endPoint);
    table.innerHTML = ''; // Clear the table before adding new rows
    if(suffix === "colabs"){
        console.log('Building table with data:', data);
    
        for (let i = 0; i < data.length; i++) {
            // Date Manipulation
            const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            var hireDate = new Date(data[i].hire_date),
                mes = hireDate.getMonth(),
                dia = hireDate.getDate() + 1,
                ano = hireDate.getFullYear(); 
            var aDate = new Date(data[i].aquisition_one),
                aqMo1 = aDate.getMonth(),
                aqDa1 = aDate.getDate() + 1,
                aqYe1 = aDate.getFullYear(); 
            var aDate2 = new Date(data[i].aquisition_two),
                aqMo2 = aDate2.getMonth(),
                aqDa2 = aDate2.getDate() + 1,
                aqYe2 = aDate2.getFullYear();
            var compDateHi = `${dia} ${months[mes]} ${ano}`; 
            var aquisition = `${aqDa1} ${months[aqMo1]} ${aqYe1} - ${aqDa2} ${months[aqMo2]} ${aqYe2}`;

            // Class manipulation
            let cClas = data[i].ferias > 0 ? 'urgent' : 'normal';
            // Concatenating the HTML 
            let row = `
                <tr>
                    <td>${data[i].ID}</td>
                    <td>${data[i].colab_nome}</td>
                    <td class='fit'>${compDateHi}</td>
                    <td>${aquisition}</td>
                    <td>
                        <p class="${cClas}">${data[i].ferias} Ferias</p>
                    </td>
                </tr>`;
            rows += row; 
        }
        let body = `<tbody>${rows}</tbody>`
        table.innerHTML = head+body;
    }
    if(suffix ==="ferias"){ 
        let row = ``
        rows +=row
        let body = `<tbody>${rows}</tbody>`
        table.innerHTML = head+body; 
    }

} 
// adding comments

