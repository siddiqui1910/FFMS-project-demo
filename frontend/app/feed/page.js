import CrudPage from '@/components/CrudPage';

export default function FeedInventoryPage() {
  return (
    <CrudPage
      title="Feed Deliveries"
      singular="Delivery"
      endpoint="/feed-inventory/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'delivery_date', label: 'Date' },
        { key: 'quantity_kg', label: 'Quantity (kg)' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'cost', label: 'Cost (Rs.)' },
      ]}
      fields={[
        { name: 'delivery_date', label: 'Delivery Date', type: 'date', required: true },
        { name: 'quantity_kg', label: 'Quantity (kg)', type: 'number', step: '0.01', required: true },
        { name: 'supplier', label: 'Supplier Name', type: 'text' },
        { name: 'cost', label: 'Total Cost (Rs.)', type: 'number', step: '0.01' },
      ]}
    />
  );
}