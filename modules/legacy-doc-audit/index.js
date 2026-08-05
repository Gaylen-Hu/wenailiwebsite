import { mkdir, readFile, writeFile } from 'node:fs/promises';

/** Read-only report for documents whose module type is no longer active. */
export default {
  tasks(self) {
    return {
      restoreBackup: {
        usage: 'Restore the complete aposDocs backup created by a cleanup task.',
        async task() {
          const backupPath = `${self.apos.rootDir}/data/temp/legacy-doc-backups/safe-cleanup-2026-08-05T10-04-19-976Z.json`;
          const backup = JSON.parse(await readFile(backupPath, 'utf8'));
          const currentCount = await self.apos.doc.db.countDocuments({});
          if (currentCount !== 0) {
            throw new Error(`Restore aborted: aposDocs is not empty (${currentCount} documents).`);
          }
          const result = await self.apos.doc.db.insertMany(backup.documents, { ordered: true });
          const restored = await self.apos.doc.db.countDocuments({});
          console.log(JSON.stringify({
            backupPath,
            expected: backup.documents.length,
            inserted: result.insertedCount,
            restored
          }, null, 2));
          if (restored !== backup.documents.length) {
            throw new Error(`Restore incomplete: expected ${backup.documents.length}, found ${restored}.`);
          }
        }
      },      cleanupRedirectedPages: {
        usage: 'Back up and delete only legacy about-psge pages protected by 301 redirects.',
        async task() {
          const criteria = { type: 'about-psge' };
          const documents = await self.apos.doc.db.find(criteria).toArray();
          const backupDirectory = `${self.apos.rootDir}/data/temp/legacy-doc-backups`;
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupPath = `${backupDirectory}/redirected-pages-${timestamp}.json`;
          await mkdir(backupDirectory, { recursive: true });
          await writeFile(backupPath, JSON.stringify({ createdAt: new Date().toISOString(), criteria, documents }, null, 2), 'utf8');
          const result = await self.apos.doc.db.deleteMany(criteria);
          const remaining = await self.apos.doc.db.countDocuments(criteria);
          console.log(JSON.stringify({ backupPath, backedUp: documents.length, deleted: result.deletedCount, remaining }, null, 2));
          if (remaining) {
            throw new Error(`Cleanup incomplete: ${remaining} redirected pages remain.`);
          }
        }
      },      cleanupSafeTypes: {
        usage: 'Back up and delete only obsolete i18n-static documents and named student test documents.',
        async task() {
          const types = [ '@apostrophecms/i18n-static', 'student' ];
          const criteria = { type: { $in: types } };
          const documents = await self.apos.doc.db.find(criteria).toArray();
          const backupDirectory = `${self.apos.rootDir}/data/temp/legacy-doc-backups`;
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupPath = `${backupDirectory}/safe-cleanup-${timestamp}.json`;
          await mkdir(backupDirectory, { recursive: true });
          await writeFile(backupPath, JSON.stringify({
            createdAt: new Date().toISOString(),
            criteria,
            documents
          }, null, 2), 'utf8');
          const result = await self.apos.doc.db.deleteMany(criteria);
          const remaining = await self.apos.doc.db.countDocuments(criteria);
          console.log(JSON.stringify({
            backupPath,
            backedUp: documents.length,
            deleted: result.deletedCount,
            remaining
          }, null, 2), 'utf8');
          if (remaining) {
            throw new Error(`Cleanup incomplete: ${remaining} legacy documents remain.`);
          }
        }
      },      report: {
        usage: 'Report legacy Apostrophe document types without modifying MongoDB.',
        async task() {
          const types = [
            '@apostrophecms/form',
            '@apostrophecms/i18n-static',
            'about-psge',
            'deafte-page',
            'news-page-page',
            'news-type',
            'product',
            'student'
          ];
          const req = self.apos.task.getReq();
          const docs = await self.apos.doc.find(req, {
            type: { $in: types }
          }).project({
            _id: 1,
            type: 1,
            title: 1,
            slug: 1,
            _url: 1,
            aposLocale: 1,
            createdAt: 1,
            updatedAt: 1
          }).toArray();
          const report = Object.fromEntries(types.map(type => [ type, [] ]));
          for (const doc of docs) {
            report[doc.type].push(doc);
          }
          for (const entries of Object.values(report)) {
            entries.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
          }
          console.log(JSON.stringify({
            total: docs.length,
            types: Object.fromEntries(Object.entries(report).map(([ type, entries ]) => [ type, {
              count: entries.length,
              documents: entries.slice(0, 20)
            }]))
          }, null, 2), 'utf8');
        }
      }
    };
  }
};