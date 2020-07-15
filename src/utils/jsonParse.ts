import { OfflineData } from '@/interfaces/OfflineData';
import { SeriesStub } from '@/interfaces/SeriesStub';

import { isSeriesStub } from './guards';

const safeJsonParse = <T>(guard: (o: any) => o is T) => (text: string): T => {
  const parsed = JSON.parse(text);

  if (guard(parsed)) {
    return parsed;
  }

  throw new Error(`Unexpected json parsed`);
};

export const parseSeriesStubJson = safeJsonParse<SeriesStub[]>(
  (j): j is SeriesStub[] => j instanceof Array && j.every(isSeriesStub)
);

type OfflineDataJson = { data: OfflineData[] };

export const parseOfflineDataJson = safeJsonParse<OfflineDataJson>(
  (j): j is OfflineDataJson => {
    const key = 'data';
    return key in j && j[key] instanceof Array;
  }
);
