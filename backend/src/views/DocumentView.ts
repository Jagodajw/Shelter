import { Document } from '@prisma/client';

export type DocumentResponse = Omit<Document, 'file'>;

export type DocumentRequest = Omit<Document, 'ID' | 'createAt' | 'shelters_id'>;
