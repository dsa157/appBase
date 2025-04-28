import { testClient } from './setup.ts'

export async function testCRUD(userId: string) {
  try {
    console.log('🔍 Running Supabase connection diagnostics')
    
    // 1. Test basic connection
    const { data: authData, error: authError } = await testClient.auth.getUser()
    if (authError) throw new Error('Auth failed: ' + authError.message)
    console.log('✅ Connection successful - User:', authData.user?.email)
    
    // 2. List all tables
    const { data: tables } = await testClient
      .from('information_schema.tables')
      .select('table_schema, table_name')
      .ilike('table_name', '%test%')
    
    if (!tables?.length) throw new Error('No test tables found')
    console.log('📋 Available tables:', tables.map(t => `${t.table_schema}.${t.table_name}`))
    
    // 3. Find our specific table
    const testTable = tables.find(t => t.table_name === 'test_table')
    if (!testTable) throw new Error('test_table not found')
    
    const fullTableName = `${testTable.table_schema}.test_table`
    console.log('ℹ️ Using table:', fullTableName)
    
    // 4. Test simple insert
    console.time('⏱️ Insert operation')
    const { data: insertData, error: insertError } = await testClient
      .from(fullTableName)
      .insert({ test_data: 'diagnostic value', user_id: userId })
      .select()
    
    if (insertError) throw new Error('Insert failed: ' + insertError.message)
    console.log('✅ Insert successful - ID:', insertData[0].id)
    
    // 5. Clean up
    await testClient.from(fullTableName).delete().eq('id', insertData[0].id)
    console.log('✅ Test completed successfully')
    
  } catch (error) {
    console.error('💥 Diagnostic failed:', error)
    throw error
  }
}
