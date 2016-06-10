import React from 'react';
import {resetConnectorsIds} from 'relate-js';

function processElement ({element, context, rootDataConnectors, dataConnectors}) {
  const {props, type} = element;

  if (typeof type === 'function') {
    const ElementClass = element.type;
    const Element = new ElementClass(element.props, context);

    if (type.relateIdentifier === 'ROOT_DATA_CONNECT') {
      rootDataConnectors.push(Element);
    } else if (type.relateIdentifier === 'DATA_CONNECT') {
      dataConnectors.push(Element);
    }

    // Generate context for children
    let newContext = context;
    if (Element.getChildContext) {
      newContext = Object.assign({}, context, Element.getChildContext());
    }

    // go through children
    const renderResult = Element.render();
    processElement({
      element: renderResult,
      context: newContext,
      rootDataConnectors,
      dataConnectors
    });
  } else if (props && props.children) {
    React.Children.forEach(props.children, (childElement) => {
      processElement({
        element: childElement,
        context,
        rootDataConnectors,
        dataConnectors
      });
    });
  }
}

function getData (query) {
  return {
    data: {
      pages: [
        {
          _id: 'a',
          title: 'A'
        },
        {
          _id: 'b',
          title: 'B'
        }
      ],
      page: {
        _id: 'c',
        title: 'C',
        date: 123
      }
    },
    errors: null
  };
}

export default async function getAllDataDependencies (rootElement) {
  const rootDataConnectors = [];
  const dataConnectors = [];

  resetConnectorsIds();

  // traverse tree
  processElement({
    element: rootElement,
    context: {relate_ssr: getData},
    rootDataConnectors,
    dataConnectors
  });

  // fetch data for each root data connector
  for (const rootDataConnector of rootDataConnectors) {
    await rootDataConnector.fetchData();
  }

  resetConnectorsIds();
}
