import { supabase, handleSupabaseError, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from '../data/mockData';

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  if (!isSupabaseConfigured()) {
    return {
      payment_id: paymentId,
      gig_id: 'gig_1',
      amount: 100,
      fee_amount: 5,
      fee_percentage: 5,
      total_amount: 105,
      status: 'completed',
      payer_address: '0x1234567890abcdef1234567890abcdef12345678',
      created_at: new Date().toISOString()
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_id', paymentId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get payments for a gig
export const getGigPayments = async (gigId) => {
  if (!isSupabaseConfigured()) {
    return [{
      payment_id: uuidv4(),
      gig_id: gigId,
      amount: 100,
      fee_amount: 5,
      fee_percentage: 5,
      total_amount: 105,
      status: 'completed',
      payer_address: '0x1234567890abcdef1234567890abcdef12345678',
      created_at: new Date().toISOString()
    }];
  }
  
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('gig_id', gigId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching gig payments:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Process a payment
export const processPayment = async (gigId, amount, payerAddress, feePercentage = 5) => {
  if (!isSupabaseConfigured()) {
    // Calculate fee amount
    const validFeePercentage = Math.min(Math.max(feePercentage, 5), 10);
    const feeAmount = (amount * validFeePercentage) / 100;
    const totalAmount = amount + feeAmount;
    
    const newPayment = {
      payment_id: uuidv4(),
      gig_id: gigId,
      amount,
      fee_amount: feeAmount,
      fee_percentage: validFeePercentage,
      total_amount: totalAmount,
      status: 'completed',
      payer_address: payerAddress,
      created_at: new Date().toISOString()
    };
    
    return newPayment;
  }
  
  try {
    // Call the Supabase function to process the payment
    const { data, error } = await supabase.functions.invoke('process-payment', {
      body: {
        gigId,
        amount,
        feePercentage,
        paymentId: uuidv4(),
        payerAddress
      }
    });
    
    if (error) throw error;
    
    return data.payment;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error(error.message || 'Failed to process payment');
  }
};

