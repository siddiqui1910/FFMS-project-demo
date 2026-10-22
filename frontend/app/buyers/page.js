import CrudPage from '@/components/CrudPage';

export default function BuyersPage() {
  return (
    <CrudPage
      title="Buyers"
      singular="Buyer"
      endpoint="/buyers/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'market_location', label: 'Market Location' },
        { key: 'phone', label: 'Phone' },
      ]}
      fields={[
        { name: 'name', label: 'Buyer Name', type: 'text', required: true },
        { name: 'market_location', label: 'Market Location', type: 'text', default: 'Thatta Fish Market' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
      ]}
    />
  );
}