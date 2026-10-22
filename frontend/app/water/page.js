import CrudPage from '@/components/CrudPage';

export default function WaterQualityPage() {
  return (
    <CrudPage
      title="Water Quality"
      singular="Water Record"
      endpoint="/water-quality/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'pond_name', label: 'Pond' },
        { key: 'date', label: 'Date' },
        { key: 'ph_level', label: 'pH' },
        { key: 'flow_status', label: 'Flow' },
        { key: 'ammonia_level', label: 'Ammonia' },
      ]}
      fields={[
        { name: 'pond', label: 'Pond ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'ph_level', label: 'pH Level', type: 'number', step: '0.01' },
        { name: 'flow_status', label: 'Flow Status', type: 'select', options: ['Flowing', 'Stagnant'], default: 'Flowing' },
        { name: 'ammonia_level', label: 'Ammonia Level', type: 'number', step: '0.01' },
        { name: 'remarks', label: 'Remarks', type: 'textarea' },
      ]}
    />
  );
}