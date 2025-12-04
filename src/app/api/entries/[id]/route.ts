import { NextResponse } from 'next/server';
import { getEntryById, getHistoryByEntryId } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const entry = getEntryById(id);
    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }
    
    const history = getHistoryByEntryId(id);
    
    return NextResponse.json({ ...entry, history });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entry' }, { status: 500 });
  }
}
