import 'babel-polyfill';

import fs from 'fs';
import Benchmark from 'benchmark';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react/dist/react.min';

import createStore from './src/create-store';
import getDataDependencies from './src/get-data-dependencies';
import RootComponent from './src/components';

async function checkResult (component) {
  await getDataDependencies(component);
  const result = renderToString(component);
  fs.writeFile('./build/result.html', result, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('Result saved!');
  });
}

async function renderRoute (component) {
  await getDataDependencies(component);
  renderToString(component);
}

async function renderRouteRelate (component) {
  await getDataDependencies(component);
}

function getComp () {
  const store = createStore();

  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}

const suite = new Benchmark.Suite;

function output (bench) {
  console.log(bench.name);
  console.log('Mean:', bench.stats.mean * 1000, 'ms');
  console.log('Std dev:', bench.stats.deviation * 1000, 'ms');
}

suite
  .add('Relate + React', {
    defer: true,
    fn: (deferred) => {
      renderRoute(getComp())
        .then(() => {
          deferred.resolve();
        })
        .catch((error) => {
          console.log('error', error);
          deferred.reject();
        });
    }
  })
  .add('Relate', {
    defer: true,
    fn: (deferred) => {
      renderRouteRelate(getComp())
        .then(() => {
          deferred.resolve();
        })
        .catch((error) => {
          console.log('error', error);
          deferred.reject();
        });
    }
  })
  .add('React', {
    fn: () => {
      renderToString(getComp());
    }
  })
  .on('complete', function () {
    output(this[0]);
    output(this[1]);
    output(this[2]);
    checkResult(getComp());
  })
  .run();

// const bench = new Benchmark('relate + react', {
//   defer: true,
//   fn: (deferred) => {
//     renderRoute(getComp())
//       .then(() => {
//         deferred.resolve();
//       })
//       .catch((error) => {
//         console.log('error', error);
//         deferred.reject();
//       });
//   },
//   onComplete: (results) => {
//     const stats = results.target.stats;
//     console.log('relate + react');
//     console.log('Mean:', stats.mean * 1000, 'ms');
//     console.log('Std dev:', stats.deviation * 1000, 'ms');
//   }
// });
// bench.run();
