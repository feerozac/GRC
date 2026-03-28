import * as migration_20250410_141459 from './20250410_141459';
import * as migration_20250425_123642 from './20250425_123642';
import * as migration_20250502_133310 from './20250502_133310';
import * as migration_20260328_180626 from './20260328_180626';

export const migrations = [
  {
    up: migration_20250410_141459.up,
    down: migration_20250410_141459.down,
    name: '20250410_141459',
  },
  {
    up: migration_20250425_123642.up,
    down: migration_20250425_123642.down,
    name: '20250425_123642',
  },
  {
    up: migration_20250502_133310.up,
    down: migration_20250502_133310.down,
    name: '20250502_133310',
  },
  {
    up: migration_20260328_180626.up,
    down: migration_20260328_180626.down,
    name: '20260328_180626'
  },
];
