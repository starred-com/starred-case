import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: get users from database
    
    return NextResponse.json({
      data: [], // TODO: replace with users
      error: {}
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' }, 
      { status: 500 }
    );
  }
}
