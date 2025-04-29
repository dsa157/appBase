import 'dotenv/config' 
import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'

// Verify required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase credentials in environment variables')
}

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Configurable table mapping (can be moved to separate config file)
const TABLE_MAP: Record<string, string> = {
  'users.csv': 'user_profiles', // Must come first
  'users.json': 'user_profiles',
  'subscription_plans.csv': 'subscription_plans',
  'subscription_plans.json': 'subscription_plans',
  'user_subscriptions.csv': 'user_subscriptions',
  'user_subscriptions.json': 'user_subscriptions',
  'analytics_events.csv': 'analytics_events',
  'analytics_events.json': 'analytics_events'
}

// Ordered seeding list
const SEED_ORDER = [
  { 
    file: 'users.csv', 
    table: 'user_profiles',
    columns: {
      id: 'id',
      username: 'username',
      full_name: 'full_name',
      created_at: 'created_at',
      created_by: 'created_by'
    },
    requiredFields: ['id', 'username', 'created_by']
  },
  { file: 'users.json', table: 'user_profiles' },
  { file: 'subscription_plans.csv', table: 'subscription_plans' },
  { file: 'subscription_plans.json', table: 'subscription_plans' },
  { file: 'user_subscriptions.csv', table: 'user_subscriptions' },
  { file: 'user_subscriptions.json', table: 'user_subscriptions' },
  { file: 'analytics_events.csv', table: 'analytics_events' },
  { file: 'analytics_events.json', table: 'analytics_events' }
];

// Seed a single table from CSV
async function seedTableFromCSV(
  filePath: string, 
  tableName: string, 
  options?: {
    columns?: Record<string, string>,
    requiredFields?: string[]
  }
) {
  try {
    console.log(`\nSeeding ${tableName} from ${path.basename(filePath)}`);
    
    const csvData = readFileSync(filePath, 'utf8');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      cast: true,
      trim: true,
      bom: true,
      skip_records_with_error: true
    });

    const validRecords = records.filter(record => {
      if (!options?.requiredFields) return true;
      
      return options.requiredFields.every(field => {
        const sourceField = options.columns?.[field] || field;
        const value = record[sourceField];
        return value != null && value !== '';
      });
    });

    if (validRecords.length !== records.length) {
      console.warn(`⚠ Filtered ${records.length - validRecords.length} invalid records`);
    }

    const transformedRecords = options?.columns 
      ? validRecords.map(record => {
          const transformed: Record<string, any> = {};
          Object.entries(options.columns).forEach(([dbCol, csvCol]) => {
            // Handle special type conversions
            if (dbCol === 'user_id') {
              // Convert numeric IDs to UUID format if needed
              if (typeof record[csvCol] === 'number') {
                transformed[dbCol] = `00000000-0000-0000-0000-${record[csvCol].toString().padStart(12, '0')}`;
              } else {
                transformed[dbCol] = record[csvCol];
              }
            } else {
              transformed[dbCol] = record[csvCol];
            }
          });
          return transformed;
        })
      : validRecords;

    console.log(`First valid record:`, JSON.stringify(transformedRecords[0], null, 2));
    
    const { error } = await supabase
      .from(tableName)
      .upsert(transformedRecords, {
        onConflict: 'id',
        ignoreDuplicates: false
      });

    if (error) throw error;
    console.log(`✓ Successfully seeded ${tableName} with ${transformedRecords.length} records`);
    return transformedRecords.length;
  } catch (error) {
    console.error(`✗ Error seeding ${tableName}:`, error);
    throw error;
  }
}

// Seed a single table from JSON
async function seedTableFromJSON(
  filePath: string,
  tableName: string,
  options?: {
    columns?: Record<string, string>,
    requiredFields?: string[]
  }
) {
  try {
    console.log(`\nSeeding ${tableName} from ${path.basename(filePath)}`);
    
    const jsonData = readFileSync(filePath, 'utf8');
    const records = JSON.parse(jsonData);

    const validRecords = records.filter(record => {
      if (!options?.requiredFields) return true;
      
      return options.requiredFields.every(field => {
        const sourceField = options.columns?.[field] || field;
        const value = record[sourceField];
        return value != null && value !== '';
      });
    });

    if (validRecords.length !== records.length) {
      console.warn(`⚠ Filtered ${records.length - validRecords.length} invalid records`);
    }

    const transformedRecords = options?.columns 
      ? validRecords.map(record => {
          const transformed: Record<string, any> = {};
          Object.entries(options.columns).forEach(([dbCol, csvCol]) => {
            // Handle special type conversions
            if (dbCol === 'user_id') {
              // Convert numeric IDs to UUID format if needed
              if (typeof record[csvCol] === 'number') {
                transformed[dbCol] = `00000000-0000-0000-0000-${record[csvCol].toString().padStart(12, '0')}`;
              } else {
                transformed[dbCol] = record[csvCol];
              }
            } else {
              transformed[dbCol] = record[csvCol];
            }
          });
          return transformed;
        })
      : validRecords;

    console.log(`First valid record:`, JSON.stringify(transformedRecords[0], null, 2));
    
    const { error } = await supabase
      .from(tableName)
      .upsert(transformedRecords, {
        onConflict: 'id',
        ignoreDuplicates: false
      });

    if (error) throw error;
    console.log(`✓ Successfully seeded ${tableName} with ${transformedRecords.length} records`);
    return transformedRecords.length;
  } catch (error) {
    console.error(`✗ Error seeding ${tableName}:`, error);
    throw error;
  }
}

// Main seeding function
async function seedDatabase() {
  console.log('Starting database seeding...');
  const seedDir = path.join(__dirname, 'seed-data');
  
  try {
    for (const {file, table, columns, requiredFields} of SEED_ORDER) {
      const filePath = path.join(seedDir, file);
      if (existsSync(filePath)) {
        if (file.endsWith('.json')) {
          await seedTableFromJSON(filePath, table, { columns, requiredFields });
        } else {
          await seedTableFromCSV(filePath, table, { columns, requiredFields });
        }
      }
    }
    console.log('✓ Database seeding completed successfully');
  } catch (error) {
    console.error('✗ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase()
