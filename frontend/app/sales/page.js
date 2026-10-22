import CrudPage from '@/components/CrudPage';

export default function SalesPage() {
  return (
    <CrudPage
      title="Sales & Auctions"
      singular="Sale"
      endpoint="/sales/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'buyer_name', label: 'Buyer' },
        { key: 'weight_kg', label: 'Weight (kg)' },
        { key: 'rate_per_kg', label: 'Rate/kg (Rs.)' },
        { key: 'total_amount', label: 'Total (Rs.)' },
        { key: 'date', label: 'Date' },
      ]}
      fields={[
        { name: 'harvest', label: 'Harvest ID', type: 'number', required: true },
        { name: 'buyer', label: 'Buyer ID', type: 'number', required: true },
        { name: 'weight_kg', label: 'Weight (kg)', type: 'number', step: '0.01', required: true },
        { name: 'rate_per_kg', label: 'Rate per kg (Rs.)', type: 'number', step: '0.01', required: true },
        { name: 'total_amount', label: 'Total Amount (Rs.)', type: 'number', step: '0.01', required: true },
        { name: 'date', label: 'Sale Date', type: 'date', required: true },
        { name: 'payment_status', label: 'Payment Status', type: 'select', options: ['Paid', 'Pending'], default: 'Paid' },
      ]}
    />
  );
}