// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the payment data from the request
    const { gigId, amount, feePercentage = 5, paymentId, payerAddress } = await req.json()

    if (!gigId || !amount || !paymentId || !payerAddress) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the user's ID from the session
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Calculate fee amount
    const validFeePercentage = Math.min(Math.max(feePercentage, 5), 10)
    const feeAmount = (amount * validFeePercentage) / 100
    const totalAmount = amount + feeAmount

    // Record the payment in the database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        payment_id: paymentId,
        gig_id: gigId,
        amount,
        fee_amount: feeAmount,
        fee_percentage: validFeePercentage,
        total_amount: totalAmount,
        status: 'completed',
        payer_address: payerAddress,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (paymentError) throw paymentError

    // Update the gig status to in_progress if it's currently open
    const { data: gig, error: gigError } = await supabaseClient
      .from('gigs')
      .update({ status: 'in_progress' })
      .eq('gig_id', gigId)
      .eq('status', 'open')
      .select()
      .single()

    if (gigError) throw gigError

    return new Response(
      JSON.stringify({ payment, gig }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

/* To invoke:
curl -i --location --request POST 'http://localhost:54321/functions/v1/process-payment' \
  --header 'Authorization: Bearer SUPABASE_AUTH_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"gigId": "123", "amount": 100, "feePercentage": 5, "paymentId": "payment_123", "payerAddress": "0x123"}'
*/

