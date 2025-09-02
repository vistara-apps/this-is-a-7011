#!/bin/bash

# Exit on error
set -e

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first."
    echo "https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if SUPABASE_ACCESS_TOKEN is set
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "SUPABASE_ACCESS_TOKEN is not set. Please set it first."
    echo "You can get it from https://app.supabase.com/account/tokens"
    exit 1
fi

# Check if SUPABASE_PROJECT_ID is set
if [ -z "$SUPABASE_PROJECT_ID" ]; then
    echo "SUPABASE_PROJECT_ID is not set. Please set it first."
    echo "You can get it from your Supabase project settings."
    exit 1
fi

echo "Deploying schema to Supabase..."
supabase db push

echo "Deploying functions to Supabase..."
for func_dir in ./functions/*/; do
    func_name=$(basename "$func_dir")
    echo "Deploying function: $func_name"
    supabase functions deploy "$func_name"
done

echo "Deployment completed successfully!"

