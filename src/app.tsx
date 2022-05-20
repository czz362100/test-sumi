import { history } from 'umi';
import * as BrowserFS from 'browserfs'
import { ensureDir } from '@opensumi/ide-core-common/lib/browser-fs/ensure-dir';
import { BROWSER_HOME_DIR } from './web-lite/file-provider/browser-fs-provider';
import { DEFAULT_WORKSPACE_STORAGE_DIR_NAME, StoragePaths, isWindows } from '@opensumi/ide-core-browser';

export function render(oldRender: any) {
  BrowserFS.configure({
    fs: "MountableFileSystem",
    options: {
      ['/gitlab/opensumi/core'!]: { fs: "InMemory" },
      // home目录挂载到lcoalstorage来支持一些记录的持久化，不需要持久化可以注释掉
      // '/home': { fs: "LocalStorage", options: {} },
    }
  }, async function (e) {
    const fs = await import('fs')
    // var fs = require('fs');
    await ensureDir('/gitlab/opensumi/core');
    await ensureDir(BROWSER_HOME_DIR.codeUri.fsPath);
    if (isWindows) {
      await ensureDir(
        BROWSER_HOME_DIR.path.join(
          StoragePaths.WINDOWS_APP_DATA_DIR,
          StoragePaths.WINDOWS_ROAMING_DIR,
          DEFAULT_WORKSPACE_STORAGE_DIR_NAME,
        ).toString(),
      );
    } else {
      await ensureDir(BROWSER_HOME_DIR.path.join(DEFAULT_WORKSPACE_STORAGE_DIR_NAME).toString());
    }
    oldRender()
  });
}