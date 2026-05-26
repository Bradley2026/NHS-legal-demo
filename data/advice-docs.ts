// TODO: Replace with real synthetic legal advice document content from David.
// These documents are the corpus for the Knowledge Centre RAG system.

export type AdviceDocument = {
  id: string;
  title: string;
  department: string;
  firmId: string;
  date: string;
  summary: string;
  body: string;
  tags: string[];
};

export const adviceDocs: AdviceDocument[] = [];
