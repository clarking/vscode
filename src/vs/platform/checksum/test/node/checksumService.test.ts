/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { getPathFromAmdModule } from 'vs/base/common/amd';
import { Schemas } from 'vs/base/common/network';
import { isWindows } from 'vs/base/common/platform';
import { URI } from 'vs/base/common/uri';
import { ChecksumService } from 'vs/platform/checksum/node/checksumService';
import { IFileService } from 'vs/platform/files/common/files';
import { FileService } from 'vs/platform/files/common/fileService';
import { DiskFileSystemProvider } from 'vs/platform/files/node/diskFileSystemProvider';
import { NullLogService } from 'vs/platform/log/common/log';

suite('Checksum Service', () => {

	let fileService: IFileService;

	setup(() => {
		const logService = new NullLogService();
		fileService = new FileService(logService);

		const diskFileSystemProvider = new DiskFileSystemProvider(logService);
		fileService.registerProvider(Schemas.file, diskFileSystemProvider);
	});

	teardown(() => {
		fileService.dispose();
	});

	test('checksum', async () => {
		const checksumService = new ChecksumService(fileService);

		const checksum = await checksumService.checksum(URI.file(getPathFromAmdModule(require, './fixtures/lorem.txt')));
		assert.strictEqual(checksum, isWindows ? '8mi5KF8kcb817zmlal1kZA' : 'DnUKbJ1bHPPNZoHgHV25sg');
	});
});
