import CrudPage from '@/components/CrudPage';

export default function PondsPage() {
  return (
    <CrudPage
      title="Ponds"
      endpoint="/ponds/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'size_acres', label: 'Size (acres)' },
        { key: 'water_source', label: 'Water Source' },
        { key: 'status', label: 'Status' },
      ]}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'size_acres', label: 'Size (acres)', type: 'number', step: '0.01', required: true },
        { name: 'water_source', label: 'Water Source', type: 'text', default: 'Indus River' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Maintenance'], default: 'Active' },
      ]}
    />
  );
}