const fs = require('fs');
let globalAllStates = [];

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
  const countCities = fs.readFileSync(`Estados.json`);
  const countCitiesParsed = JSON.parse(countCities);
  const countStatesWithCities = countCitiesParsed.map((state) => ({
    state: state.Sigla,
    cities: citiesForState(state.Sigla),
  }));
  return countStatesWithCities;
}

const citiesForState = (state) => {
  const countCities = fs.readFileSync(`States/${state}.json`);
  // O método JSON.parse() analisa uma string JSON, construindo o valor ou um objeto JavaScript descrito pela string
  const countCitiesParsed = JSON.parse(countCities);

  //console.log(`${state} possui ${countCitiesParsed.length} cidade(s)`);

  const totalCities = countCitiesParsed.length;
  // Se não tiver esse retorno a quantidade de cidades fica indefinida
  return totalCities;
};

const statesWithMoreCities = () => {
  const countCities = fs.readFileSync(`Estados.json`);
  const countCitiesParsed = JSON.parse(countCities);
  const countStatesWithCities = countCitiesParsed.map((state) => ({
    uf: state.Sigla,
    cities: citiesForState(state.Sigla),
  }));

  const orderedCities = countStatesWithCities.sort((b, a) => {
    if (a.cities < b.cities) {
      return -1;
    } else if (a.cities > b.cities) {
      return 1;
    }
    return 0;
  });
  // O método slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início(begin) e fim(end)(fim não é necessário) de um array original. O Array original não é modificado.
  console.log(orderedCities.splice(0, 5));
};

const statesWithLessCities = () => {
  const countCities = fs.readFileSync(`Estados.json`);
  const countCitiesParsed = JSON.parse(countCities);
  const countStatesWithCities = countCitiesParsed.map((state) => ({
    uf: state.Sigla,
    cities: citiesForState(state.Sigla),
  }));

  const orderedCities = countStatesWithCities.sort((a, b) => {
    if (a.cities < b.cities) {
      return -1;
    } else if (a.cities > b.cities) {
      return 1;
    }
    return 0;
  });
  console.log(orderedCities.splice(0, 5));
};

// readAllJsonFiles();

console.log('Item 2 - Quantidade de Cidade por Estado.');
citiesForStateParams('MG');
citiesForStateParams();
console.log(
  '_____________________________________________________________________________________________________'
);
console.log('Item 3 - Estados com mais cidades.');
statesWithMoreCities();
console.log(
  '_____________________________________________________________________________________________________'
);
console.log('Item 4 - Estados com menos cidades.');
statesWithLessCities();
console.log(
  '_____________________________________________________________________________________________________'
);
