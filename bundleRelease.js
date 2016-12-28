/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

const meta = require('./meta');
const writeFile = require('./writeFile');

import type Bundle from '../../../packager/react-packager/src/Bundler/Bundle';
import type Server from '../../../packager/react-packager/src/Server';
import type {OutputOptions, RequestOptions} from '../types.flow';


function createCodeWithMap(bundle: Bundle, dev: boolean, moduleIDS): * {
  if (moduleIDS) {
    let modules = bundle.getModules();
    let code = moduleIDS.map((id) => {
        return modules[id].code;
      }).join('\n');
    return {
      code: code,
      map: JSON.stringify(bundle.getSourceMap({dev})),
    };
  } else {
    return {
      code: bundle.getSource({dev}),
      map: JSON.stringify(bundle.getSourceMap({dev})),
    };
  }
}

function saveBundleAndMap(
  bundle: Bundle,
  options: OutputOptions,
  log: (x: string) => {},
): Promise<> {
  const {
    bundleOutput,
    bundleEncoding: encoding,
    dev,
    sourcemapOutput,
    entryFile
  } = options;

  log('start release');
  let modules = bundle.getModules();
  let baseModules = [];
  let appModules = [];
  for(let i=0; i<modules.length; i++) {
    let module = modules[i];
    let ind = module.sourcePath.indexOf('node_modules\\');
    let isEntryFile = module.sourcePath.indexOf(entryFile) !== -1;
    if (ind !== -1 || isEntryFile || module.id < 0) {
      baseModules.push(i);
      // console.log('11111111111111111 path=' + module.sourcePath + '; name=' + module.name + '; ID=' + module.id);
    } else {
      appModules.push(i);
      // console.log('22222222222222222 path=' + module.sourcePath + '; name=' + module.name + '; ID=' + module.id);
    }
    // log('module path=' + module.sourcePath + '; name=' + module.name);
  }
  for(let i=0; i<2; i++) {
    const codeWithMap = createCodeWithMap(bundle, !!dev, i===0?baseModules:appModules);
    log('finish');

    log('Writing bundle output to:', bundleOutput);

    const {code} = codeWithMap;
    const writeBundle = writeFile(bundleOutput + (i===0?'':'.app'), code, encoding);
    const writeMetadata = writeFile(bundleOutput + (i===0?'':'.app') + '.meta', meta(code, encoding), 'binary');
    Promise.all([writeBundle, writeMetadata])
      .then(() => log('Done writing bundle output'));

    if (i === 1) {
      if (sourcemapOutput) {
        log('Writing sourcemap output to:', sourcemapOutput);
        const writeMap = writeFile(sourcemapOutput, codeWithMap.map, null);
        writeMap.then(() => log('Done writing sourcemap output'));
        return Promise.all([writeBundle, writeMetadata, writeMap]);
      } else {
        return writeBundle;
      }
    }
  }
}

exports.saveBundleAndMap = saveBundleAndMap;
