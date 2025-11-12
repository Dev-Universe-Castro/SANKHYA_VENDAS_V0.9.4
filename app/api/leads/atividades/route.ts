
import { NextResponse } from 'next/server';
import { consultarAtividades } from '@/lib/oracle-leads-service';

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
    const ativo = searchParams.get('ativo') || 'S';

    console.log('📥 Consultando atividades para lead:', codLead);
    
    const atividades = await consultarAtividades(codLead, idEmpresa, ativo);
    
    console.log(`📤 Retornando ${atividades.length} atividades`);
    return NextResponse.json(atividades);
    
  } catch (error: any) {
    console.error('❌ Erro ao consultar atividades:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar atividades' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
