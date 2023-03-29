import { Document } from '@prisma/client';

export type DocumentFileResponse = Pick<Document, 'file'> | null;

export type DocumentModel = Omit<Document, 'ID' | 'createAt'>;
