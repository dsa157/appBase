import 'dotenv/config'
import { supabase } from '../../src/lib/supabase/client'

export async function testAuth() {
  try {
    const testEmail = process.env.TEST_EMAIL
    const testPass = 'secure-password-123'
    
    // Sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPass,
    })

    if (signUpError) throw new Error(`Sign up error: ${signUpError.message}`)
    console.log('✅ Auth - Sign up successful')
    
    // Sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPass,
    })

    if (signInError) throw new Error(`Sign in error: ${signInError.message}`)
    console.log('✅ Auth - Sign in successful')
    
    return signInData.user
  } catch (error) {
    console.error('❌ Auth test failed:', error)
    throw error
  }
}
