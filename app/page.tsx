import { getHotels } from ".././actions/getHotels";
import HotelList from ".././components/hotel/HotelList";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const hotels = await getHotels(searchParams);
  console.log(hotels)

  if (hotels.length === 0) return <div>No hotels found....</div>;

  return (
    <div>
      <HotelList hotels = {hotels} />
    </div>
  );
}
