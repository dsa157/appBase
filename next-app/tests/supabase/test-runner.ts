import 'dotenv/config'
import { testCRUD } from './crud.test.ts'
import { supabase, testClient } from './setup.ts'

async function runCRUDTests() {
  try {
    console.log('🛠️  Test Environment:', process.env.NODE_ENV || 'development')
    
    // Authenticate first
    const testEmail = process.env.TEST_EMAIL
    console.log('🔐 Authenticating with email:', testEmail)
    
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: testEmail || '',
      password: 'secure-password-123'
    })
    
    if (error || !user) throw new Error('Authentication failed: ' + error?.message)
    
    console.log('🟢 Authenticated as:', user.email)
    
    // Run tests with service role client
    await testCRUD(user.id)
    
    console.log('🎉 CRUD tests completed successfully')
  } catch (error) {
    console.error('💥 Test failure:', error)
    process.exit(1)
  }
}

runCRUDTests()
