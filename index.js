const fs = require('fs');
let globalAllStates = null;

const readAllJsonFiles = () => {
  fs.readFile('Cidades.json', (err, data) => {
    if (err) {
      console.log('Erro ao ler as cidades');
    }
    const allCities = JSON.parse(data);

    fs.readFile('Estados.json', (err, data) => {
      if (err) {
        console.log('Erro ao ler os estados');
      }
      const allStates = JSON.parse(data);
      globalAllStates = allStates;

      allStates.forEach((state) => {
        if (fs.readdirSync(`States`).length >= 27) {
          return;
        } else {
          createStateFiles(state, allCities);
        }
      });
    });
  });
};

const createStateFiles = (states, allCities) => {
  // variável vai fazer um filtro nas cidades lidas acima e verificar nelas o estado e criar um array
  const mergeCitiesAndStates = allCities.filter(
    (city) => city.Estado === states.ID
  );

  fs.writeFile(
    `States/${states.Sigla}.json`,
    JSON.stringify(mergeCitiesAndStates),
    (err) => {
      if (err) {
        console.log('Erro ao gerar os arquivos');
      }
      return;
    }
  );
};

// Função que busca a cidade por estado com parametro ou todas sem parametro
const citiesForStateParams = (state) => {
  if (state) {
    citiesForState(state);
  } else {
    citiesforAllStates();
  }
};

function citiesforAllStates() {
  globalAllStates.forEach((state) => {
    console.log('todos estados');
    const countCities = fs.readFileSync(`States/${state}.json`);
    const countCitiesParsed = JSON.parse(countCities);
    console.log(`${state} possui ${countCitiesParsed.length} cidade(s)`);
  });
}

const citiesForState = (state) => {
  const countCities = fs.readFileSync(`States/${state}.json`);
  // O método JSON.parse() analisa uma string JSON, construindo o valor ou um objeto JavaScript descrito pela string
  const countCitiesParsed = JSON.parse(countCities);

  console.log(`${state} possui ${countCitiesParsed.length} cidade(s)`);
};

readAllJsonFiles();

console.log('Item 2 - Quantidade de Cidade por Estado.');
citiesForStateParams('MG');
citiesForStateParams();
