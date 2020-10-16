import { DependenciesPolicy } from '@teambit/dependency-resolver';
import { merge } from 'lodash';
import { MainRuntime } from '@teambit/cli';
import { EnvsAspect, EnvsMain } from '@teambit/environments';
import { ReactAspect, ReactMain } from '@teambit/react';
import { NodeAspect } from './node.aspect';
import { NodeEnv } from './node.env';

export class NodeMain {
  constructor(
    private react: ReactMain,

    readonly nodeEnv: NodeEnv,

    private envs: EnvsMain
  ) {}

  icon() {
    return 'https://static.bit.dev/extensions-icons/nodejs.svg';
  }

  /**
   * override the TS config of the React environment.
   */
  overrideTsConfig = this.react.overrideTsConfig;

  /**
   * override the jest config of the Node environment.
   */
  overrideJestConfig = this.react.overrideJestConfig;

  /**
   * override the env build pipeline.
   */
  overrideBuildPipe = this.react.overrideBuildPipe;

  /**
   * override package json properties.
   */
  overridePackageJsonProps = this.react.overridePackageJsonProps;

  /**
   * override the preview config in the env.
   */
  overridePreviewConfig = this.react.overridePreviewConfig;

  /**
   * override the dev server configuration.
   */
  overrideDevServerConfig = this.react.overrideDevServerConfig;

  /**
   * override the dependency configuration of the component environment.
   */
  overrideDependencies(dependencyPolicy: DependenciesPolicy) {
    return this.envs.override({
      getDependencies: () => merge(dependencyPolicy, this.nodeEnv.getDependencies()),
    });
  }

  static runtime = MainRuntime;
  static dependencies = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const nodeEnv: NodeEnv = envs.merge(new NodeEnv(), react.reactEnv);
    envs.registerEnv(nodeEnv);
    return new NodeMain(react, nodeEnv, envs);
  }
}

NodeAspect.addRuntime(NodeMain);
