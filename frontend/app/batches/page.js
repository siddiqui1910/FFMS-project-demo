import CrudPage from '@/components/CrudPage';

export default function BatchesPage() {
  return (
    <CrudPage
      title="Batches"
      singular="Batch"
      endpoint="/batches/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'pond_name', label: 'Pond' },
        { key: 'species_name', label: 'Species' },
        { key: 'stocking_date', label: 'Stocking Date' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'status', label: 'Status' },
      ]}
      fields={[
        { name: 'pond', label: 'Pond ID', type: 'number', required: true },
        { name: 'species', label: 'Species ID', type: 'number', required: true },
        { name: 'stocking_date', label: 'Stocking Date', type: 'date', required: true },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Stocked', 'Growing', 'Harvested'], default: 'Stocked' },
      ]}
    />
  );
}