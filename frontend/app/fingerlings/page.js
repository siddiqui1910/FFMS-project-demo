import CrudPage from '@/components/CrudPage';

export default function FingerlingsPage() {
  return (
    <CrudPage
      title="Fingerling Stocking"
      singular="Stocking"
      endpoint="/fingerling-stockings/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'batch_display', label: 'Batch' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'cost', label: 'Cost (Rs.)' },
        { key: 'date', label: 'Date' },
      ]}
      fields={[
        { name: 'batch', label: 'Batch ID', type: 'number', required: true },
        { name: 'supplier', label: 'Supplier Name', type: 'text' },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'cost', label: 'Total Cost (Rs.)', type: 'number', step: '0.01', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
      ]}
    />
  );
}