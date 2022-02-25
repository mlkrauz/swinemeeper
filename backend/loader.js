// Gross fix for using ESM imports and typescript AND nodemon w/ TS-Node
// Taken from https://github.com/TypeStrong/ts-node/discussions/1450 on 2022/02/24.

import { resolve as resolveTs } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'
import { pathToFileURL } from 'url'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve (specifier, ctx, defaultResolve) {
  const match = matchPath(specifier)
  return match
    ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
    : resolveTs(specifier, ctx, defaultResolve)
}

export { load, getFormat, transformSource } from 'ts-node/esm'