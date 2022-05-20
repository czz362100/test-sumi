import { Injector } from '@opensumi/di';
import { ClientApp, IClientAppOpts } from '@opensumi/ide-core-browser';
import { ToolbarActionBasedLayout } from '@opensumi/ide-core-browser/lib/components';
import '@opensumi/ide-i18n/lib/browser';
import { defaultConfig } from '@opensumi/ide-main-layout/lib/browser/default-config';
import { CommonBrowserModules } from '../common-modules';
import '@opensumi/ide-core-browser/lib/style/index.less';
import '@opensumi/ide-core-browser/lib/style/icon.less';
import { ExpressFileServerModule } from '@opensumi/ide-express-file-server/lib/browser';
import { SlotLocation } from '@opensumi/ide-core-browser';
import { WebLiteModule } from '../web-lite';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { ensureDir } from '@opensumi/ide-core-common/lib/browser-fs/ensure-dir';
import { AbstractHttpFileService, BrowserFsProvider, BROWSER_HOME_DIR } from '../web-lite/file-provider/browser-fs-provider';
import * as BrowserFS from 'browserfs';
import * as React from 'react';
import { HttpFileService } from '../web-lite/file-provider/http-file.service';
import { IDiskFileProvider } from '@opensumi/ide-file-service/lib/common';

const layoutConfig = {
  [SlotLocation.top]: {
    modules: ['@opensumi/ide-menu-bar'],
  },
  [SlotLocation.action]: {
    modules: [''],
  },
  [SlotLocation.left]: {
    modules: ['@opensumi/ide-explorer', 'test-view'],
  },
  [SlotLocation.main]: {
    modules: ['@opensumi/ide-editor'],
  },
  [SlotLocation.right]: {
    modules: [],
  },
  [SlotLocation.statusBar]: {
    modules: ['@opensumi/ide-status-bar'],
  },
  [SlotLocation.bottom]: {
    modules: ['@opensumi/ide-output'],
  },
  [SlotLocation.extra]: {
    modules: [],
  },
};
export default function () {

  const opts: IClientAppOpts = {
    modules: [WebLiteModule, ...CommonBrowserModules, ExpressFileServerModule],
    layoutConfig,
    useCdnIcon: true,
    noExtHost: true,
    defaultPreferences: {
      'general.theme': 'ide-light',
      'general.icon': 'vsicons-slim',
      'application.confirmExit': 'never',
      'editor.quickSuggestionsDelay': 100,
      'editor.quickSuggestionsMaxCount': 50,
      'editor.scrollBeyondLastLine': false,
      'general.language': 'en-US',
    },
    workspaceDir: `/gitlab/opensumi/core`,
  }
  const injector = new Injector()
  opts.injector = injector
  // TODO: 框架在新版本加了不允许覆盖file协议的限制，这里通过DI覆盖，后续需要确认下是否要必要加这个限制
  injector.addProviders({
    token: AbstractHttpFileService,
    useClass: HttpFileService,
  });
  const httpFs: AbstractHttpFileService = injector.get(AbstractHttpFileService);

  injector.addProviders({
    token: IDiskFileProvider,
    useValue: new BrowserFsProvider(httpFs, { rootFolder: '/gitlab/opensumi/core' }),
  });
  const app = new ClientApp(opts)

  let App: React.ReactElement

  app.start((app) => {
    return new Promise((r) => {
      const target = document.getElementById('root')
      const MyApp = <div id='custom-wrapper' style={{ height: '100%', width: '100%' }}>{app}</div>;
      ReactDOM.render(MyApp, target, r)
    })
  })

  useEffect(() => {
    // app.start((APP) => {
    //   return new Promise(resolve => {
    //     const target = document.getElementById('root')
    //     ReactDOM.render(APP, target)
    //     resolve()
    //   })
    // })
  })
  return (
    <>
      {/* <App/> */}
    </>
  )
}