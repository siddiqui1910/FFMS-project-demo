import CrudPage from '@/components/CrudPage';

export default function AuctionsPage() {
  return (
    <CrudPage
      title="Auction Details"
      singular="Auction"
      endpoint="/auctions/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'sale_display', label: 'Sale Info' },
        { key: 'highest_bid', label: 'Highest Bid (Rs.)' },
        { key: 'bidder_name', label: 'Winning Bidder' },
        { key: 'auction_date', label: 'Date' },
      ]}
      fields={[
        { name: 'sale', label: 'Sale ID', type: 'number', required: true },
        { name: 'highest_bid', label: 'Highest Bid (Rs.)', type: 'number', step: '0.01', required: true },
        { name: 'bidder_name', label: 'Bidder Name', type: 'text', required: true },
        { name: 'auction_date', label: 'Auction Date', type: 'date', required: true },
      ]}
    />
  );
}