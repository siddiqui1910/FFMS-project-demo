import CrudPage from '@/components/CrudPage';

export default function HarvestsPage() {
  return (
    <CrudPage
      title="Harvests"
      singular="Harvest"
      endpoint="/harvests/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'batch_display', label: 'Batch' },
        { key: 'date', label: 'Date' },
        { key: 'total_weight_kg', label: 'Weight (kg)' },
        { key: 'grade', label: 'Grade' },
        { key: 'type', label: 'Type' },
      ]}
      fields={[
        { name: 'batch', label: 'Batch ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'total_weight_kg', label: 'Total Weight (kg)', type: 'number', step: '0.01', required: true },
        { name: 'grade', label: 'Grade', type: 'select', options: ['A', 'B', 'C'], default: 'A' },
        { name: 'type', label: 'Harvest Type', type: 'select', options: ['Full', 'Partial'], default: 'Full' },
      ]}
    />
  );
}