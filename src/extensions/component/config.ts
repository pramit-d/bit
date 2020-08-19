import { PathLinux } from '../../utils/path';
import { ExtensionDataList } from '../../consumer/config/extension-data';
import { Compilers, Testers } from '../../consumer/config/abstract-config';
import { ComponentOverridesData } from '../../consumer/config/component-overrides';
// import { CustomResolvedPath } from '../../consumer/component/consumer-component';
// import { ComponentOverridesData } from '../../consumer/config/component-overrides';

type LegacyConfigProps = {
  lang?: string;
  compiler?: string | Compilers;
  tester?: string | Testers;
  bindingPrefix: string;
  extensions?: ExtensionDataList;
  overrides?: ComponentOverridesData;
};

/**
 * in-memory representation of the component configuration.
 */
export default class Config {
  constructor(
    /**
     * version main file
     */
    readonly main: PathLinux,

    /**
     * configured extensions
     */
    readonly extensions: ExtensionDataList,

    readonly legacyProperties?: LegacyConfigProps
  ) {}
}
