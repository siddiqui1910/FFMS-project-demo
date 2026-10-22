import CrudPage from '@/components/CrudPage';

export default function FeedConsumptionPage() {
  return (
    <CrudPage
      title="Feed Consumption"
      singular="Log"
      endpoint="/feed-consumption/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'pond_name', label: 'Pond' },
        { key: 'date', label: 'Date' },
        { key: 'quantity_kg', label: 'Amount (kg)' },
      ]}
      fields={[
        { name: 'pond', label: 'Pond ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'quantity_kg', label: 'Amount (kg)', type: 'number', step: '0.01', required: true },
      ]}
    />
  );
}