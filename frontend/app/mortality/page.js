import CrudPage from '@/components/CrudPage';

export default function MortalityPage() {
  return (
    <CrudPage
      title="Mortality Records"
      singular="Mortality"
      endpoint="/mortality/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'batch_display', label: 'Batch' },
        { key: 'date', label: 'Date' },
        { key: 'count', label: 'Count' },
        { key: 'cause', label: 'Cause' },
      ]}
      fields={[
        { name: 'batch', label: 'Batch ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'count', label: 'Number of Dead Fish', type: 'number', required: true },
        { name: 'cause', label: 'Cause', type: 'text' },
      ]}
    />
  );
}