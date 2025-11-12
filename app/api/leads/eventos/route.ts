import { NextResponse } from 'next/server';
import { consultarAtividades } from '@/lib/oracle-leads-service';

// Desabilitar cache para esta rota
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const codLead = searchParams.get('codLead');

    if (!codLead) {
      return NextResponse.json(
        { error: 'codLead é obrigatório' },
        { status: 400 }
      );
    }

    const idEmpresa = 1; // ID_EMPRESA fixo

    console.log('📥 Consultando eventos para lead:', codLead);

    const atividades = await consultarAtividades(codLead, idEmpresa, 'S');

    console.log(`📤 Retornando ${atividades.length} eventos`);
    return NextResponse.json(atividades);

  } catch (error: any) {
    console.error('❌ Erro ao consultar eventos:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar eventos' },
      { status: 500 }
    );
  }
}