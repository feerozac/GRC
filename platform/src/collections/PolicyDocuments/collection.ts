import { CollectionConfig } from 'payload'
import uploadHandler from './api/upload/handler'

export const PolicyDocumentsCollection: CollectionConfig = {
  slug: 'policy-documents',
  admin: {
    useAsTitle: 'title',
    group: 'Policy Agent',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'run',
      type: 'relationship',
      relationTo: 'policy-agent-runs',
      required: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Board Document', value: 'board_document' },
        { label: 'Existing Policy', value: 'existing_policy' },
        { label: 'Regulatory Trigger', value: 'regulatory_trigger' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      defaultValue: 'board_document',
    },
    {
      name: 'fileType',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 's3Key',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 's3Url',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'hash',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'parsedText',
      type: 'textarea',
      maxLength: 1000000,
      admin: { readOnly: true },
    },
    {
      name: 'ingestStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Processed', value: 'processed' },
        { label: 'Error', value: 'error' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'errorMessage',
      type: 'text',
      admin: {
        condition: (data) => data.ingestStatus === 'error',
      },
    },
    {
      name: 'pageCount',
      type: 'number',
      admin: { readOnly: true },
    },
  ],
  endpoints: [
    {
      path: '/:id/upload',
      method: 'post',
      handler: uploadHandler,
    },
  ],
}
